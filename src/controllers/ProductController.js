const Product = require('../models/Product')
const logger = require('../utils/logger')

const getProducts = async (req, res) => {
    let searchTerm = req.params.searchTerm
    let objectToFind = searchTerm 
        ? { $or: [
                { name: {$regex: searchTerm, $options: "$i"} },
                { description: {$regex: searchTerm, $options: "$i"} },
                { 
                    'brand.name': { $regex: searchTerm, $options: "$i" } 
                    
                },
                {
                    'category.name': { $regex: searchTerm, $options: "$i" } 
                }
            ] 
         }
        : {}
    
    try{
        let products = await Product.aggregate([
            {
                $lookup: {
                    from: 'brands',
                    localField: 'brand',
                    foreignField: '_id',
                    as: 'brand'
                }
            },
            {
                $unwind: '$brand'
            },
            {
                $lookup: {
                    from: 'categories',
                    localField: 'category',
                    foreignField: '_id',
                    as: 'category'
                }
            },
            {
                $unwind: '$category'
            },
            {
                $match: objectToFind
            }
        ])


        res.status(200).json(products)
    }catch(error){
        res.status(400).send(error)
    }   
}

const createProduct = async (req, res) => {
    try{
        const { 
            name, 
            description,
            price,
            inventory,
            category,
            brand
        } = req.body

        let product = new Product({ 
            name,
            description,
            price,
            inventory,
            category,
            brand 
        })

        await product.save()

        logger.info(`Product ${name} was created`)
        res.status(201).send("Product created successfully")
    }catch(error){
        logger.error(error)
        res.status(400).send(error)
    }   
}

const updateProduct = async (req, res) => {
    try{
        const { 
            _id, 
            name, 
            description,
            price,
            inventory,
            category,
            brand 
        } = req.body

        let product = {
            _id,
            name,
            description,
            price,
            inventory,
            category,
            brand 
        }

        await Product.findByIdAndUpdate(_id, product)

        logger.info(`Product ${name} was updated`)
        res.status(200).send("Product updated successfully")
    }catch(error){
        logger.error(error)
        res.status(400).send(error)
    }   
}

const deleteProduct = async (req, res) => {
    try{
        const { _id } = req.params

        await Product.findByIdAndDelete(_id)

        logger.info(`Product ${_id} was deleted`)
        res.status(200).send("Product deleted successfully")
    }catch(error){
        logger.error(error)
        res.status(400).send(error)
    }   
}

module.exports = {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
}