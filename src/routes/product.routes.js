const express = require('express')
const ProductController = require('../controllers/ProductController')

const router = express.Router()

router.get('/', ProductController.listView)
router.get('/create', ProductController.createView)
router.get('/edit/:id', ProductController.editView)

router.post('/update', ProductController.update)
router.post('/delete', ProductController.delete)
router.post('/create', ProductController.insert)


module.exports = router;