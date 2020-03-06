let products = [];
const mongoConnect = require('../util/database');
const getDB = require('../util/database').getDB;
const ObjectId = require('mongodb').ObjectId;

class Product {
    constructor(id, title, imageUrl, price, description) {
        this._id=id
        this.title = title;
        this.imageUrl = imageUrl
        this.price = price;
        this.description= description;
    }
    save() {
        // this.id=Math.floor(Math.random()*10000)
        // products.push(this);
        // mongoConnect((client) => {
        //     client.db('onlineshopping')
        //         .collection('products')
        //         .insertOne(this)
        //         .then(result => result.result)
        //         client.close()
                
            
        // })    
        // .catch(err => console.log(err));
        const db = getDB();
      return  db.collection('products')
            .insertOne(this)
            .catch(err => console.log(err));

  
    }
 
    static getAll() {
        // return products;
             const db = getDB();
       return  db.collection('products')
            .find()
            .toArray()
            .catch((err => console.log(err)));

    }



    static findById(prodId) {
        // return products.filter(p => p.id == prodId);
        // console.log(products);
        const db = getDB();
        return db.collection('products')
           
        .findOne({_id : new ObjectId(prodId)})
        
    }
    update() {
        // const findProduct = products.findIndex(p => p.id == this.id);
        // products[findProduct] = this;
        // console.log(products);
        const db = getDB();
        return db.collection('products')
            .update({ _id: new ObjectId(this._id) }, {
                $set: {
                    title: this.title,
                    price: this.price,
                    imageUrl: this.imageUrl,
                    description: this.description
                    
                }
            });

    }
    static deleteById(PrId) {
        products = products.filter(p => p.id != PrId);
        const db = getDB();
        return db.collection('products')
        .remove({ _id: new ObjectId(PrId) })

    }
}
module.exports = Product;