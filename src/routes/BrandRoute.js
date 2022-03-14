const express = require('express')
const router = express.Router()
const BrandController = require('../controllers/BrandController')

router.get('/getBrands/:searchTerm?', BrandController.getBrands)
router.post('/createBrand', BrandController.createBrand)
router.patch('/updateBrand', BrandController.updateBrand)
router.delete('/deleteBrand/:_id', BrandController.deleteBrand)

module.exports = router