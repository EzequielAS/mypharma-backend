const Brand = require('../models/Brand')
const Product = require('../models/Product')

const getBrands = async (req, res) => {
    let searchTerm = req.params.searchTerm
    let objectToFind = searchTerm 
        ? { name: {$regex: searchTerm, $options: "$i"} }
        : {}
   
    try{
        let brands = await Brand.find(objectToFind)

        res.status(200).json(brands)
    }catch(error){
        res.status(400).send(error)
    }   
}

const createBrand = async (req, res) => {
    try{
        const { name } = req.body

        let brand = new Brand({ name })

        await brand.save()

        res.status(201).send("Brand created successfully")
    }catch(error){
        res.status(400).send(error)
    }   
}

const updateBrand = async (req, res) => {
    try{
        const { name, _id } = req.body

        let brand = {
            _id,
            name
        }

        await Brand.findByIdAndUpdate(_id, brand)

        res.status(200).send("Brand updated successfully")
    }catch(error){
        res.status(400).send(error)
    }   
}

const deleteBrand = async (req, res) => {
    try{
        const { _id } = req.params

        await Product.deleteMany({ brand: _id })

        await Brand.findByIdAndDelete(_id)

        res.status(200).send("Brand deleted successfully")
    }catch(error){
        res.status(400).send(error)
    }   
}

module.exports = {
    getBrands,
    createBrand,
    updateBrand,
    deleteBrand
}