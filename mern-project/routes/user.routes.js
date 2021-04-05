const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');


//auth
router.post("/register",authController.signUp);
router.post("/login",authController.signIn);// la router qui permet a un user de se connecter
router.get("/logout",authController.logout);//de se deconnecter.

// user

router.get('/',userController.getAllUsers);

// :id est un parametre
// cet router signifie lorsque tu a la route :id tu declache cette fonction
router.get('/:id',userController.userInfo);


// les update pour les faire on utilise un input
router.put('/:id',userController.updateUser);

// efface un user
router.delete('/:id',userController.deleteUser);

// patch mettre a jour le tableau a l'interieurs d'un user
router.patch('/follow/:id',userController.follow);


router.patch('/unfollow/:id',userController.unfollow);



module.exports = router;
