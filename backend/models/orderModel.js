import  Mongoose  from "mongoose";

const orderSchema=Mongoose.Schema({
    user:{
        type:Mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
          },
        orderItems:[{
            name:{type:String,required:true},
            qty:{type:Number,required:true},
            image:{type:String,requird:true},
            price:{type:Number,required:true},
            product:{
                type:Mongoose.Schema.Types.ObjectId,
                required:true,
                ref:'product'
            }
        }],
        shippingAddress:{
         address:{type:String,required:true},
         city:{type:String,requird:true},
         postalcode:{type:String,requird:true},
         country:{type:String,required:true}
        },
        paymentMethod:{
            type:String,
            requied:true
        },
        paymentResult:{
            id:{type:String},
            status:{type:String},
            updatetime:{type:String},
            emailaddress:{type:String}
        },
        taxPrice:{
           type:Number,
          
           default:0.0, 
        },
        shippingPrice:{
            type:Number,
           required:true,
            default:0.0, 
         },
         totalPrice:{
            type:Number,
            required:true,
            default:0.0, 
         },
         isPaid:{
             type:Boolean,
             required:true,
             default:false
         },
         paidAt:{
         type:Date
         },
         isDelivered:{
             type:Boolean,
            
             default:false
         },
         DeliveredAt:{
          type:Date   
         }
                },{
                      timestamps:true
                  }
)
const Order=Mongoose.model('Order',orderSchema);
export default Order;