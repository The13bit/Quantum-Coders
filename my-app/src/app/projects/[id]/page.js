"use client";
import ProjectDetail from "@/components/ProjectDetail";
import ProjectDiscussion from "@/components/ProjectDiscussion";
import ProjectDetail2 from "@/components/ProjectDetails2";
import Navbar from "@/components/Navbar";
import { useEffect,useState } from "react";

export default function HomePage({params}) {
    const [projectData, setProjectData] = useState(null);
    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        return date.toISOString().split('T')[0];
      };
      const getHoursLeft = (deadlineDate) => {
        const now = new Date();
        const deadline = new Date(deadlineDate);
        const diffInMs = deadline - now;
        const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
        return diffInHours > 0 ? diffInHours : 0;
      };
    useEffect(()=>{
        const getcontribname=async(contributorId)=>{
            try {
                const response = await fetch(`/api/users/${contributorId}`, {
                  method: 'GET',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                });
            
                if (!response.ok) {
                  const error = await response.json();
                  throw new Error(error.error || 'Failed to fetch contributor');
                }
            
                const { name } = await response.json();
                return name;
              } catch (error) {
                console.error('Error fetching contributor:', error);
                throw error;
              }
        }
        const fetchProjectData = async (projectId) => {
            try {
                const {id}=await params;
              const response = await fetch(`/api/projects/${id}`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
              });
          
              if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Failed to fetch project');
              }
          
              const project = await response.json();
              project.raised = project.contributions.reduce((tot, contribution) => tot + contribution.amount, 0);
              project.ovt=project.contributions.map((contribution)=>{return {date:formatDate(contribution.contributedAt),amount:contribution.amount}});
              project.hoursLeft=project.deadline?getHoursLeft(project.deadline):0;
              project.contributions.forEach((i)=>{
                i.name=getcontribname(i.contributor);
              })
              console.log(project)
              return project;
            } catch (error) {
              console.error('Error fetching project:', error);
              throw error;
            }
          };
          const call=async()=>{
            const res=await fetchProjectData();
            console.log(res)
            setProjectData(res);
          }
          call();
    },[])

    // Random data for the project details
    // const projectData = {
    //     title: 'Save the Forests Initiative',
    //     media: [
    //         { type: 'image', url: 'https://example.com/image1.jpg' },
    //         { type: 'image', url: 'https://example.com/image2.jpg' },
    //         { type: 'video', url: 'https://example.com/video1.mp4' },
    //     ],
    //     budget: 50000,
    //     funded: 20000,
    //     contributors: 150,
    //     hoursLeft: 72,
    //     description: 'This initiative aims to protect endangered forests by purchasing land and implementing sustainable management practices.',
    //     faq: [
    //         { question: 'What will the funds be used for?', answer: 'Funds will be used for land acquisition and sustainable management.' },
    //         { question: 'How can I contribute?', answer: 'You can contribute by donating or volunteering for our programs.' },
    //     ],
    //     updates: 'We have successfully acquired 50 acres of forest land and are working on planting native species.',
    //     comments: [
    //         'This is such a great initiative!',
    //         'How can I volunteer to help?',
    //         'Excited to see the progress on this project!'
    //     ],
    // };

    return (
        <div>
           
            <ProjectDetail2 {...projectData} />


        </div>
    );

}