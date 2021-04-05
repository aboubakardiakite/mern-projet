const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model');

// // les middleware d'authen
// module.exports.checkUser = (req,res,next)=>{
//     const token = req.cookies.jwt;

//     if(token){
//         jwt.verify(token,process.env.TOKEN_SECRET,async(err,decodedToken)=>{
//             if(err){
//                 res.locals.user = null;
//                 res.cookie('jwt','',{maxAge:1});
//                 next();
//             }else{
//                 console.log("deco"+decodedToken.id);
//                 let user = await UserModel.findById(decodedToken);
//                 res.locals.user = user;// les locals sont parametres que nous avons provisoirement dans notre requet on lui passe user
//                 console.log(user);
//                 next();
//             }

//         })
//     }else{// si pas de token 
//         res.locals.user = null;
//         console.log('No token');
//         next();
//     }

// }

// module.exports.requireAuth = (req,res,next)=>{
//     const token = req.cookies.jwt;
//     if(token){
//         jwt.verify(token,process.env.TOKEN_SECRET,async(err,decodedToken)=>{
//             if(err){
//                 console.log(err);
//             }else{
//                 console.log(decodedToken.id);
//                 next();
//             }
//         });
//     }else{
//         console.log('No token');
//     }
// }