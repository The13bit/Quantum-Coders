"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import CollaboratorsList from "./CollaboratorsList"
import FAQList from "./FAQList"
import MediaUrlsList from "./MediaUrlsList"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  fundingGoal: yup.number().positive("Funding goal must be positive").required("Funding goal is required"),
  deadline: yup.date().min(new Date(), "Deadline must be in the future").required("Deadline is required"),
  category: yup.string().required("Category is required"),
  location: yup.string().required("Location is required"),
})

export default function ProjectEditor() {
  const [collaborators, setCollaborators] = useState([])
  const [faq, setFaq] = useState([])
  const [mediaUrls, setMediaUrls] = useState([])
  const router = useRouter()
  const { toast } = useToast()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data) => {
    const projectData = {
      ...data,
      collaborators: collaborators.map((c) => c._id),
      faq,
      mediaUrls,
    }

    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      })

      if (response.ok) {
        console.log("Project created successfully")
        // You might want to redirect the user or show a success message here
        toast({ description: "Project created successfully", variant: "success" })
        router.push("/view_all_projects")

      } else {
        console.error("Failed to create project")
        // Handle error, show error message to the user
        toast({ description: "Failed to create project", variant: "destructive" })
        //router.push("/view_all_projects")
      }
    } catch (error) {
      console.error("Error creating project:", error)
      // Handle error, show error message to the user
    }
  }

  return (
    (<form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <Card className="bg-purple-50 border-purple-200">
        <CardHeader className="bg-purple-100">
          <CardTitle className="text-purple-800">Create New Project</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="title" className="text-purple-700">
              Title
            </Label>
            <Input
              id="title"
              {...register("title")}
              className="border-purple-300 focus:border-purple-500" />
            {errors.title && <p className="text-red-500">{errors.title.message}</p>}
          </div>
          <div>
            <Label htmlFor="description" className="text-purple-700">
              Description
            </Label>
            <Textarea
              id="description"
              {...register("description")}
              className="border-purple-300 focus:border-purple-500" />
            {errors.description && <p className="text-red-500">{errors.description.message}</p>}
          </div>
          <div>
            <Label htmlFor="fundingGoal" className="text-purple-700">
              Funding Goal
            </Label>
            <Input
              id="fundingGoal"
              type="number"
              {...register("fundingGoal")}
              className="border-purple-300 focus:border-purple-500" />
            {errors.fundingGoal && <p className="text-red-500">{errors.fundingGoal.message}</p>}
          </div>
          <div>
            <Label htmlFor="deadline" className="text-purple-700">
              Deadline
            </Label>
            <Input
              id="deadline"
              type="date"
              {...register("deadline")}
              className="border-purple-300 focus:border-purple-500" />
            {errors.deadline && <p className="text-red-500">{errors.deadline.message}</p>}
          </div>
          <div>
            <Label htmlFor="category" className="text-purple-700">
              Category
            </Label>
            <Input
              id="category"
              {...register("category")}
              className="border-purple-300 focus:border-purple-500" />
            {errors.category && <p className="text-red-500">{errors.category.message}</p>}
          </div>
          <div>
            <Label htmlFor="location" className="text-purple-700">
              Location
            </Label>
            <Input
              id="location"
              {...register("location")}
              className="border-purple-300 focus:border-purple-500" />
            {errors.location && <p className="text-red-500">{errors.location.message}</p>}
          </div>
          {/* <CollaboratorsList collaborators={collaborators} setCollaborators={setCollaborators} /> */}
          <FAQList faq={faq} setFaq={setFaq} />
          <MediaUrlsList mediaUrls={mediaUrls} setMediaUrls={setMediaUrls} />
        </CardContent>
      </Card>
      <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white">
        Create Project
      </Button>
    </form>)
  );
}

