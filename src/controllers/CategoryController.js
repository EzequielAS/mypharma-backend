const Category = require('../models/Category')
const Product = require('../models/Product')

const getCategories = async (req, res) => {
    let searchTerm = req.params.searchTerm
    let objectToFind = searchTerm 
        ? { $or: [
                { name: {$regex: searchTerm, $options: "$i"} },
                { description: {$regex: searchTerm, $options: "$i"} }
            ] 
         }
        : {}
   
    try{
        let categories = await Category.find(objectToFind)

        res.status(200).json(categories)
    }catch(error){
        res.status(400).send(error)
    }   
}

const createCategory = async (req, res) => {
    try{
        const { name, description } = req.body

        let category = new Category({ 
            name,
            description 
        })

        await category.save()

        res.status(201).send("Category created successfully")
    }catch(error){
        res.status(400).send(error)
    }   
}

const updateCategory = async (req, res) => {
    try{
        const { _id, name, description } = req.body

        let category = {
            _id,
            name,
            description
        }

        await Category.findByIdAndUpdate(_id, category)

        res.status(200).send("Category updated successfully")
    }catch(error){
        res.status(400).send(error)
    }   
}

const deleteCategory = async (req, res) => {
    try{
        const { _id } = req.params

        await Product.deleteMany({ category: _id })

        await Category.findByIdAndDelete(_id)

        res.status(200).send("Category deleted successfully")
    }catch(error){
        res.status(400).send(error)
    }   
}

module.exports = {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory
}