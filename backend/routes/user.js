var express = require("express");
const userValidation = require("../helpers/user-validation");
var router = express.Router();

router.post("/signup", async (req, res) => {
  userExists = await userValidation.checkUserExists(req.body.email);
  if (userExists) {
    res.status(200).json({
      value: "An Account with this email already exists",
      status: false,
    });
  } else {
    userValidation.registerUser(req.body).then(() => {
      res.status(200).json({ status: true });
    });
  }
});
module.exports = router;
