import React from 'react'
import Hero from '../components/Hero'
import Homecards from '../components/Homecards'
import JobListings from '../components/JobListings'
import ViewAllJobs from '../components/ViewAllJobs'
const Homepage = () => {
  return (
    <>
    <Hero/>
    <Homecards />
    <JobListings isHome={true}/>
    <ViewAllJobs />
    </>
  )
}

export default Homepage