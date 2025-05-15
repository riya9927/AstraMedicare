import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from '../models/appointmentModel.js'
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

    // Validate email format if changed
    if (email && !validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid email format" });
    }

    // Validate password strength if changed
    if (password && password.length < 8) {
      return res.json({ success: false, message: "Password too short" });
    }

    // Upload new image if provided
    let imageUrl = existingDoctor.image;
    if (req.file) {
      const imageUpload = await cloudinary.uploader.upload(req.file.path, { resource_type: "image" });
      imageUrl = imageUpload.secure_url;
    }

    // Prepare updated fields
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

    // Hash password if provided
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
        const {  appointmentId } = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)
        
        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })
        // releasing doctor slot 
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


export { addDoctor, loginAdmin, allDoctors, updateDoctor, deleteDoctor,appointmentsAdmin,appointmentCancel };
