const Patient = require('../../../models/patient');
const Report = require('../../../models/report');

module.exports.register = async (req, res) => {
    try {
      let patient;
      patient = await Patient.find({
        phone: req.body.name
      });
      
      if (patient.length > 0) {
        return res.status(200).json({
          success: true,
          body: patient[0]
        });
      }
      
      patient = await Patient.create({
        name: req.body.name,
        phone: req.body.phone,
        doctor: req.doctor._id
      });
      return res.status(201).json({
        success: true,
        body: patient,
        msg:'Patient Registered Sucessfully!'
      });
    } catch (err) {
      return res.status(401).json({
        success: false,
        msg:'Error Occoured!'
      });
    }
  };

  