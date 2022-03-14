const Product = require('../models/Product')

const getProducts = async (req, res) => {
    let searchTerm = req.params.searchTerm
    let objectToFind = searchTerm 
        ? { $or: [
                { name: {$regex: searchTerm, $options: "$i"} },
                { description: {$regex: searchTerm, $options: "$i"} },
                { brand: {$regex: searchTerm, $options: "$i"} },
                { category: {$regex: searchTerm, $options: "$i"} }
            ] 
         }
        : {}
   
    try{
        let products = await Product
            .find(objectToFind)
            .populate(['category', 'brand'])

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

        res.status(201).send("Product created successfully")
    }catch(error){
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

        res.status(200).send("Product updated successfully")
    }catch(error){
        res.status(400).send(error)
    }   
}

const deleteProduct = async (req, res) => {
    try{
        const { _id } = req.params

        await Product.findByIdAndDelete(_id)

        res.status(200).send("Product deleted successfully")
    }catch(error){
        res.status(400).send(error)
    }   
}

module.exports = {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
}