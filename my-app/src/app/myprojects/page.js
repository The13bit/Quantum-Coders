"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function MyProjects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const response = await fetch("/api/projects/myprojects");
    const data = await response.json();
    setProjects(data);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this project?")) {
      await fetch(`/api/projects/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      fetchProjects();
    }
  };

  return (
    <div className="p-8 bg-purple-300 h-screen">
      <h1 className="text-2xl font-bold mb-6">My Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {projects.map((project) => (
          <div key={project._id} className="border rounded-lg p-4 shadow bg-purple-100">
            <h2 className="text-xl font-semibold">{project.title}</h2>
            <p className="text-gray-600 mt-2">{project.description}</p>
            <div className="mt-4 space-x-4">
              <Link 
                href={`/projects/${project._id}/edit/`}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(project._id)}
                className="bg-red-500  text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}