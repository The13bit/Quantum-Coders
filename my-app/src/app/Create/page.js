import ProjectEditor from "@/components/ProjectEditor";

const page = () => {
  return (
    <div>
      <div className="container mx-auto py-8  w-1/2 m-8">
        <h1 className="text-3xl font-bold mb-8 text-purple-800">
          Create a New Project
        </h1>
        <ProjectEditor />
      </div>
    </div>
  );
};

export default page;
