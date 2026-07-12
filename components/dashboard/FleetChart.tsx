"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Mon", trips: 5 },
  { name: "Tue", trips: 8 },
  { name: "Wed", trips: 6 },
  { name: "Thu", trips: 10 },
  { name: "Fri", trips: 7 },
];

export default function FleetChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Fleet Utilization</CardTitle>
      </CardHeader>

      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="trips" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}