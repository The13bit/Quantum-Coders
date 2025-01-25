import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function Description({
  title,
  description
}) {
  return (
    (<Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>)
  );
}

