import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface Props {
  fresh: number;
  expiring: number;
  expired: number;
}

export const FreshnessChart = ({ fresh, expiring, expired }: Props) => {
  const data = [
    { name: "Fresh", value: fresh, color: "hsl(var(--fresh))" },
    { name: "Expiring", value: expiring, color: "hsl(var(--warning))" },
    { name: "Expired", value: expired, color: "hsl(var(--destructive))" },
  ];
  const total = fresh + expiring + expired;

  return (
    <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-card">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg font-semibold text-foreground">Freshness Overview</h3>
          <p className="text-sm text-muted-foreground">Distribution across your active pantry</p>
        </div>
      </div>
      <div className="relative h-64">
        {total === 0 ? (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            No active items yet — add some to see the chart.
          </div>
        ) : (
          <>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={data} dataKey="value" innerRadius={62} outerRadius={92} paddingAngle={3} stroke="none">
                  {data.map((d) => (
                    <Cell key={d.name} fill={d.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "0.75rem",
                    fontSize: "0.875rem",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-display text-3xl font-semibold text-foreground">{total}</span>
              <span className="text-xs uppercase tracking-wider text-muted-foreground">Active</span>
            </div>
          </>
        )}
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm">
        {data.map((d) => (
          <div key={d.name} className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: d.color }} />
            <span className="font-medium text-foreground">{d.name}</span>
            <span className="text-muted-foreground">{d.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
