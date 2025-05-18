import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from '../models/appointmentModel.js'
import userModel from '../models/userModel.js'
import jwt from "jsonwebtoken";

// API for adding doctor
const addDoctor = async (req, res) => {
  try {
    const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
    const imageFile = req.file;

    if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
      return res.json({ success: false, message: "Missing Details" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter a valid email." });
    }

    if (password.length < 8) {
      return res.json({ success: false, message: "Please enter a strong password" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
    const imageUrl = imageUpload.secure_url;

    const doctorData = {
      name,
      email,
      image: imageUrl,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: JSON.parse(address),
      date: Date.now()
    };

    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();

    res.json({ success: true, message: "Doctor Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API for admin login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get all doctors list
const allDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select('-password');
    res.json({ success: true, doctors });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to update a doctor
const updateDoctor = async (req, res) => {
  try {
    const doctorId = req.params.id;
    const existingDoctor = await doctorModel.findById(doctorId);

    if (!existingDoctor) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }

    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      available,
      address
    } = req.body;

    if (email && !validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid email format" });
    }

    if (password && password.length < 8) {
      return res.json({ success: false, message: "Password too short" });
    }

    let imageUrl = existingDoctor.image;
    if (req.file) {
      const imageUpload = await cloudinary.uploader.upload(req.file.path, { resource_type: "image" });
      imageUrl = imageUpload.secure_url;
    }

    const updatedData = {
      name,
      email,
      speciality,
      degree,
      experience,
      about,
      fees,
      available: available === 'true' || available === true,
      address: JSON.parse(address),
      image: imageUrl,
    };

    if (password) {
      const salt = await bcrypt.genSalt(10);
      updatedData.password = await bcrypt.hash(password, salt);
    }

    await doctorModel.findByIdAndUpdate(doctorId, updatedData, { new: true });

    res.json({ success: true, message: "Doctor updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteDoctor = async (req, res) => {
  try {
    const doctorId = req.params.id;

    const deleted = await doctorModel.findByIdAndDelete(doctorId);

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }

    res.json({ success: true, message: "Doctor deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// API to get all appointments list 
const appointmentsAdmin = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({})
    res.json({ success: true, appointments })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// API to get appointments cancellation
const appointmentCancel = async (req, res) => {
  try {
    const { appointmentId } = req.body
    const appointmentData = await appointmentModel.findById(appointmentId)

    await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })
    const { docId, slotDate, slotTime } = appointmentData
    const doctorData = await doctorModel.findById(docId)
    let slots_booked = doctorData.slots_booked
    slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)
    await doctorModel.findByIdAndUpdate(docId, { slots_booked })
    res.json({ success: true, message: 'Appointment Cancelled' })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// API to get dashboard data for admin panel 
const adminDashboard = async (req, res) => {
  try {
    const doctors = await doctorModel.find({})
    const users = await userModel.find({})
    const appointments = await appointmentModel.find({})
    const dashData = {
      doctors: doctors.length,
      appointments: appointments.length,
      patients: users.length,
      latestAppointments: appointments.reverse().slice(0, 5)
    }
    res.json({success: true, dashData})
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// API for adding patient
const addPatient = async (req, res) => {
  try {
    const { 
      name, 
      email, 
      password, 
      phone, 
      gender, 
      dob, 
      bloodGroup, 
      address, 
      emergencyContact 
    } = req.body;
    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing required details" });
    }
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter a valid email." });
    }
    if (password.length < 8) {
      return res.json({ success: false, message: "Please enter a strong password (at least 8 characters)" });
    }
    const existingPatient = await userModel.findOne({ email });
    if (existingPatient) {
      return res.json({ success: false, message: "A patient with this email already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    let imageUrl = "";
    if (req.file) {
      const imageUpload = await cloudinary.uploader.upload(req.file.path, { resource_type: "image" });
      imageUrl = imageUpload.secure_url;
    }
    const patientData = {
      name,
      email,
      password: hashedPassword,
      image: imageUrl
    };
    if (phone) patientData.phone = phone;
    if (gender) patientData.gender = gender;
    if (dob) patientData.dob = new Date(dob);
    if (bloodGroup) patientData.bloodGroup = bloodGroup;
    if (address) {
      try {
        patientData.address = JSON.parse(address);
      } catch (error) {
        console.log("Error parsing address:", error);
        return res.json({ success: false, message: "Invalid address format" });
      }
    }
    if (emergencyContact) {
      try {
        patientData.emergencyContact = JSON.parse(emergencyContact);
      } catch (error) {
        console.log("Error parsing emergency contact:", error);
        return res.json({ success: false, message: "Invalid emergency contact format" });
      }
    }
    const newPatient = new userModel(patientData);
    await newPatient.save();

    res.json({ 
      success: true, 
      message: "Patient Added Successfully", 
      patientId: newPatient.patientId 
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// API to get all patients list
const allPatients = async (req, res) => {
  try {
    const patients = await userModel.find({}).select('-password');
    res.json({ success: true, patients });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// API to delete patients 
const deletePatient = async (req, res) => {
  try {
    const patientId = req.params.id;
    const deleted = await userModel.findByIdAndDelete(patientId);

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Patient not found" });
    }

    await appointmentModel.deleteMany({ userId: patientId });

    res.json({ success: true, message: "Patient deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// API to update a patient
const updatePatient = async (req, res) => {
  try {
    const patientId = req.params.id;
    const existingPatient = await userModel.findById(patientId);

    if (!existingPatient) {
      return res.status(404).json({ success: false, message: "Patient not found" });
    }

    const {
      name,
      email,
      password,
      phone,
      gender,
      dob,
      bloodGroup,
      address,
      emergencyContact
    } = req.body;
    if (email && !validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid email format" });
    }
    if (password && password.length < 8) {
      return res.json({ success: false, message: "Password must be at least 8 characters" });
    }
    let imageUrl = existingPatient.image;
    if (req.file) {
      const imageUpload = await cloudinary.uploader.upload(req.file.path, { resource_type: "image" });
      imageUrl = imageUpload.secure_url;
    }
    const updatedData = { image: imageUrl };
    
    if (name) updatedData.name = name;
    if (email) updatedData.email = email;
    if (phone) updatedData.phone = phone;
    if (gender) updatedData.gender = gender;
    if (dob) updatedData.dob = new Date(dob);
    if (bloodGroup) updatedData.bloodGroup = bloodGroup;
    
    if (address) {
      try {
        updatedData.address = JSON.parse(address);
      } catch (error) {
        return res.json({ success: false, message: "Invalid address format" });
      }
    }
    
    if (emergencyContact) {
      try {
        updatedData.emergencyContact = JSON.parse(emergencyContact);
      } catch (error) {
        return res.json({ success: false, message: "Invalid emergency contact format" });
      }
    }

    if (password) {
      const salt = await bcrypt.genSalt(10);
      updatedData.password = await bcrypt.hash(password, salt);
    }

    const updatedPatient = await userModel.findByIdAndUpdate(
      patientId, 
      updatedData, 
      { new: true }
    );

    res.json({ 
      success: true, 
      message: "Patient updated successfully", 
      patientId: updatedPatient.patientId 
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


export { addDoctor, loginAdmin, allDoctors, updateDoctor, deleteDoctor, appointmentsAdmin, appointmentCancel,adminDashboard ,addPatient,allPatients,deletePatient,updatePatient  };
