const createJobs = require("../models/jobModel");

const jobs = async(req, res) => {
  
    const { jobTitle , jobDesc, keySkills,location, company } = req.body;

    try {
  
      let newJob = {
        user_id: req.user._id,
        jobTitle: req.body.jobTitle,
        category: req.body.category,
        jobDesc: req.body.jobDesc,
        terms : req.body.terms,
        companyLogo: req.file.filename,
        companyName: req.body.companyName,
        contactNo: req.body.contactNo,
        address: req.body.address,
        state: req.body.state,
        website: req.body.website,
        appEmail: req.body.appEmail,
        appWebLink: req.body.appWebLink
      };
  
      if(keySkills){
        newJob.keySkills = keySkills.split(',').map(skill => skill.trim())
      }
  
      const jobs = new createJobs(newJob);
      
      const insert_jobdata = await jobs.save();
      res.status(200).send({ success: true, msg:"Job post is created successfully.", data: insert_jobdata });
      
    } catch (error) {
      console.error(error);
      res.status(400).send(error.message);
    }
  
  }
  
  const search_jobs = async (req,res)=>{
    try {
      
      let conditions = {};
      if(req.query.keyword){
        conditions['$or'] = [{"jobTitle": new RegExp(req.query.keyword,"i")}, {"jobDesc": new RegExp(req.query.keyword,"i")}]
      }
  
      // if(req.query.skill){
      //   var skillkeys = req.query.skill.split(',');
      //   conditions["keySkills"] =  { $all: skillkeys};
      // }
  
      if(req.query.address){
        conditions["address"] = new RegExp(req.query.address,"i")
      }
      console.log(conditions);
      const result = await createJobs.find(conditions);
  
      res.status(200).send({success: true, data: result});
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  module.exports = {
      jobs,
      search_jobs
  }