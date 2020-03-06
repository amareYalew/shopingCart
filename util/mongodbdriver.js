
// no need on line shopping
const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017')
    .then(client => {

        console.log('connected..........')
        const db = client.db('tesDB');
        db.collection('products').find().each( (err, doc)=>{
            console.log(doc);
            client.close();
        })
    
    }).catch(err => console.log(err));

    // It is for 2nd method to connect 
    
const MongoClient = require('mongodb').MongoClient;



const mongoConnect = function (callback) {
    MongoClient.connect('mongodb://localhost:27017',  { useUnifiedTopology: true })
        .then(client => {

            console.log('connected..........')
            callback(client);
        })
        .catch(err => {
            throw new Error('DB connection failed.........');
            
        });
       
}

module.exports = mongoConnect;