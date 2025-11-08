import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis, ResponsiveContainer } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

interface ParticipationData {
  period: string;
  tiro: number;
  pase: number;
  otro: number;
  total_points: number;
}

interface ParticipationsChartProps {
  data: ParticipationData[];
  title?: string;
  description?: string;
}

const chartConfig = {
  tiro: {
    label: "Tiro",
    color: "var(--chart-1)",
  },
  pase: {
    label: "Pase", 
    color: "var(--chart-2)",
  },
  otro: {
    label: "Otro",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig

export function ParticipationsChart({ 
  data, 
  title = "Participaciones por Tag", 
  description = "Distribución de puntos obtenidos por tipo de respuesta" 
}: ParticipationsChartProps) {
  const totalParticipations = data.reduce((acc, curr) => acc + curr.tiro + curr.pase + curr.otro, 0);
  const averagePoints = data.length > 0 
    ? Math.round(data.reduce((acc, curr) => acc + curr.total_points, 0) / data.length)
    : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[200px] w-full">
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{
              top: 50,
              left: 12,
              right: 12,
              bottom: 0,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="period"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 10)}
            />
            <ChartTooltip 
              cursor={false} 
              content={<ChartTooltipContent 
                labelFormatter={(value) => `Período: ${value}`}
                formatter={(value, name) => [
                  `${value} puntos en `,
                  chartConfig[name as keyof typeof chartConfig]?.label || name
                ]}
              />} 
            />
            <defs>
              <linearGradient id="fillTiro" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-tiro)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-tiro)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillPase" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-pase)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-pase)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillOtro" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-otro)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-otro)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="otro"
              type="natural"
              fill="url(#fillOtro)"
              fillOpacity={0.4}
              stroke="var(--color-otro)"
              stackId="a"
            />
            <Area
              dataKey="pase"
              type="natural"
              fill="url(#fillPase)"
              fillOpacity={0.4}
              stroke="var(--color-pase)"
              stackId="a"
            />
            <Area
              dataKey="tiro"
              type="natural"
              fill="url(#fillTiro)"
              fillOpacity={0.4}
              stroke="var(--color-tiro)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none font-medium">
              {totalParticipations} participaciones totales
              <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground flex items-center gap-2 leading-none">
              Promedio de {averagePoints} puntos por período
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
