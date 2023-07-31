const {Router}=require("express");
const router=Router();
const controller = require('../controllers/appController');

router.route('/register').post(controller.register);

// router.route('/registerMail').post();
router.route('/authenticate').get((req, res) => res.send('Authentication route'));
router.route('/login').post(controller.verifyUser,controller.login);
router.delete('/task/:id', controller.deleteTask);

router.route('/user/:username').get(controller.getUser);
router.route('/generateOTP').get(controller.generateOTP);
router.route('/verifyOTP').get(controller.verifyOTP);
router.route('/createResetSession').get(controller.createResetSession);

router.route('/updateuser').put(controller.updateuser);
router.route('/resetPassword').put(controller.resetPassword);

module.exports=router;