import React from 'react'
import JobListing from './JobListing';
import { useState,useEffect } from 'react';
const JobListings = ({isHome=false}) => {
  const [jobs,setJobs] =useState([]);
  const [loading,setLoading]=useState(true);

  useEffect(()=>{
      const apiurl= isHome?'/api/jobs?_limit=3' :'/api/jobs'
    const fetchJobs = async ()=>{
    try{
      const res = await fetch(apiurl);
      const data = await res.json();
      setJobs(data);
    }
    catch(error){
      console.log('Error in fetching data',errror);
    }
    finally{
      setLoading(false);
    }
  }
  fetchJobs();
  },[isHome]);
  
  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          {isHome ? 'Recent Jobs' : 'Browse Jobs'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-3 text-center">Loading...</div>
          ) : (
            jobs.length > 0 ? (
              jobs.map((job) => (
                <JobListing key={job.id} job={job} />
              ))
            ) : (
              <div className="col-span-3 text-center">No jobs found</div>
            )
          )}
        </div>
      </div>
    </section>
  )
}

export default JobListings