import AsyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import UserModel from "../models/userModel.js"
import generatewebtoken from "../utils/generatetoken.js";

//@dec   Auth user &get token
//@route posy/api/users/login
//@access public
const AuthUser=AsyncHandler(async(req,res)=>{
const {email,password}=req.body
  const User =await UserModel.findOne({email});

  if(User&&(await User.matchPassword(password)))
  {
    res.json({
        _id:User._id,
        name:User.name,
        email:User.email,
        isAdmin:User.isAdmin,
        token:generatewebtoken(User._id)
    })
  }
  else{
     res.status (401)
     throw new Error('Invalid email or password')
  }
})
//@desc  get user profile
//route Post /api/users/profile
//@acess private
const getUserProfile=AsyncHandler(async(req,res)=>{
    const user=await User.findById(req.user._id)
    
    if(user)
    {
      res.json({
        _id:user._id,
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin,
      })
    }
    else{
      res.status(404)
      throw new Error('user not found')
    }
    })
    //@desc  update user profile
//route Put /api/users/profile
//@acess private
const updateUserProfile=AsyncHandler(async(req,res)=>{
  const user=await User.findById(req.user._id)
  console.log("abhi")
  if(user)
  {
    user.name=req.body.name||user.name
    user.email=req.body.email||user.email
    if(req.body.password)
    {
      user.password=req.body.password
    }
    const updatedUser=await user.save();
    res.json({
      _id:updatedUser._id,
      name:updatedUser.name,
      email:updatedUser.email,
      isAdmin:updatedUser.isAdmin,
      token:generatewebtoken(updatedUser._id)
  })
  }
  else{
    res.status(404)
    throw new Error('user not found')
  }
  })
  //@desc  get all users
//route   Get /api/users
//@acess private/Admin
const getUsers=AsyncHandler(async(req,res)=>{
  const users=await User.find({})
  res.json(users)
  })
//@desc create new user
//@route post/api/users
//@acess public
    const registerUser=AsyncHandler(async(req,res)=>{
      const {name,email,password}=req.body
        const Userexists =await UserModel.findOne({email});
        if(Userexists)
        {
          res.status(400)
          throw new Error('user already exists')
        }
        const user=await User.create({
          name,
          email,
          password
        })
        if(user){
          res.status(201).json({
            _id:user._id,
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin,
        token:generatewebtoken(user._id)
          })
        }
        else{
          res.status(400)
          throw new Error('Invalid user data');
        }
      })
//@desc   delete user by id
//route   DELETE/api/users/:id
//@acess  private/Admin
const deleteUser=AsyncHandler(async(req,res)=>{
  const user=await User.findById(req.params.id)
  if(user)
  {
await user.remove()
 res.json({message:'user removed'})
  }
  else{
    res.status(404)
    throw new Error('user not found')
  }

  })
//@desc   get  user by id
//route   Get /api/users/:id
//@acess  private/Admin
const getUserById=AsyncHandler(async(req,res)=>{
  const user=await User.findById(req.params.id).select('-password')
  if(user)
  {
  res.json(user)
  }
  else{
    res.status(404)
    throw new Error('user not found')
  }
  })
//@desc  update user 
//route  Put/api/users/:id
//@acess private/Admin
const updateUser=AsyncHandler(async(req,res)=>{

  const user=await User.findById(req.params.id)
 
  if(user)
  {
    user.name=req.body.name||user.name
    user.email=req.body.email||user.email
    user.isAdmin=req.body.isAdmin||user.isAdmin

    const updatedUser=await user.save();
    res.json({
      _id:updatedUser._id,
      name:updatedUser.name,
      email:updatedUser.email,
      isAdmin:updatedUser.isAdmin,
      
  })
  }
  else{
    res.status(404)
    throw new Error('user not found')
  }
  })

export {getUserById,
  updateUser,
  getUsers,
  AuthUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  deleteUser}