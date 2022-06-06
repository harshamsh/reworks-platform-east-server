const {Schema,model}=require('mongoose')

const Products = new Schema({
     
    name : String,
    
    description : String,

    color : String,

    manDate : String,

    price : String,

    productId : {
        type  :Number
        
    },

    size: String,
    
    tags: [String]


}) 

const ProductModel = model("products", Products)

module.exports= ProductModel