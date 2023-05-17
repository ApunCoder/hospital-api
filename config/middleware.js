const jwt = require('jsonwebtoken');
const Doctor = require("../models/doctor")

// using JWT token for verifying the user

exports.verifyToken = async (req, res, next) => {

  let token;
  
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
      req.token = token;
    }
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthroized access attempt!"
      });
    }
  
    try {
      const decoded = await jwt.verify(token, 'mykey');

      req.doctor = await Doctor.findById(decoded.id);
      next();

    } catch (err) {
      console.log(err);
      return res.status(401).json({
        success: false,
        message: "Unauthroized access attempt!"
      });
    }
  };

