const express = require('express');
const path = require('path');
const productController = require('../controllers/products');
const  shopController=require('../controllers/products')


const router = express.Router();


router.get('/viewDetalPage/:productId', productController.getProductById);
router.get('/editProduct/:productId', productController.editProductPage);
router.post('/editProduct/', productController.editProductSave);
router.post('/delete-product',productController.deleteProduct),


// router.get('/viewDetalPage', productConstroller.getProductById);


    router.get('/', productController.getAllProduct);
    router.post('/add-to-cart', shopController.addToCart);

router.get('/cart', shopController.getCart);
router.post('/delete-cart', shopController.deleteInCart);

router.get('/error-demo', (req, res, next) => {
    throw new Error('This is to test Error handling in express');
});


module.exports = router;