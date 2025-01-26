"use client";
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
export default function EditProject({ params }) {
  const router = useRouter();
  const { id } = use(params);
  const {toast}=   useToast();
  const [project, setProject] = useState({
    title: "",
    description: "",
    fundingGoal: 0,
    deadline: "",
    category: "",
    location: "",
    mediaUrls: [],
    progressUpdates: [],
    faq: [],
  });
  const [error, setError] = useState("");

  // Add/remove handlers for dynamic arrays
  const addMediaUrl = () => {
    setProject((prev) => ({
      ...prev,
      mediaUrls: [...prev.mediaUrls, ""],
    }));
  };

  const addUpdate = () => {
    setProject((prev) => ({
      ...prev,
      progressUpdates: [
        ...prev.progressUpdates,
        { description: "", mediaUrls: [] },
      ],
    }));
  };

  const addFaq = () => {
    setProject((prev) => ({
      ...prev,
      faq: [...prev.faq, { question: "", answer: "" }],
    }));
  };

  const removeMediaUrl = (index) => {
    setProject((prev) => ({
      ...prev,
      mediaUrls: prev.mediaUrls.filter((_, i) => i !== index),
    }));
  };

  const removeUpdate = (index) => {
    setProject((prev) => ({
      ...prev,
      progressUpdates: prev.progressUpdates.filter((_, i) => i !== index),
    }));
  };

  const removeFaq = (index) => {
    setProject((prev) => ({
      ...prev,
      faq: prev.faq.filter((_, i) => i !== index),
    }));
  };

  // Handle changes for dynamic arrays
  const handleMediaUrlChange = (index, value) => {
    setProject((prev) => ({
      ...prev,
      mediaUrls: prev.mediaUrls.map((url, i) => (i === index ? value : url)),
    }));
  };

  const handleUpdateChange = (index, field, value) => {
    setProject((prev) => ({
      ...prev,
      progressUpdates: prev.progressUpdates.map((update, i) =>
        i === index ? { ...update, [field]: value } : update
      ),
    }));
  };

  const handleFaqChange = (index, field, value) => {
    setProject((prev) => ({
      ...prev,
      faq: prev.faq.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  useEffect(() => {
    const fetchProject = async () => {
      try {
        //const {id}=await params;
        const response = await fetch(`/api/projects/${id}`);
        const data = await response.json();
        if (response.ok) {
          // Format date to YYYY-MM-DD for input field
          data.deadline = data.deadline
            ? new Date(data.deadline).toISOString().split("T")[0]
            : "";
          setProject(data);
        } else {
          setError(data.error);
        }
      } catch (err) {
        setError("Failed to fetch project");
      }
    };
    fetchProject();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(project),
      });
      const data = await response.json();

      if (response.ok) {
        toast({description:"Project updated successfully"});
        router.push("/myprojects");
      } else {
        toast({description:data.error,variant:"destructive"});
        setError(data.error);
      }
    } catch (err) {
      setError("Failed to update project");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="bg-purple-300 flex justify-center h-full w-full">
      <div className="w-1/2 h-1/2  p-8 bg-purple-100 rounded-lg shadow m-4">
        <h1 className="text-2xl font-bold mb-6">Edit Project</h1>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* ... existing form fields ... */}
          <div>
            <label className="block mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={project.title}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Description</label>
            <textarea
              name="description"
              value={project.description}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              rows="4"
            />
          </div>
          <div>
            <label className="block mb-2">Funding Goal</label>
            <input
              type="number"
              name="fundingGoal"
              value={project.fundingGoal}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Deadline</label>
            <input
              type="date"
              name="deadline"
              value={project.deadline}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">Category</label>
            <input
              type="text"
              name="category"
              value={project.category}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">Location</label>
            <input
              type="text"
              name="location"
              value={project.location}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Media URLs Section */}
          <div className="border-t pt-4">
            <h2 className="text-xl font-semibold mb-4">Media URLs</h2>
            {project.mediaUrls.map((url, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="url"
                  value={url}
                  onChange={(e) => handleMediaUrlChange(index, e.target.value)}
                  className="flex-1 p-2 border rounded"
                  placeholder="Enter media URL"
                />
                <button
                  type="button"
                  onClick={() => removeMediaUrl(index)}
                  className="bg-red-500 text-white px-3 rounded"
                >
                  ×
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addMediaUrl}
              className="bg-green-500 text-white px-4 py-2 rounded mt-2"
            >
              Add Media URL
            </button>
          </div>

          {/* Progress Updates Section */}
          <div className="border-t pt-4">
            <h2 className="text-xl font-semibold mb-4">Progress Updates</h2>
            {project.progressUpdates.map((update, index) => (
              <div key={index} className="border p-4 mb-4 rounded">
                <textarea
                  value={update.description}
                  onChange={(e) =>
                    handleUpdateChange(index, "description", e.target.value)
                  }
                  className="w-full p-2 border rounded mb-2"
                  placeholder="Update description"
                />
                <button
                  type="button"
                  onClick={() => removeUpdate(index)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Remove Update
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addUpdate}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Add Update
            </button>
          </div>

          {/* FAQ Section */}
          <div className="border-t pt-4">
            <h2 className="text-xl font-semibold mb-4">FAQ</h2>
            {project.faq.map((item, index) => (
              <div key={index} className="border p-4 mb-4 rounded">
                <input
                  type="text"
                  value={item.question}
                  onChange={(e) =>
                    handleFaqChange(index, "question", e.target.value)
                  }
                  className="w-full p-2 border rounded mb-2"
                  placeholder="Question"
                />
                <textarea
                  value={item.answer}
                  onChange={(e) =>
                    handleFaqChange(index, "answer", e.target.value)
                  }
                  className="w-full p-2 border rounded mb-2"
                  placeholder="Answer"
                />
                <button
                  type="button"
                  onClick={() => removeFaq(index)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Remove FAQ
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addFaq}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Add FAQ
            </button>
          </div>

          <div className="flex gap-4 border-t pt-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Update Project
            </button>
            <button
              type="button"
              onClick={() => router.push("/myprojects")}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
