const path = require('path')
const Product = require('../models/product');
const cart = require('../models/cart');
const ObjectId = require('mongodb').ObjectId;

exports.getProduct = (req, res, next) => {
    //res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'));
    res.render('add-product.ejs', { 'pageTitle': 'My Add product page111111' })
};

exports.postProduct = (req, res, next) => {
    console.log(req.body);
    const imageUrl = req.body.imageURL;
    const title = req.body.title;
    const price = req.body.price;
    const description = req.body.description;
    const prod = new Product(null, title, imageUrl, price, description);

    prod.save()
        .then(result => {
            res.redirect('/')
        })
        .catch(err => console.log(err));
        
  

};

exports.saveProduct = (req, res, next) => {
    console.log(req.body);
    const prod = new Product(null,req.body, title, req.body.imageUrl, req.body.price, req.body.description);
    prod.save();
    console.log(Product.getAll());
    res.redirect('/');
}

exports.getAllProduct = (req, res, next) => {
    
    Product.getAll()
        .then(products => {
            console.log('shop.js===============',products)
            res.render('shop', { 'prods': products });
       })
        .catch(err => console.log(err));
    // send file is for static content ;
    // res.sendFile(path.join(__dirname, '../', 'views', 'shop.ejs'));
    // console.log(Product.getAll())
// //    const products = Product.getAll();
//  //  res.render('shop', { 'prods': products });  
    
};
exports.getProductById = (req, res, next) => {
    
    
     Product.findById(req.params.productId)
         .then(Product => {
             console.log('prodc:' , Product)
            res.render('viewDetalPage', { prod: Product});
    
})
.catch(err => console.log(err));
  
}

exports.editProductPage = (req, res, next) => {
  
    const products = Product.findById(req.params.productId)
        .then(product => {
            res.render('editProduct', { prod: product });
         
        })
        .catch(err => console.log(err));

  
  
    
}
exports.editProductSave = (req, res, next) => {
    const updatedProduct = new Product(req.body.id, req.body.title, req.body.imageURL, req.body.price, req.body.description);
    updatedProduct.update()
        .then(result => {
            res.redirect('/')
            

        })
    .catch(err => console.log(err))
    // console.log(req.body)
    //res.render('')
    //res.send('Update Successfuly');
   // res.redirect('/');

};

exports.deleteProduct = (req, res, next) => {
    const prodID = req.body.id;
    console.log(prodID);
    Product.deleteById(prodID)
        .then(result => {
        res.redirect('/')
    })
    .catch(err => console.log(err))
    

}
exports.addToCart = (req, res, next) => {
    const addedProduct = Product.findById(req.body.id)[0];
    cart.save(addedProduct);
    console.log(cart.getCart());
   // res.end("saved succesifu")
    res.redirect('/cart');
}
exports.getCart = (req, res, next) => {
    res.render('cart', { cart: cart.getCart(), pageTitle: 'Shopping Cart Detail', path: '/cart', name: 'Edward' })
}
exports.deleteInCart = (req, res, next) => {
    cart.delete(req.body.prodId);
    res.redirect('/cart');
}