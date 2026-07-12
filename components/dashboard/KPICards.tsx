import { Card, CardContent } from "@/components/ui/card";

const cards = [
  {
    title: "Active Vehicles",
    value: "18",
  },
  {
    title: "Available Vehicles",
    value: "12",
  },
  {
    title: "Active Trips",
    value: "6",
  },
  {
    title: "Maintenance",
    value: "2",
  },
];

export default function KPICards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {cards.map((card) => (
        <Card key={card.title}>
          <CardContent className="p-6">
            <p className="text-gray-500">
              {card.title}
            </p>

            <h2 className="text-3xl font-bold mt-3">
              {card.value}
            </h2>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}