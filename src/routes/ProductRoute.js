const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/ProductController')

router.get('/getProducts/:searchTerm?', ProductController.getProducts)
router.post('/createProduct', ProductController.createProduct)
router.patch('/updateProduct', ProductController.updateProduct)
router.delete('/deleteProduct/:_id', ProductController.deleteProduct)

module.exports = router