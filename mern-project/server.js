const express = require('express');
require('dotenv').config({path:'./config/.env'});
require('./config/db');
const app = express();
const userRoutes = require('./routes/user.routes');
const bodyParser = require('body-parser');
//const cookieParser = require('cookie-parser');
const {checkUser} = require('./middleware/auth.middleware');



app.use(bodyParser.json());// on fait en sorte que les body puissent etre convertir en json
app.use(bodyParser.urlencoded({extended: true}));// capable de lire les url
//app.use(cookieParser());//on peut lire notre cookie maintenant

//jwt assurer la connection de notre utilisateur
// app.get('*',checkUser);

// app.get('/jwtid',requireAuth,(res,req,next)=>{
//     res.status(200).send(res.locals.user._id);
// });



//router
app.use('/api/user',userRoutes);

// server
app.listen(process.env.PORT,()=>{// process.env car on parle ici d'une variable d'envoronnement
    console.log(`Listening on post ${process.env.PORT}`);
});