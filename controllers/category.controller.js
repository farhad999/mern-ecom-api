const Joi = require("joi");
const Category = require("../models/Category");

const index = async (req, res) => {
    const categories = await Category.find({});

    return res.json({categories});
}

const createOrUpdate = async (req, res) => {
  const schema = Joi.object({
    id: Joi.string().optional(),
    parentId: Joi.string().optional(),
    name: Joi.string().required(),
    image: Joi.string(),
  });

  const { error, value } = schema.validate(req.body);

  if (!error) {
    let { id, parentId, ...rest } = value;

    //Todo Create parent child system in category

    if (id) {
      try {
        await Category.findOneAndUpdate({ _id: id }, rest, { new: true });

        return res.json({ status: "success", message: "Category Updated" });
      } catch (er) {
        return res.status(500).json({message: 'Something went wrong '+er.message});
      }
    } else {
      try {
        const category = new Category(rest);
        await category.save();
        return res.json({ status: "success", message: "Category Added" });
      } catch (er) {
        return res.status(500).json({ message: "server error " + er.message });
      }
    }
  } else {
    return res.json({
      status: "failed",
      message: "Validation Error " + error.message,
    });
  }
};

const deleteCategory = async (req, res) => {
    const {id} = req.params;

    try{
        await Category.findOneAndDelete({_id: id});
        return res.json({status: 'success', message: 'Cateogry Deleted'});
    }catch(er){
        return res.status(500).json({message: 'Something went wrong'+er.message});
    }

}

module.exports = {
  createOrUpdate,
  deleteCategory,
  index,
};
