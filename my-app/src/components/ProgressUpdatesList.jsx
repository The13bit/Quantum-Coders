import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

export default function ProgressUpdatesList({
  progressUpdates,
  dispatch
}) {
  const [newDescription, setNewDescription] = useState("")
  const [newMediaUrl, setNewMediaUrl] = useState("")
  const [mediaUrls, setMediaUrls] = useState([])

  const addMediaUrl = () => {
    if (newMediaUrl) {
      setMediaUrls([...mediaUrls, newMediaUrl])
      setNewMediaUrl("")
    }
  }

  const addProgressUpdate = () => {
    if (newDescription) {
      dispatch(
        { type: "ADD_PROGRESS_UPDATE", update: { description: newDescription, mediaUrls } }
      )
      setNewDescription("")
      setMediaUrls([])
    }
  }

  return (
    (<div>
      <h3 className="text-lg font-semibold">Progress Updates</h3>
      {progressUpdates.map((update, index) => (
        <div key={index} className="mb-4">
          <p>{update.description}</p>
          <ul>
            {update.mediaUrls.map((url, urlIndex) => (
              <li key={urlIndex}>{url}</li>
            ))}
          </ul>
          <Button onClick={() => dispatch({ type: "REMOVE_PROGRESS_UPDATE", index })}>Remove</Button>
        </div>
      ))}
      <div className="space-y-2">
        <Textarea
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          placeholder="New progress update description" />
        <div className="flex">
          <Input
            value={newMediaUrl}
            onChange={(e) => setNewMediaUrl(e.target.value)}
            placeholder="New media URL" />
          <Button onClick={addMediaUrl}>Add URL</Button>
        </div>
        <ul>
          {mediaUrls.map((url, index) => (
            <li key={index}>{url}</li>
          ))}
        </ul>
        <Button onClick={addProgressUpdate}>Add Progress Update</Button>
      </div>
    </div>)
  );
}

