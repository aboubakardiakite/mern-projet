const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');

const maxAge =3 * 24 * 60 * 60 * 1000;
const createToken = (id)=>{
  return jwt.sign({id},process.env.TOKEN_SECRET,{
    expiresIn: maxAge
  })
};

module.exports.signUp = async (req,res)=>{
    console.log(req.body);
    const {pseudo,email,password} = req.body;

    try{
        const user = await UserModel.create({pseudo,email,password});// await tu attend la creation du model
        res.status(201).json({user: user._id});
    }catch(erre){
        res.status(200).send({erre})
    }

}

//permet de se reconnecter grace au cookie et token
module.exports.signIn = async (req,res)=>{

  const {email, password} = req.body;
  try{
    const user = await UserModel.login(email,password);// on vas regarde dans la data base si les user existe
    console.log(req.body);
    const token = createToken(user._id);
    res.cookie('jwt',token,{httpOnly:true, maxAge});// on cree un cookie et on envoy dans les cookie
    console.log(req.body);
    res.status(201).send({user: user._id});//on renvoy ça pour dire que ça marcher
  }catch(err){
      res.status(404).json({err})
  }

}
// pour le logout on retire son cookie
module.exports.logout = async (req,res)=>{
  res.cookie('jwt','',{maxAge:1});
  res.redirect('/');
}
