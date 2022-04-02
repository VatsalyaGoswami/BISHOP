import express from "express";

const router=express.Router();
import {AuthUser ,
    getUserProfile,
    registerUser, 
    updateUserProfile,getUsers, deleteUser,getUserById,updateUser}from "../controllers/userController.js"
import protect from "../Middlewares/authMiddleware.js"
import admin from "../Middlewares/authMiddleware.js"


router.post('/login',AuthUser);
router.route('/').post(registerUser).get(protect,admin,getUsers)
router.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile)
router.route('/:id').delete(protect,admin,deleteUser).get(protect,admin,getUserById).put(protect,admin,updateUser)
export default router;