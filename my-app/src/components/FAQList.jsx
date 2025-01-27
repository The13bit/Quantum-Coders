import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

export default function FAQList({
  faq,
  setFaq
}) {
  const [newQuestion, setNewQuestion] = useState("")
  const [newAnswer, setNewAnswer] = useState("")

  const addFAQ = (e) => {
    e.preventDefault()
    if (newQuestion && newAnswer) {
      setFaq([...faq, { question: newQuestion, answer: newAnswer }])
      setNewQuestion("")
      setNewAnswer("")
    }
  }

  const removeFAQ = (index) => {
    setFaq(faq.filter((_, i) => i !== index))
  }

  return (
    (<div className="space-y-4">
      <h3 className="text-lg font-semibold text-purple-800">FAQ</h3>
      {faq.map((item, index) => (
        <div key={index} className="mb-4 p-4 bg-purple-100 rounded-md">
          <h4 className="font-medium text-purple-700">Q: {item.question}</h4>
          <p className="mt-2 text-purple-600">A: {item.answer}</p>
          <Button
            onClick={() => removeFAQ(index)}
            variant="destructive"
            size="sm"
            className="mt-2 bg-red-500 hover:bg-red-600">
            Remove
          </Button>
        </div>
      ))}
      <div className="space-y-2">
        <Input
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          placeholder="New question"
          className="border-purple-300 focus:border-purple-500" />
        <Textarea
          value={newAnswer}
          onChange={(e) => setNewAnswer(e.target.value)}
          placeholder="New answer"
          className="border-purple-300 focus:border-purple-500" />
        <Button onClick={addFAQ} className="bg-purple-600 hover:bg-purple-700 text-white">
          Add FAQ
        </Button>
      </div>
    </div>)
  );
}

