import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"

export default function ContributionsList({
  contributions,
  dispatch
}) {
  const [newAmount, setNewAmount] = useState("")
  const [isAnonymous, setIsAnonymous] = useState(false)

  const addContribution = () => {
    if (newAmount) {
      dispatch(
        { type: "ADD_CONTRIBUTION", contribution: { amount: Number(newAmount), isAnonymous } }
      )
      setNewAmount("")
      setIsAnonymous(false)
    }
  }

  return (
    (<div>
      <h3 className="text-lg font-semibold">Contributions</h3>
      {contributions.map((contribution, index) => (
        <div key={index} className="mb-2">
          <p>
            Amount: ${contribution.amount} {contribution.isAnonymous ? "(Anonymous)" : ""}
          </p>
          <Button onClick={() => dispatch({ type: "REMOVE_CONTRIBUTION", index })}>Remove</Button>
        </div>
      ))}
      <div className="space-y-2">
        <Input
          type="number"
          value={newAmount}
          onChange={(e) => setNewAmount(e.target.value)} />
        <div className="flex items-center space-x-2">
          <Checkbox
            id="isAnonymous"
            checked={isAnonymous}
            onCheckedChange={(checked) => setIsAnonymous(checked)} />
          <label htmlFor="isAnonymous">Anonymous contribution</label>
        </div>
        <Button onClick={addContribution}>Add Contribution</Button>
      </div>
    </div>)
  );
}

