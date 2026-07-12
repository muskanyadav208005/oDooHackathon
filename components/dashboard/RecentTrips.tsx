import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function RecentTrips() {
  return (
    <Card>

      <CardHeader>
        <CardTitle>Recent Trips</CardTitle>
      </CardHeader>

      <CardContent>

        <ul className="space-y-4">

          <li>Delhi → Jaipur</li>

          <li>Mumbai → Pune</li>

          <li>Chennai → Bangalore</li>

        </ul>

      </CardContent>

    </Card>
  );
}