const Joi = require('joi');
const Product = require('../models/Product');
const getSlug = require("../utils/getSlug");
const Category = require('../models/Category');
const Brand = require('../models/Brand')

const index = async (req, res) => {

    const {category, brand} = req.query;

    const filter = {};

    if(category){
        const cat = await Category.findOne({slug: category});
        filter.category = cat._id;
    }

    if(brand){
        const brand2 = await Brand.findOne({slug: brand});
        filter.brand = brand2._id;
    }

    console.log('filter', filter);

    const products = await Product.find({...filter}).populate('brand');

    return res.json({products});
}

const create = async (req, res) => {

    const schema = Joi.object({
        sku: Joi.string().optional().allow(''),
        name: Joi.string().required(),
        description: Joi.string(),
        price: Joi.number().required(),
        offerPrice: Joi.number().optional(),
        stocks: Joi.number().required(),
        category: Joi.string().optional(),
        brand: Joi.string().optional(),
        thumbImage: Joi.string(),
        // galleryImage: Joi.array(),
    });
    //images will be handled later

    console.log("value", req.body);

    const {value, error} = schema.validate(req.body);

    if (req.file) {
        value.thumbImage = req.file.filename;
    }

    if (!error) {

        const slug = await getSlug({name: value.name, model: Product});

        try {
            await Product.create({...value, slug});

            return res.json({status: 'success', message: 'product added'});
        } catch (er) {
            return res.status(500).json({message: "Something went wrong" + er.message});
        }

    } else {
        return res.status(500).json({message: 'Validation error ' + error.message});
    }
}

const update = async (req, res) => {

    let {id} = req.params;

    const schema = Joi.object({
        sku: Joi.string().optional().allow(''),
        name: Joi.string().optional(),
        description: Joi.string(),
        price: Joi.number().optional(),
        offerPrice: Joi.number().optional(),
        stocks: Joi.number().optional(),
        brand: Joi.string().optional(),
        category: Joi.string(),
        thumbImage: Joi.string(),
    });

    //images will be handled later

    const {value, error} = schema.validate(req.body);

    if (!error) {

        const slug = await getSlug({name: value.name, model: Product});

        try {
            await Product.findOneAndUpdate({_id: id}, {...value, slug:slug}, {new: true});
            return res.json({status: 'success', message: 'product Updated'});
        } catch (er) {
            return res.status(500).json({message: "Something went wrong" + er.message});
        }

    } else {
        return res.status(500).json({message: 'Validation error ' + error.message});
    }
}

const deleteProduct = async (req, res) => {
    let {id} = req.params;

    try {
        await Product.findOneAndDelete({_id: id});

        return res.json({status: 'success', message: 'Product Deleted'});
    } catch (er) {
        return res.status(500).json({"message": 'Server error ' + er.message});
    }
}

const view = async (req, res) => {
    let {slug} = req.params;

    const product = await Product.findOne({slug}).populate('category')
        .populate('brand');

    res.json({product});

}

module.exports = {
    create, update, index, deleteProduct, view,
}
