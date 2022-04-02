import  Mongoose  from "mongoose";
 const reviewSchema=Mongoose.Schema({
     name:{type:String,required:true},
     rating:{type:Number,required:true},
     comment:{type:String,required:true},
     user:{
        type:Mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
        }
 },{
     timestamps:true
 })

const productSchema=Mongoose.Schema({
    user:{
    type:Mongoose.Schema.Types.ObjectId,
    required:true,
    ref:'User'
    },
    name:{
        type:String,
        required:true
          },
        image:{
            type:String,
            required:true,
          
              },
             brand:{
                type:String,
                required:true
                  },
                  category:{
                      type:String,
                      required:true,
                  },
                  description:{
                    type:String,
                    required:true,
                },
                reviews:[reviewSchema],
               rating: {
                type:Number,
                required:true,
                default:0
                },
                numReviews:{
                type:Number,
                required:true,
                default:0
                },
                price:{
                    type:Number,
                    required:true,
                    default:0
                    },
                    countinstock:{
                        type:Number,
                        required:true,
                        default:10
                        }
                },{
                      timestamps:true
                  }
)
const Product=Mongoose.model('Product',productSchema);
export default Product;