import { ContributorList } from "./ContributorList"
import { FundAllocationChart } from "./FundAllocationChart"
import { MediaCarousel } from "./MediaCarousel"
import { FundingProgress } from "./FundingProgress"
import { Description } from "./Description"
import { ContributionOverTime } from "./ContributionOverTime"

const projectData = {
  title: "Community Garden Revitalization",
  description:
    "Our project aims to transform an abandoned lot into a thriving community garden. This space will provide fresh produce, educational opportunities, and a beautiful green space for our neighborhood. We plan to install raised beds, a water system, and seating areas, making it accessible to all community members.",
  currentFunds: 75000,
  goal: 100000,
  daysRemaining: 15,
  contributors: [
    { id: "1", name: "Alice Johnson", amount: 5000, avatar: "/placeholder.svg?height=32&width=32" },
    { id: "2", name: "Bob Smith", amount: 3500, avatar: "/placeholder.svg?height=32&width=32" },
    { id: "3", name: "Carol Williams", amount: 2000, avatar: "/placeholder.svg?height=32&width=32" },
    { id: "4", name: "David Brown", amount: 1500, avatar: "/placeholder.svg?height=32&width=32" },
    { id: "5", name: "Eva Davis", amount: 1000, avatar: "/placeholder.svg?height=32&width=32" },
  ],
  fundAllocations: [
    { name: "Supplies", value: 30000, color: "#FF6384" },
    { name: "Labor", value: 25000, color: "#36A2EB" },
    { name: "Logistics", value: 15000, color: "#FFCE56" },
    { name: "Marketing", value: 5000, color: "#4BC0C0" },
  ],
  images: [
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
  ],
  contributionOverTime: [
    { date: "2023-01-01", amount: 0 },
    { date: "2023-01-15", amount: 15000 },
    { date: "2023-02-01", amount: 30000 },
    { date: "2023-02-15", amount: 45000 },
    { date: "2023-03-01", amount: 60000 },
    { date: "2023-03-15", amount: 75000 },
  ],
}

export function ProjectDashboard() {
  const handleBackProject = () => {
    console.log("Back this project clicked")
    // Implement the logic to handle project backing
  }

  return (
    (<div className="space-y-6">
      <MediaCarousel images={projectData.images} />
      <FundingProgress
        currentFunds={projectData.currentFunds}
        goal={projectData.goal}
        daysRemaining={projectData.daysRemaining}
        onBackProject={handleBackProject} />
      <Description title={projectData.title} description={projectData.description} />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4">
          <ContributionOverTime data={projectData.contributionOverTime} />
        </div>
        <div className="col-span-3">
          <ContributorList contributors={projectData.contributors} />
        </div>
        <div className="col-span-full">
          <FundAllocationChart allocations={projectData.fundAllocations} />
        </div>
      </div>
    </div>)
  );
}

