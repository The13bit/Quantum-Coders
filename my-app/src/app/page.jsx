import { ProjectDashboard } from "../components/ProjectDashboard"

export default function Home() {
  return (
    (<main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Community Project Tracker</h1>
      <ProjectDashboard />
    </main>)
  );
}
