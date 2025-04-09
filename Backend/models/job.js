import mongoose from "mongoose";

const jobschema = new mongoose.Schema({
    
    title:{
        type:String,
        required:true,
    },
    type:{
        type:String,
        required:true,

    },
    description:{
        type:String,
        required:true,

    },
    location:{
        type:String,
        required:true,

    },
    salary:{
        type:String,
        required:true,

    },
    company: {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        contactEmail: {
            type: String,
            required: false,
        },
        contactPhone: {
            type: String,
            required: false,
        }
    }

    
},
{timestamps:true});

const Job = mongoose.model('job',jobschema);
export default Job;