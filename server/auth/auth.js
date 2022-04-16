const jwt = require("jsonwebtoken");
const { secretKey } = require("../config/index");
const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const typeOfLogin = token.length < 500; //login without google auth
    let decodedData;
    if (token && typeOfLogin) {
      //login with register website
      console.log(token);
      console.log("sssa");
      decodedData = jwt.verify(token, secretKey);
      console.log("aaa");
      req.userId = decodedData?.id;
    } else {
      //login with google account
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub;
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "unauthorized" });
  }
};

module.exports = auth;
