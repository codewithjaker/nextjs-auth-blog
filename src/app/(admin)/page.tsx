'use client';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ActivityChart } from '@/components/admin/activity-chart';
import { PopularPostsTable } from '@/components/admin/popular-posts-table';
import { ActiveUsersTable } from '@/components/admin/active-users-table';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [activity, setActivity] = useState<any>(null);
  const [popularPosts, setPopularPosts] = useState<any[]>([]);
  const [activeUsers, setActiveUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.getAdminStats(),
      api.getActivityTimeline(),
      api.getPopularPosts(),
      api.getActiveUsers(),
    ])
      .then(([statsData, activityData, postsData, usersData]) => {
        setStats(statsData);
        setActivity(activityData);
        setPopularPosts(postsData);
        setActiveUsers(usersData);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
        <Skeleton className="h-80" />
      </div>
    );
  }

  // Format stats data for cards
  const statCards = [
    { title: 'Total Users', value: stats?.totalUsers },
    { title: 'Total Posts', value: stats?.totalPosts },
    { title: 'Total Comments', value: stats?.totalComments },
    { title: 'Total Categories', value: stats?.totalCategories },
    { title: 'Total Reactions', value: stats?.totalReactions },
  ];

  // Compute pending comments from stats (if available)
  const pendingComments = stats?.commentsByStatus?.find((s: any) => s._id === 'pending')?.count || 0;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-5">
        {statCards.map((card) => (
          <Card key={card.title}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Additional stats row */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Posts by Status</CardTitle>
          </CardHeader>
          <CardContent>
            {stats?.postsByStatus?.map((s: any) => (
              <div key={s._id} className="flex justify-between py-1">
                <span className="capitalize">{s._id}</span>
                <span className="font-medium">{s.count}</span>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Comments by Status</CardTitle>
          </CardHeader>
          <CardContent>
            {stats?.commentsByStatus?.map((s: any) => (
              <div key={s._id} className="flex justify-between py-1">
                <span className="capitalize">{s._id}</span>
                <span className="font-medium">{s.count}</span>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>User Verification</CardTitle>
          </CardHeader>
          <CardContent>
            {stats?.usersByVerified?.map((s: any) => (
              <div key={s._id} className="flex justify-between py-1">
                <span>{s._id ? 'Verified' : 'Unverified'}</span>
                <span className="font-medium">{s.count}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Activity Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Activity (Last 30 Days)</CardTitle>
        </CardHeader>
        <CardContent>
          <ActivityChart data={activity} />
        </CardContent>
      </Card>

      {/* Popular Posts & Active Users */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Popular Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <PopularPostsTable posts={popularPosts} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <ActiveUsersTable users={activeUsers} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}