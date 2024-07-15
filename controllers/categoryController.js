const Category = require('../models/categoryModel');

const add_category = async (req, res) => {

    try {
        const category = new Category({
            user_id: req.user._id,
            category: req.body.category,
            status: req.body.status
        });

        const categoryData = await Category.findOne({ category: req.body.category });
        if (categoryData) {
        res
            .status(400)
            .send({ success: false, msg: "This category is already exists." });
        } else {
        const cat_data = await category.save();
        res.status(200).send({ success: true, data: cat_data });
        }
    } catch (error) {
        console.error(error);
        res.status(400).send({success: false, msg: error.message})
    } 
}

const getcategories = async (req, res) => {

  try {
    const cdata = await Category.find({});
    res.status(200).send({success: true, msg:"category details fetched successfully.", data: cdata});
  } catch (error) {
    res.status(400).send({success: false, msg: error.message});
  }
  
}

const delete_category = async (req, res) => {
    const deleteid = req.params.id;
    try {
        
        const del_category = await Category.findByIdAndRemove({_id:deleteid});
        res.status(200).send({ success: true,  msg:"Category has delete successfully."});
        
      } catch (error) {
        res.status(400).send({success: false, msg: error.message});
      }

}

module.exports = {
    add_category,
    getcategories,
    delete_category
};