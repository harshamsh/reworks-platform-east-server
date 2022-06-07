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
    
    tags: [String],

    tag: String


})

Products.index({tag: 'text'})

const ProductModel = model("products", Products)


module.exports= ProductModel