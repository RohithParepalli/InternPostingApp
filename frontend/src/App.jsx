import React from 'react'
import{ Route,RouterProvider,createRoutesFromElements} from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import Jobspage from './pages/Jobspage';
import MainLayout from './Layouts/Mainlayout';
import Homepage from './pages/Homepage';
import Jobpage ,{jobLoader}from './pages/Jobpage';
import Notfoundpage from './pages/Notfoundpage';
import Addjobpage from './pages/Addjobpage';
import Editjob from './pages/Editjob';



const App = () => {

  const addJob = async (newJob)=>{
    const jobData = {
      title: newJob.title,
      type: newJob.type, 
      location: newJob.location,
      description: newJob.description,
      salary: newJob.salary,
      company: {
        name: newJob.company.name,
        description: newJob.company.description,
        contactEmail: newJob.company.contactEmail,
        contactPhone: newJob.company.contactPhone
      }
    };
    console.log("Sending job data to API:", JSON.stringify(jobData, null, 2));
    try {
      
      const res = await fetch('/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobData),
      });
      
      const data = await res.json();
      console.log("API response:", data); 
      
      
      if (data.success) {
        toast.success('Job added successfully');
        navigate('/jobs');
        return data;
      } else {
        toast.error(data.message || 'Failed to add job');
        console.error("Server reported error:", data);
        throw new Error(data.message || 'Failed to add job');
      }
    } catch (error) {
      console.error('Error adding job:', error);
      toast.error('Error adding job: ' + error.message);
      throw error;
    }
  };

  const deletejob = async(id)=>{
    const res= await fetch(`/api/jobs/${id}`,{
      method: 'DELETE',
      
    });
    return;
  };
  const updatejobsubmit = async(job)=>{
    const jobId = job._id || job.id;
  
  // Prepare job data - removing id to avoid MongoDB conflicts
  const jobData = {
    title: job.title,
    type: job.type,
    location: job.location,
    description: job.description,
    salary: job.salary,
    company: {
      name: job.company.name,
      description: job.company.description,
      contactEmail: job.company.contactEmail,
      contactPhone: job.company.contactPhone
    }
  };

  try {
    const res = await fetch(`/api/jobs/${jobId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jobData),
    });
    
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error updating job:', error);
    throw error;
  }
  }


  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>
        <Route index element={<Homepage />} />
        <Route path='/jobs' element={<Jobspage />} />
        <Route path='/add-job' element={<Addjobpage addJobSubmit={addJob} />} />
        <Route path='/edit-job/:id' element={<Editjob updatejobsubmit={updatejobsubmit} />} loader={jobLoader} />
        <Route path='/jobs/:id' element={<Jobpage deletejob={deletejob}/>} loader={jobLoader} />
        <Route path='*' element={<Notfoundpage />} />
      </Route>
    )
  );
  
  return <RouterProvider router={router}/>;
};

export default App;