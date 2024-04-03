var db = require("../config/connection");
const model = require("../config/models");
var bcrypt = require("bcrypt");

module.exports = {
  checkUserExists: (userEmail) => {
    return new Promise(async (resolve, reject) => {
      let userExists = await model.users.findOne({ email: userEmail });
      resolve(userExists);
    });
  },

  registerUser: (userDetails) => {
    return new Promise(async (resolve, reject) => {
      userDetails.password = await bcrypt.hash(userDetails.password, 10);
      model.users.create(userDetails).then(() => {
        resolve();
      });
    });
  },
};
