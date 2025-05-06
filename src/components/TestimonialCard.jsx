// components/TestimonialCard.jsx
import { Card, CardContent } from "@/components/ui/card";

export const TestimonialCard = ({ name, role, message }) => (
  <Card className="bg-white dark:bg-background border shadow-sm hover:shadow-md transition-shadow duration-300">
    <CardContent className="p-6 space-y-2">
      <p className="text-muted-foreground">{message}</p>
      <p className="text-sm font-semibold text-primary">— {name}</p>
      <span className="text-xs text-muted-foreground italic">{role}</span>
    </CardContent>
  </Card>
);
