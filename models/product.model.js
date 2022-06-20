const {Schema,model}=require('mongoose')

const Products = new Schema({
  readable_name: String,

  item_desc: String,

  item_size: String,

  image_url: String,

  productId: String,

  itemId: String,

  color: String,

  manDate: String,

  price: String,

  tag: String,
}); 

Products.index({ item_desc: "text" });
const ProductModel = model("products", Products)

module.exports= ProductModel