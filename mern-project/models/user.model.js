const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({

    pseudo: {
            type: String,
            require: true,
            minLength:3,
            maxLength:55,
            unique:true,//rend le pseudo unique
            trimp:true,//efface les espace a la fin
            uppercase:true
    },
    picture:{
        type: String,
        default: "./uploads/profil/randon-user.png"
    },
    email:{
        type: String,
        required:true,
        validate: [isEmail],// telecharger validator pour ca npm i -s validator
        lowercase:true,
        trim:true,
    },
    password: {
        type:String,
        required:true,
        max:1024,
        minLength:6
    },
    bio:{
        type: String,
        max:1024
    },
    followers: {
        type:[String]
    },
    following:{
        type:[String]
    },
    likes:{
        type:[String]
    }

  },
  {
      timestamps: true,//savoir le temps a la quel l'utilisateur vas se connecter
  }

)
// play function before save into display
userSchema.pre("save",async function(next){// async pour qu'il attend le mot de passe et on ne fait pas une arrow function parceque nous allons utiliser await
    const salt = await bcrypt.genSalt();// saller le password
    this.password = await bcrypt.hash(this.password,salt);
    next();
})
// desaller le mot de passe
userSchema.statics.login = async function(email,password){
 console.log("je suis");
  const user = await this.findOne({email});
  if(user){

    const auth = await bcrypt.compare(password, user.password);
    
    if(auth){
      console.log(user);
      return user;
    }
    throw Error('Incorrect password');
    }
    throw Error('Incorrect email');
};




const UserSchema = mongoose.model('user',userSchema);

module.exports = UserSchema;
