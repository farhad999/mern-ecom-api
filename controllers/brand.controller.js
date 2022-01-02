const Joi = require("joi");
const { TokenExpiredError } = require("jsonwebtoken");
const Brand = require("../models/Brand");

const index =async (req, res) => {

  const brands = await Brand.find({});

  return res.json({brands});
}

const createOrUpdate = async (req, res) => {

  const {filename} = req.file;

  const brandSchema = Joi.object({
    id: Joi.string().optional(),
    name: Joi.string().required(),
    description: Joi.string(),
  });

  const { error, value } = brandSchema.validate(req.body);

  //return res.json(value);

  if (!error) {
    let { id, ...rest } = value;
    //update if id is passed
    if (id) {
      //now find the brand by id
      try {
        await Brand.findByIdAndUpdate({ _id: id }, {rest, image: filename}, { new: true });
        return res.json({ status: "success", message: "Brand updated" });
      } catch (er) {
        res.status(500).json({ message: "Server Error" + er.message });
      }
    }

    try {
      const brand = new Brand({...value, image: filename});

      await brand.save();

      return res.json({ status: "success", message: "Brand Added" });
    } catch (er) {
      return res.status(500).json({ status: "Server error" + er.message });
    }
  } else {
    return res.json({ status: "failed", message: error.message });
  }
};

const deleteBrand = async (req, res) => {

  let { id } = req.params;

  try {
    await Brand.findOneAndDelete({ _id: id });

    return res.json({ status: "success", message: "Brand Deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" + error.message });
  }
};

module.exports = {
  index,
  createOrUpdate,
  deleteBrand,
};
