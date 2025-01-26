import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

export default function CommentsList({
  comments,
  dispatch
}) {
  const [newComment, setNewComment] = useState("")

  const addComment = () => {
    if (newComment) {
      dispatch({ type: "ADD_COMMENT", comment: { content: newComment } })
      setNewComment("")
    }
  }

  return (
    (<div>
      <h3 className="text-lg font-semibold">Comments</h3>
      {comments.map((comment, index) => (
        <div key={index} className="mb-2">
          <p>{comment.content}</p>
          <Button onClick={() => dispatch({ type: "REMOVE_COMMENT", index })}>Remove</Button>
        </div>
      ))}
      <div className="space-y-2">
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="New comment" />
        <Button onClick={addComment}>Add Comment</Button>
      </div>
    </div>)
  );
}

