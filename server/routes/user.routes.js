const router = require("express").Router();
const { check } = require("express-validator");
const { signUp, signIn } = require("../controllers/user.controllers");

router.post(
    "/signup",
    [check("email", "please provide a valid email").isEmail(), check("password", "please provide a passowrd that is greater than 5 characters").isLength({ min: 6 }).exists()],
    signUp
);

router.post(
    "/signin",
    [check("email", "please provide a valid email").isEmail(), check("password", "please provide a passowrd that is greater than 5 characters").isLength({ min: 6 }).exists()],
    signIn
);

module.exports = router;
