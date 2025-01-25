import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { motion } from "framer-motion"

export function ContributionOverTime({
  data
}) {
  return (
    (<Card>
      <CardHeader>
        <CardTitle>Funding Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div
          className="h-[300px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis
                dataKey="date"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false} />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value}`} />
              <Tooltip
                formatter={(value) => [`$${value.toLocaleString()}`, "Amount Raised"]}
                labelFormatter={(label) => `Date: ${label}`} />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#2ecc71"
                strokeWidth={3}
                dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </CardContent>
    </Card>)
  );
}

