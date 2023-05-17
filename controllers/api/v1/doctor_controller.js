const Doctor=require('../../../models/doctor');
const jwt=require('jsonwebtoken');


// function for registering the doctor on db
module.exports.register = async function(req,res) {
  try {

    const doctor=  await Doctor.create(req.body);
      
      return res.status(200).json({
          success: true,
          message: doctor
      });

  } catch (err) {
      return res.status(500).json({
          success: false,
          message: err.message
      });
  }
}

// function for login the doctor
module.exports.login= async (req, res)=>{
  try {

    let { email, password } = req.body;

    
    let doctor = await Doctor.findOne({ email: email });
    if (!doctor) {
      return res.status(401).json({ 
        success: false, 
        msg: "Invalid Username or Password!" 
      });
    }
    
    if (!email || !password) {
      return res.status(400).json({ 
        success: false,
        msg: 'email or password is not found in DB'
      });
    }

    const isMatch = await doctor.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ 
        success: false, 
        msg: "Invalid Username or Password!" 
      });
    }

  //  using JWT for getting token
    const token = doctor.getSignedJwtToken();

    res.status(200).json({
      success: true,
      token,
      msg: `Log In Sucessful! Keep the Token safely  ${doctor.username}!`
    });

  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      msg:'Error Occoured!'
    });
  }
}
