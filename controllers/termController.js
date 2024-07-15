const Terms = require('../models/termModel');

const add_term = async (req, res) => {

    try {
        const term = new Terms({
            user_id: req.user._id,
            term: req.body.term,
            status: req.body.status
        });

        const termData = await Terms.findOne({ term: req.body.term });
        if (termData) {
        res
            .status(400)
            .send({ success: false, msg: "This term is already exists." });
        } else {
        const cat_data = await term.save();
        res.status(200).send({ success: true, data: cat_data });
        }
    } catch (error) {
        console.error(error);
        res.status(400).send({success: false, msg: error.message})
    } 
}

const getterms = async (req, res) => {

  try {
    const cdata = await Terms.find({});
    res.status(200).send({success: true, msg:"term details fetched successfully.", data: cdata});
  } catch (error) {
    res.status(400).send({success: false, msg: error.message});
  }
  
}

const delete_term = async (req, res) => {
    const deleteid = req.params.id;
    try {
        
        const del_term = await Terms.findByIdAndRemove({_id:deleteid});
        res.status(200).send({ success: true,  msg:"Terms has delete successfully."});
        
      } catch (error) {
        res.status(400).send({success: false, msg: error.message});
      }

}

module.exports = {
    add_term,
    getterms,
    delete_term
};