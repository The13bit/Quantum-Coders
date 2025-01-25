import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

export function FundingProgress({
  currentFunds,
  goal,
  daysRemaining
}) {
  const percentageFunded = Math.min((currentFunds / goal) * 100, 100)

  return (
    (<Card>
      <CardContent className="pt-6">
        <motion.div
          className="mb-6"
          initial={{ width: 0 }}
          animate={{ width: `${percentageFunded}%` }}
          transition={{ duration: 1, ease: "easeOut" }}>
          <div className="h-2 bg-green-500 rounded-full" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}>
          <p className="text-3xl font-bold mb-2">${currentFunds.toLocaleString()}</p>
          <p className="text-gray-600 mb-4">pledged of ${goal.toLocaleString()} goal</p>
          <div className="flex justify-between text-lg font-semibold">
            <p>{Math.round(percentageFunded)}%</p>
            <p>{daysRemaining} days to go</p>
          </div>
        </motion.div>
      </CardContent>
    </Card>)
  );
}

