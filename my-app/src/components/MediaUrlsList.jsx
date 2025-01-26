import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { uploadToBlob } from "@/utils/az"


export default function MediaUrlsList({
  mediaUrls,
  setMediaUrls
}) {
  const [newUrl, setNewUrl] = useState("")
  const [uploading, setUploading] = useState(false)

  const addMediaUrl = () => {
    if (newUrl) {
      setMediaUrls([...mediaUrls, newUrl])
      setNewUrl("")
    }
  }

  const handleFileUpload = async (event) => {
    const file = event.target.files[0]
    //console.log("Uploading file:", file)
    if (file) {
      try {
        setUploading(true)
        const azureUrl = await uploadToBlob(file)
        console.log("Uploaded to Azure:", azureUrl)
        setMediaUrls([...mediaUrls, azureUrl])
      } catch (error) {
        console.error("Upload failed:", error)
      } finally {
        setUploading(false)
      }
    }
  }

  const removeMediaUrl = (index) => {
    setMediaUrls(mediaUrls.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Input
          type="text"
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
          placeholder="Enter media URL"
        />
        <Button onClick={addMediaUrl}>Add URL</Button>
        <Input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          disabled={uploading}
        />
      </div>
      {/* Rest of your component */}
    </div>
  )
}