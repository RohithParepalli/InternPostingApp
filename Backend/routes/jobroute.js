import express from 'express';
import Job from '../models/job.js'
const router = express.Router();
import mongoose from 'mongoose';

router.post('/',async(req,res)=>{
    const job = req.body;
    console.log("Received job data:", job); // Log the received data

    if(!job.title || !job.type || !job.description || !job.location || !job.salary || !job.company || !job.company.name || !job.company.description){
        console.log("Validation failed:", {job}); // Log validation failure details
        return res.status(400).json({success:false, message:'Provide all fields'});
    }
    
    const newjob = new Job(job);
    try{
        const savedJob = await newjob.save();
        console.log("Job saved successfully:", savedJob); // Log the saved job
        res.status(201).json({success:true, message:'Job added successfully', data: savedJob});
    }
    catch(error){
        console.error("Error in creating Job - Full error:", error); // Log the full error
        console.error("Error in creating Job - Message:", error.message);
        res.status(500).json({success:false, message:'Server Error', error: error.message})
    }
})

router.get('/',async(req,res)=>{
    try{
        let query = Job.find({});
        
        console.log("GET /api/jobs request received", {
          limit: req.query._limit || 'none'
        });
        
        // Handle limit parameter for homepage
        if(req.query._limit) {
            const limit = parseInt(req.query._limit);
            query = query.limit(limit);
        }
        
        const jobs = await query;
        console.log(`Found ${jobs.length} jobs in database`);
        
        // Transform jobs to include id property
        const transformedJobs = jobs.map(job => {
            const jobObj = job.toObject();
            jobObj.id = jobObj._id;
            return jobObj;
        });
        
        res.status(200).json(transformedJobs);
    }
    catch(error){
        console.error("Error in Fetching Jobs:", error);
        res.status(500).json({success:false, message:'Server Error', error: error.message})
    }
})
router.get('/:id', async(req, res) => {
    const { id } = req.params;
    
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({success: false, message: 'Invalid Job ID'});
    }
    
    try {
        const job = await Job.findById(id);
        
        if(!job) {
            return res.status(404).json({success: false, message: 'Job not found'});
        }
        
        // Transform to match frontend expectations
        const jobObj = job.toObject();
        jobObj.id = jobObj._id;
        
        res.status(200).json(jobObj);
    }
    catch(error) {
        console.error("Error fetching job", error.message);
        res.status(500).json({success: false, message: 'Server Error'})
    }
})

router.delete('/:id',async(req,res)=>{
    const {id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({success: false, message: 'Invalid Job ID'});
    }
    try{
        await Job.findByIdAndDelete(id);
        res.status(201).json({success:true,message:'job deleted'});
    }
    catch(error){
        console.error("Error in Deleting Job",error.message);
    res.status(500).json({success:false,message:'Server Error'})
    }
    
})
router.put('/:id',async(req,res)=>{
    const {id}=req.params;
    const job=req.body;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false,message:'Invalid Product Id'});
    }
    try{
        const updatedjob =  await Job.findByIdAndUpdate(id,job,{new:true});
       
        if(!updatedjob) {
            return res.status(404).json({success: false, message: 'Job not found'});
        }
        
        // Transform to include id property
        const jobObj = updatedjob.toObject();
        jobObj.id = jobObj._id;
        
        res.status(200).json({success: true, data: jobObj});
    }
    catch(error){
       
    res.status(500).json({success:false,message:'Server Error'})
    }
    
})
export default router ;