"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/api-client";

interface PostReactionsProps {
  postId: string;
  initialLikes: number;
  initialDislikes: number;
}

export function PostReactions({
  postId,
  initialLikes,
  initialDislikes,
}: PostReactionsProps) {
  const { data: session } = useSession();
  const [likes, setLikes] = useState(initialLikes);
  const [dislikes, setDislikes] = useState(initialDislikes);
  const [userReaction, setUserReaction] = useState<"like" | "dislike" | null>(
    null,
  );
  const [loading, setLoading] = useState(false);

  //   Fetch user's current reaction on mount (if logged in)
  useState(() => {
    if (session?.user?.id) {
      api
        .getReactions({
          user: session.user.id,
          targetId: postId,
          targetType: "post",
        })
        .then((data) => {
          if (data.reactions.length > 0) {
            setUserReaction(data.reactions[0].type);
          }
        })
        .catch(console.error);
    }
  }, [session, postId]);

  const handleReact = async (type: "like" | "dislike") => {
    if (!session) {
      toast.error("Please login to react");
      return;
    }
    setLoading(true);
    try {
      const res = await api.createReaction({
        user: session.user.id,
        targetType: "post",
        targetId: postId,
        type,
      });
      // The API returns the updated reaction; we update counts based on response
      if (res.message === "Reaction removed") {
        // User removed their reaction
        if (type === "like") {
          setLikes((prev) => prev - 1);
          setUserReaction(null);
        } else {
          setDislikes((prev) => prev - 1);
          setUserReaction(null);
        }
      } else if (res.type) {
        // Reaction added or changed
        const newType = res.type;
        if (userReaction === "like" && newType === "dislike") {
          // switched from like to dislike
          setLikes((prev) => prev - 1);
          setDislikes((prev) => prev + 1);
        } else if (userReaction === "dislike" && newType === "like") {
          setDislikes((prev) => prev - 1);
          setLikes((prev) => prev + 1);
        } else if (userReaction === null) {
          // new reaction
          if (newType === "like") setLikes((prev) => prev + 1);
          else setDislikes((prev) => prev + 1);
        }
        setUserReaction(newType);
      }
      toast.success("Reaction updated");
    } catch (error) {
      toast.error("Failed to react");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <Button
        variant={userReaction === "like" ? "default" : "outline"}
        onClick={() => handleReact("like")}
        disabled={loading}
      >
        <ThumbsUp className="mr-2 h-4 w-4" />
        {likes}
      </Button>
      <Button
        variant={userReaction === "dislike" ? "default" : "outline"}
        onClick={() => handleReact("dislike")}
        disabled={loading}
      >
        <ThumbsDown className="mr-2 h-4 w-4" />
        {dislikes}
      </Button>
    </div>
  );
}
