"use client";
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export default function CollaboratorsList({
  collaborators,
  setCollaborators
}) {
  const [newCollaborator, setNewCollaborator] = useState("")
  const [suggestions, setSuggestions] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (newCollaborator.length < 2) {
        setSuggestions([])
        return
      }

      setIsLoading(true)
      try {
        const response = await fetch(`/api/users/byName?name=${encodeURIComponent(newCollaborator)}`)
        if (response.ok) {
          const data = await response.json()
          setSuggestions(data)
        } else {
          console.error("Failed to fetch user suggestions")
        }
      } catch (error) {
        console.error("Error fetching user suggestions:", error)
      }
      setIsLoading(false)
    }

    const debounce = setTimeout(fetchSuggestions, 300)
    return () => clearTimeout(debounce);
  }, [newCollaborator])

  const addCollaborator = (collaborator) => {
    if (!collaborators.some((c) => c._id === collaborator._id)) {
      setCollaborators([...collaborators, collaborator])
    }
    setNewCollaborator("")
    setIsOpen(false)
    inputRef.current?.focus()
  }

  const removeCollaborator = (id) => {
    setCollaborators(collaborators.filter((c) => c._id !== id))
  }

  return (
    (<div className="space-y-4">
      <h3 className="text-lg font-semibold text-purple-800">Collaborators</h3>
      <ul className="space-y-2">
        {collaborators.map((collaborator) => (
          <li
            key={collaborator._id}
            className="flex justify-between items-center bg-purple-100 p-2 rounded">
            <span className="text-purple-700">{collaborator.name}</span>
            <Button
              onClick={() => removeCollaborator(collaborator._id)}
              variant="destructive"
              size="sm"
              className="bg-red-500 hover:bg-red-600">
              Remove
            </Button>
          </li>
        ))}
      </ul>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Input
            ref={inputRef}
            value={newCollaborator}
            onChange={(e) => setNewCollaborator(e.target.value)}
            onFocus={() => setIsOpen(true)}
            placeholder="Search for collaborators"
            className="border-purple-300 focus:border-purple-500" />
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0">
          {isLoading ? (
            <div className="p-2 text-center text-purple-700">Loading...</div>
          ) : suggestions.length > 0 ? (
            <ul className="max-h-[300px] overflow-auto">
              {suggestions.map((suggestion) => (
                <li
                  key={suggestion._id}
                  className="p-2 hover:bg-purple-100 cursor-pointer"
                  onClick={() => addCollaborator(suggestion)}>
                  {suggestion.name}
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-2 text-center text-purple-700">No suggestions found</div>
          )}
        </PopoverContent>
      </Popover>
    </div>)
  );
}

