const express = require('express')
const router = express.Router()
const CategoryController = require('../controllers/CategoryController')

router.get('/getCategories/:searchTerm?', CategoryController.getCategories)
router.post('/createCategory', CategoryController.createCategory)
router.patch('/updateCategory', CategoryController.updateCategory)
router.delete('/deleteCategory/:_id', CategoryController.deleteCategory)

module.exports = router