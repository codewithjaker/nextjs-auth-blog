'use client';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ActivityData {
  userActivity: { _id: string; count: number }[];
  postActivity: { _id: string; count: number }[];
  commentActivity: { _id: string; count: number }[];
}

export function ActivityChart({ data }: { data: ActivityData }) {
  if (!data) return null;

  // Merge the three datasets into one array of objects with date as key
  const dateMap = new Map();
  data.userActivity?.forEach((item) => {
    dateMap.set(item._id, { date: item._id, users: item.count, posts: 0, comments: 0 });
  });
  data.postActivity?.forEach((item) => {
    const entry = dateMap.get(item._id) || { date: item._id, users: 0, posts: 0, comments: 0 };
    entry.posts = item.count;
    dateMap.set(item._id, entry);
  });
  data.commentActivity?.forEach((item) => {
    const entry = dateMap.get(item._id) || { date: item._id, users: 0, posts: 0, comments: 0 };
    entry.comments = item.count;
    dateMap.set(item._id, entry);
  });

  const chartData = Array.from(dateMap.values()).sort((a, b) => a.date.localeCompare(b.date));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="users" stroke="#8884d8" />
        <Line type="monotone" dataKey="posts" stroke="#82ca9d" />
        <Line type="monotone" dataKey="comments" stroke="#ffc658" />
      </LineChart>
    </ResponsiveContainer>
  );
}