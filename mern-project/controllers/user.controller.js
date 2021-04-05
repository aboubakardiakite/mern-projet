const UserModel = require('../models/user.model');
const ObjectID = require('mongoose').Types.ObjectId;


// renvoy tout les utilisateur
module.exports.getAllUsers = async (req,res)=>{
  // - password pord ne donner le password
  const users = await UserModel.find().select('-password');// trouver la table qui est dans userModel et le selectionner et prendre tout
  res.status(200).json(users);
}
// renvoyer les infos d'un seul users

module.exports.userInfo = (req,res)=>{
  console.log(req.params);

  if(!ObjectID.isValid(req.params.id)){// il vas tester si l'id est connu dans la base de donner sinon arret
     return res.status(400).send('ID unknown : '+ req.params.id);
  }else{
    UserModel.findById(req.params.id, (err,docs)=>{
      if(!err) res.send(docs);
      else console.log('ID unknown : '+ err);
    }).select('-password');
  }
};

/*
Mettre a jour les info sur l'user
*/
module.exports.updateUser = async (req,res)=>{
  if(!ObjectID.isValid(req.params.id))// il vas tester si l'id est connu dans la base de donner sinon arret
     return res.status(400).send('ID unknown : '+ req.params.id);

    try{
                      // tu me trouve l'element et tu le met à jour
      await UserModel.findOneAndUpdate(
        {_id: req.params.id},
        {
          $set: {
            bio : req.body.bio
          }
        },
        {
          new : true,
          upsert: true,
          setDefaultsOnInsert: true,//parametre a mettre obligatoirement lorsqu'on fait un put
        },
        (err,docs)=>{
          if(!err) return res.send(docs);// si pas error retourne less docs correspondant a la data
          if (err) return res.status(500).send({message : err});
        }

      )
    }catch(err){
      return res.status(500).json({message : err});
    }
}


/*

*/

module.exports.deleteUser = async (req,res)=>{
  if(!ObjectID.isValid(req.params.id))// il vas tester si l'id est connu dans la base de donner sinon arret
     return res.status(400).send('ID unknown : '+ req.params.id);

    try{
                      // tu me trouve l'element et tu le met à jour
      await UserModel.remove(
        {_id: req.params.id}).exec();//effacer ce qui est passer dans l'url
        res.status(200).json({message : "Successfully deleted"});

    }catch(err){
      return res.status(500).json({message : err});
    }
}


module.exports.follow = async (req,res) =>{
  if(!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.idToFollow))// il vas tester si l'id est connu dans la base de donner sinon arret
     return res.status(400).send('ID unknown : '+ req.params.id);

  try{
    // add to the folllower list
    await UserModel.findByIdAndUpdate(
      req.params.id,// id de la personne veux suivre
      // donc on met dans following l'id grace a $ addToset
      {$addToSet : {following: req.body.idToFollow}},// idToFollow est l'id de la personne que nous devons suivre
      {new: true , upsert:true},
      (err,docs)=>{
        if(!err) res.status(200).json(docs);
        else return res.status(400).json(err);
      }
    );
    // add to following list
    await UserModel.findByIdAndUpdate(
      req.body.idToFollow,
      {$addToSet : {followers: req.params.id}},
      {new: true , upsert:true},
      (err,docs)=>{
        //if(!err) res.status(200).json(docs);
        if(err) return res.status(400).json(err);
      }
    )

  }catch(eer){
      return res.status(500).json({message : err});
  }
}

module.exports.unfollow = async (req,res) =>{
  if(!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.idToUnFollow))// il vas tester si l'id est connu dans la base de donner sinon arret
     return res.status(400).send('ID unknown : '+ req.params.id);

  try{
    // add to the folllower list
    await UserModel.findByIdAndUpdate(
      req.params.id,// id de la personne veux suivre
      // donc on met dans following l'id grace a $ addToset
      {$pull : {following: req.body.idToUnFollow}},// idToFollow est l'id de la personne que nous devons suivre
      {new: true , upsert:true},
      (err,docs)=>{
        if(!err) res.status(200).json(docs);
        else return res.status(400).json(err);
      }
    );
    // add to following list
    await UserModel.findByIdAndUpdate(
      req.body.idToUnFollow,
      {$pull : {followers: req.params.id}},
      {new: true , upsert:true},
      (err,docs)=>{
        //if(!err) res.status(200).json(docs);
        if(err) return res.status(400).json(err);
      }
    )

  }catch(err){
      return res.status(500).json({message : err});
  }
}


/*
  Remarque
    req.body  c'est lorsque nous passons des valeur dans les input
    re.params correspond au parrametre que nous mettons dans l'url
*/
