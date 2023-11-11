const express=require('express');
const router=express.Router();


const {login,register}=require('../controllers/auth')
const {allUsers} =require('../controllers/allUsers')



router.post('/login',login);
router.post('/register',register);
router.get('/dashboard',allUsers);


module.exports=router;