import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import jwt from "jsonwebtoken";
import administrativeStaffModel from "../models/administrativeStaffModel.js";
import nurseModel from "../models/nurseModel.js";
import labTechnicianModel from "../models/labTechniciansModel.js";
import pharmacistModel from "../models/pharmacistModel.js";
import itTechnicalStaffModel from "../models/itTechnicalStaffModel.js";
import supportStaffModel from "../models/supportStaffModel.js";

// API for adding administrative staff
const addAdministrativeStaff = async (req, res) => {
    try {
        const {

            fullName,
            gender,
            dateOfBirth,
            contactNumber,
            addressLine1,
            addressLine2,
            role,
            email,
            shiftTimings,
            dateOfJoining,
            salaryDetails
        } = req.body;

        const imageFile = req.file;

        if (!fullName || !gender || !dateOfBirth || !contactNumber ||
            !addressLine1 || !role || !email || !shiftTimings ||
            !dateOfJoining || !salaryDetails) {
            return res.json({ success: false, message: "Missing Required Details" });
        }

        const existingStaff = await administrativeStaffModel.findOne({ email });
        if (existingStaff) {
            return res.json({ success: false, message: "Staff ID already exists" });
        }

        if (!validator.isMobilePhone(contactNumber)) {
            return res.json({ success: false, message: "Please enter a valid contact number" });
        }
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email." });
        }

        let imageUrl = "";
        if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
            imageUrl = imageUpload.secure_url;
        } else {
            return res.json({ success: false, message: "Staff photo is required" });
        }

        const staffData = {
            photo: imageUrl,
            // staffID,
            fullName,
            gender,
            dateOfBirth: new Date(dateOfBirth),
            contactNumber,
            addressLine1,
            addressLine2,
            role,
            email,
            shiftTimings,
            dateOfJoining: new Date(dateOfJoining),
            salaryDetails: Number(salaryDetails)
        };

        const newStaff = new administrativeStaffModel(staffData);
        await newStaff.save();

        res.json({ success: true, message: "Administrative Staff Added Successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API to get all administrative staff
const getAllAdministrativeStaff = async (req, res) => {
    try {
        const staffList = await administrativeStaffModel.find({});
        res.json({ success: true, staffList });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API to update administrative staff details
const updateAdministrativeStaff = async (req, res) => {
    try {
        const staffId = req.params.id;
        const existingStaff = await administrativeStaffModel.findById(staffId);

        if (!existingStaff) {
            return res.status(404).json({ success: false, message: "Staff member not found" });
        }

        const {
            staffID,
            fullName,
            gender,
            dateOfBirth,
            contactNumber,
            addressLine1,
            addressLine2,
            role,
            email,
            shiftTimings,
            dateOfJoining,
            salaryDetails
        } = req.body;

        if (staffID && staffID !== existingStaff.staffID) {
            const duplicateID = await administrativeStaffModel.findOne({ staffID });
            if (duplicateID) {
                return res.json({ success: false, message: "Staff ID already exists" });
            }
        }

        if (email && !validator.isEmail(email)) {
            return res.json({ success: false, message: "Invalid email format" });
        }

        if (contactNumber && !validator.isMobilePhone(contactNumber)) {
            return res.json({ success: false, message: "Please enter a valid contact number" });
        }

        let imageUrl = existingStaff.photo;
        if (req.file) {
            const imageUpload = await cloudinary.uploader.upload(req.file.path, { resource_type: "image" });
            imageUrl = imageUpload.secure_url;
        }

        const updatedData = {
            photo: imageUrl
        };

        if (staffID) updatedData.staffID = staffID;
        if (fullName) updatedData.fullName = fullName;
        if (gender) updatedData.gender = gender;
        if (dateOfBirth) updatedData.dateOfBirth = new Date(dateOfBirth);
        if (contactNumber) updatedData.contactNumber = contactNumber;
        if (addressLine1) updatedData.addressLine1 = addressLine1;
        if (addressLine2 !== undefined) updatedData.addressLine2 = addressLine2;
        if (role) updatedData.role = role;
        if (email) updatedData.email = email;
        if (shiftTimings) updatedData.shiftTimings = shiftTimings;
        if (dateOfJoining) updatedData.dateOfJoining = new Date(dateOfJoining);
        if (salaryDetails) updatedData.salaryDetails = Number(salaryDetails);

        await administrativeStaffModel.findByIdAndUpdate(staffId, updatedData, { new: true });

        res.json({ success: true, message: "Staff member updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// API to delete administrative staff
const deleteAdministrativeStaff = async (req, res) => {
    try {
        const staffId = req.params.id;
        const deleted = await administrativeStaffModel.findByIdAndDelete(staffId);

        if (!deleted) {
            return res.status(404).json({ success: false, message: "Staff member not found" });
        }

        res.json({ success: true, message: "Staff member deleted successfully" });
    } catch (error) {
        console.error("Delete error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// API for adding nurse
const addNurse = async (req, res) => {
    try {
        const {
            fullName,
            gender,
            dateOfBirth,
            contactNumber,
            addressLine1,
            addressLine2,
            department,
            email,
            shiftDetails,
            assignedDoctors,
            dateOfJoining,
            salaryDetails
        } = req.body;

        const imageFile = req.file;

        if (!fullName || !gender || !dateOfBirth || !contactNumber ||
            !addressLine1 || !department || !email || !shiftDetails ||
            !dateOfJoining || !salaryDetails) {
            return res.json({ success: false, message: "Missing Required Details" });
        }

        const existingNurse = await nurseModel.findOne({ email });
        if (existingNurse) {
            return res.json({ success: false, message: "Nurse with this email already exists" });
        }

        if (!validator.isMobilePhone(contactNumber)) {
            return res.json({ success: false, message: "Please enter a valid contact number" });
        }
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email." });
        }

        let imageUrl = "";
        if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
            imageUrl = imageUpload.secure_url;
        } else {
            return res.json({ success: false, message: "Nurse photo is required" });
        }

        const nurseData = {
            photo: imageUrl,
            fullName,
            gender,
            dateOfBirth: new Date(dateOfBirth),
            contactNumber,
            addressLine1,
            addressLine2,
            department,
            email,
            shiftDetails,
            assignedDoctors: assignedDoctors || [],
            dateOfJoining: new Date(dateOfJoining),
            salaryDetails: Number(salaryDetails)
        };

        const newNurse = new nurseModel(nurseData);
        await newNurse.save();

        res.json({ success: true, message: "Nurse Added Successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API to get all nurses
const getAllNurses = async (req, res) => {
    try {
        const nurseList = await nurseModel.find({})
            .populate('assignedDoctors', 'name speciality image');
        res.json({ success: true, nurseList });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API to update nurse details
const updateNurse = async (req, res) => {
    try {
        const nurseId = req.params.id;
        const existingNurse = await nurseModel.findById(nurseId);

        if (!existingNurse) {
            return res.status(404).json({ success: false, message: "Nurse not found" });
        }

        const {
            fullName,
            gender,
            dateOfBirth,
            contactNumber,
            addressLine1,
            addressLine2,
            department,
            email,
            shiftDetails,
            assignedDoctors,
            dateOfJoining,
            salaryDetails
        } = req.body;

        if (email && email !== existingNurse.email) {
            const duplicateEmail = await nurseModel.findOne({ email });
            if (duplicateEmail) {
                return res.json({ success: false, message: "Email already exists" });
            }
        }

        if (email && !validator.isEmail(email)) {
            return res.json({ success: false, message: "Invalid email format" });
        }

        if (contactNumber && !validator.isMobilePhone(contactNumber)) {
            return res.json({ success: false, message: "Please enter a valid contact number" });
        }

        let imageUrl = existingNurse.photo;
        if (req.file) {
            const imageUpload = await cloudinary.uploader.upload(req.file.path, { resource_type: "image" });
            imageUrl = imageUpload.secure_url;
        }

        const updatedData = {
            photo: imageUrl
        };

        if (fullName) updatedData.fullName = fullName;
        if (gender) updatedData.gender = gender;
        if (dateOfBirth) updatedData.dateOfBirth = new Date(dateOfBirth);
        if (contactNumber) updatedData.contactNumber = contactNumber;
        if (addressLine1) updatedData.addressLine1 = addressLine1;
        if (addressLine2 !== undefined) updatedData.addressLine2 = addressLine2;
        if (department) updatedData.department = department;
        if (email) updatedData.email = email;
        if (shiftDetails) updatedData.shiftDetails = shiftDetails;
        if (assignedDoctors) updatedData.assignedDoctors = assignedDoctors;
        if (dateOfJoining) updatedData.dateOfJoining = new Date(dateOfJoining);
        if (salaryDetails) updatedData.salaryDetails = Number(salaryDetails);

        await nurseModel.findByIdAndUpdate(nurseId, updatedData, { new: true });

        res.json({ success: true, message: "Nurse updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// API to delete nurse
const deleteNurse = async (req, res) => {
    try {
        const nurseId = req.params.id;
        const deleted = await nurseModel.findByIdAndDelete(nurseId);

        if (!deleted) {
            return res.status(404).json({ success: false, message: "Nurse not found" });
        }

        res.json({ success: true, message: "Nurse deleted successfully" });
    } catch (error) {
        console.error("Delete error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};


// API for adding lab technician
const addLabTechnician = async (req, res) => {
    try {
        const {
            name,
            gender,
            dateOfBirth,
            contactNumber,
            addressLine1,
            addressLine2,
            email,
            qualifications,
            shiftDetails,
            supervisedDoctors,
            salaryDetails
        } = req.body;
        const imageFile = req.file;

        if (
            !name ||
            !gender ||
            !dateOfBirth ||
            !contactNumber ||
            !addressLine1 ||
            !email ||
            !shiftDetails ||
            !salaryDetails
        ) {
            return res.json({ success: false, message: "Missing Required Details" });
        }

        const existingTechnician = await labTechnicianModel.findOne({ email });
        if (existingTechnician) {
            return res.json({ success: false, message: "Lab Technician with this email already exists" });
        }

        if (!validator.isMobilePhone(contactNumber)) {
            return res.json({ success: false, message: "Please enter a valid contact number" });
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }

        let imageUrl = "";
        if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
                resource_type: "image"
            });
            imageUrl = imageUpload.secure_url;
        } else {
            return res.json({ success: false, message: "Lab Technician photo is required" });
        }

        const technicianData = {
            photo: imageUrl,
            name,
            gender,
            dateOfBirth: new Date(dateOfBirth),
            contactNumber,
            addressLine1,
            addressLine2,
            email,
            qualifications,
            shiftDetails,
            supervisedDoctors: supervisedDoctors || [],
            salaryDetails: Number(salaryDetails)
        };

        const newTechnician = new labTechnicianModel(technicianData);
        await newTechnician.save();

        res.json({ success: true, message: "Lab Technician Added Successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API to get all lab technicians
const getAllLabTechnicians = async (req, res) => {
    try {
        const technicianList = await labTechnicianModel.find({})
            .populate('supervisedDoctors', 'name speciality image');

        res.json({ success: true, technicianList });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API to update lab technician details
const updateLabTechnician = async (req, res) => {
    try {
        const technicianId = req.params.id;
        const existingTechnician = await labTechnicianModel.findById(technicianId);

        if (!existingTechnician) {
            return res.status(404).json({ success: false, message: "Lab Technician not found" });
        }

        const {
            name,
            gender,
            dateOfBirth,
            contactNumber,
            addressLine1,
            addressLine2,
            email,
            qualifications,
            shiftDetails,
            supervisedDoctors,
            salaryDetails
        } = req.body;

        if (email && email !== existingTechnician.email) {
            const duplicateEmail = await labTechnicianModel.findOne({ email });
            if (duplicateEmail) {
                return res.json({ success: false, message: "Email already exists" });
            }
        }
        if (email && !validator.isEmail(email)) {
            return res.json({ success: false, message: "Invalid email format" });
        }

        if (contactNumber && !validator.isMobilePhone(contactNumber)) {
            return res.json({ success: false, message: "Please enter a valid contact number" });
        }

        let imageUrl = existingTechnician.photo;
        if (req.file) {
            const imageUpload = await cloudinary.uploader.upload(req.file.path, {
                resource_type: "image"
            });
            imageUrl = imageUpload.secure_url;
        }

        const updatedData = {
            photo: imageUrl
        };

        if (name) updatedData.name = name;
        if (gender) updatedData.gender = gender;
        if (dateOfBirth) updatedData.dateOfBirth = new Date(dateOfBirth);
        if (contactNumber) updatedData.contactNumber = contactNumber;
        if (addressLine1) updatedData.addressLine1 = addressLine1;
        if (addressLine2 !== undefined) updatedData.addressLine2 = addressLine2;
        if (email) updatedData.email = email;
        if (qualifications) updatedData.qualifications = qualifications;
        if (shiftDetails) updatedData.shiftDetails = shiftDetails;
        if (supervisedDoctors) updatedData.supervisedDoctors = supervisedDoctors;
        if (salaryDetails) updatedData.salaryDetails = Number(salaryDetails);

        await labTechnicianModel.findByIdAndUpdate(technicianId, updatedData, { new: true });

        res.json({ success: true, message: "Lab Technician updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// API to delete lab technician
const deleteLabTechnician = async (req, res) => {
    try {
        const technicianId = req.params.id;
        const deleted = await labTechnicianModel.findByIdAndDelete(technicianId);

        if (!deleted) {
            return res.status(404).json({ success: false, message: "Lab Technician not found" });
        }

        res.json({ success: true, message: "Lab Technician deleted successfully" });
    } catch (error) {
        console.error("Delete error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// API for adding pharmacist
const addPharmacist = async (req, res) => {
  try {
    const {
      name,
      gender,
      dateOfBirth,
      contactNumber,
      addressLine1,
      addressLine2,
      email,
      shiftDetails,
      qualifications,
      dateOfJoining,
      salaryDetails
    } = req.body;
    
    const imageFile = req.file;
    
    // Validate required fields
    if (
      !name ||
      !gender ||
      !dateOfBirth ||
      !contactNumber ||
      !addressLine1 ||
      !email ||
      !shiftDetails ||
      !dateOfJoining ||
      !salaryDetails
    ) {
      return res.json({ success: false, message: "Missing Required Details" });
    }
    
    // Check for existing pharmacist with same email
    const existingPharmacist = await pharmacistModel.findOne({ email });
    if (existingPharmacist) {
      return res.json({ success: false, message: "Pharmacist with this email already exists" });
    }
    
    // Validate contact number and email
    if (!validator.isMobilePhone(contactNumber)) {
      return res.json({ success: false, message: "Please enter a valid contact number" });
    }
    
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter a valid email." });
    }
    
    // Handle image upload
    let imageUrl = "";
    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, { 
        resource_type: "image" 
      });
      imageUrl = imageUpload.secure_url;
    } else {
      return res.json({ success: false, message: "Pharmacist photo is required" });
    }
    
    const pharmacistData = {
      photo: imageUrl,
      name,
      gender,
      dateOfBirth: new Date(dateOfBirth),
      contactNumber,
      addressLine1,
      addressLine2,
      email,
      shiftDetails,
      qualifications,
      dateOfJoining: new Date(dateOfJoining),
      salaryDetails: Number(salaryDetails)
    };
    
    const newPharmacist = new pharmacistModel(pharmacistData);
    await newPharmacist.save();
    
    res.json({ success: true, message: "Pharmacist Added Successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get all pharmacists
const getAllPharmacists = async (req, res) => {
  try {
    const pharmacistList = await pharmacistModel.find({});
    res.json({ success: true, pharmacistList });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to update pharmacist details
const updatePharmacist = async (req, res) => {
  try {
    const pharmacistId = req.params.id;
    const existingPharmacist = await pharmacistModel.findById(pharmacistId);
    
    if (!existingPharmacist) {
      return res.status(404).json({ success: false, message: "Pharmacist not found" });
    }
    
    const {
      name,
      gender,
      dateOfBirth,
      contactNumber,
      addressLine1,
      addressLine2,
      email,
      shiftDetails,
      qualifications,
      dateOfJoining,
      salaryDetails
    } = req.body;
    
    // Check if email is being changed and already exists
    if (email && email !== existingPharmacist.email) {
      const duplicateEmail = await pharmacistModel.findOne({ email });
      if (duplicateEmail) {
        return res.json({ success: false, message: "Email already exists" });
      }
    }
    
    // Validate email and contact number if provided
    if (email && !validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid email format" });
    }
    
    if (contactNumber && !validator.isMobilePhone(contactNumber)) {
      return res.json({ success: false, message: "Please enter a valid contact number" });
    }
    
    // Handle image update
    let imageUrl = existingPharmacist.photo;
    if (req.file) {
      const imageUpload = await cloudinary.uploader.upload(req.file.path, { 
        resource_type: "image" 
      });
      imageUrl = imageUpload.secure_url;
    }
    
    const updatedData = {
      photo: imageUrl
    };
    
    // Update fields if provided
    if (name) updatedData.name = name;
    if (gender) updatedData.gender = gender;
    if (dateOfBirth) updatedData.dateOfBirth = new Date(dateOfBirth);
    if (contactNumber) updatedData.contactNumber = contactNumber;
    if (addressLine1) updatedData.addressLine1 = addressLine1;
    if (addressLine2 !== undefined) updatedData.addressLine2 = addressLine2;
    if (email) updatedData.email = email;
    if (shiftDetails) updatedData.shiftDetails = shiftDetails;
    if (qualifications !== undefined) updatedData.qualifications = qualifications;
    if (dateOfJoining) updatedData.dateOfJoining = new Date(dateOfJoining);
    if (salaryDetails) updatedData.salaryDetails = Number(salaryDetails);
    
    await pharmacistModel.findByIdAndUpdate(pharmacistId, updatedData, { new: true });
    
    res.json({ success: true, message: "Pharmacist updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// API to delete pharmacist
const deletePharmacist = async (req, res) => {
  try {
    const pharmacistId = req.params.id;
    const deleted = await pharmacistModel.findByIdAndDelete(pharmacistId);
    
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Pharmacist not found" });
    }
    
    res.json({ success: true, message: "Pharmacist deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// API for adding support staff
const addSupportStaff = async (req, res) => {
  try {
    const {
      name,
      gender,
      dateOfBirth,
      contactNumber,
      addressLine1,
      addressLine2,
      role,
      shiftTimings,
      supervisorName,
      dateOfJoining,
      basicSalary
    } = req.body;
    
    const imageFile = req.file;

    // Check for required fields
    if (
      !name ||
      !gender ||
      !dateOfBirth ||
      !contactNumber ||
      !addressLine1 ||
      !role ||
      !shiftTimings ||
      !supervisorName ||
      !dateOfJoining ||
      !basicSalary
    ) {
      return res.json({ success: false, message: "Missing Required Details" });
    }

    // Validate contact number and email
    if (!validator.isMobilePhone(contactNumber)) {
      return res.json({ success: false, message: "Please enter a valid contact number" });
    }
    

    // Handle image upload
    let imageUrl = "";
    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image"
      });
      imageUrl = imageUpload.secure_url;
    } else {
      return res.json({ success: false, message: "Support Staff photo is required" });
    }

    // Prepare data for database
    const staffData = {
      photo: imageUrl,
      name,
      gender,
      dateOfBirth: new Date(dateOfBirth),
      contactNumber,
      addressLine1,
      addressLine2,
      role,
      shiftTimings,
      supervisorName,
      dateOfJoining: new Date(dateOfJoining),
      basicSalary: Number(basicSalary)
    };

    // Create and save new support staff
    const newStaff = new supportStaffModel(staffData);
    await newStaff.save();
    
    res.json({ success: true, message: "Support Staff Added Successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get all support staff
const getAllSupportStaff = async (req, res) => {
  try {
    const staffList = await supportStaffModel.find({});
    res.json({ success: true, staffList });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to update support staff details
const updateSupportStaff = async (req, res) => {
  try {
    const staffId = req.params.id;
    const existingStaff = await supportStaffModel.findById(staffId);
    
    if (!existingStaff) {
      return res.status(404).json({ success: false, message: "Support Staff not found" });
    }

    const {
      name,
      gender,
      dateOfBirth,
      contactNumber,
      addressLine1,
      addressLine2,
      role,
      shiftTimings,
      supervisorName,
      dateOfJoining,
      basicSalary
    } = req.body;

    
    if (contactNumber && !validator.isMobilePhone(contactNumber)) {
      return res.json({ success: false, message: "Please enter a valid contact number" });
    }

    // Handle image update
    let imageUrl = existingStaff.photo;
    if (req.file) {
      const imageUpload = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "image"
      });
      imageUrl = imageUpload.secure_url;
    }

    // Prepare updated data
    const updatedData = {
      photo: imageUrl
    };

    // Update fields if provided
    if (name) updatedData.name = name;
    if (gender) updatedData.gender = gender;
    if (dateOfBirth) updatedData.dateOfBirth = new Date(dateOfBirth);
    if (contactNumber) updatedData.contactNumber = contactNumber;
    if (addressLine1) updatedData.addressLine1 = addressLine1;
    if (addressLine2 !== undefined) updatedData.addressLine2 = addressLine2;
    if (role) updatedData.role = role;
    if (shiftTimings) updatedData.shiftTimings = shiftTimings;
    if (supervisorName) updatedData.supervisorName = supervisorName;
    if (dateOfJoining) updatedData.dateOfJoining = new Date(dateOfJoining);
    if (basicSalary) updatedData.basicSalary = Number(basicSalary);

    await supportStaffModel.findByIdAndUpdate(staffId, updatedData, { new: true });
    res.json({ success: true, message: "Support Staff updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// API to delete support staff
const deleteSupportStaff = async (req, res) => {
  try {
    const staffId = req.params.id;
    const deleted = await supportStaffModel.findByIdAndDelete(staffId);
    
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Support Staff not found" });
    }
    
    res.json({ success: true, message: "Support Staff deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// IT & Technical Staff Controller Functions
// API for adding IT staff
const addITStaff = async (req, res) => {
  try {
    const {
      name,
      gender,
      dateOfBirth,
      contactNumber,
      addressLine1,
      addressLine2,
      emailID,
      role,
      dateOfJoining,
      salary,
    } = req.body;
    
    const imageFile = req.file;

    // Check for required fields
    if (
      !name ||
      !gender ||
      !dateOfBirth ||
      !contactNumber ||
      !addressLine1 ||
      !emailID ||
      !role ||
      !dateOfJoining ||
      !salary
    ) {
      return res.json({ success: false, message: "Missing Required Details" });
    }

    // Check if staff with email already exists
    const existingStaff = await itTechnicalStaffModel.findOne({ emailID });
    if (existingStaff) {
      return res.json({ success: false, message: "IT Staff with this email already exists" });
    }

    // Validate contact number and email
    if (!validator.isMobilePhone(contactNumber)) {
      return res.json({ success: false, message: "Please enter a valid contact number" });
    }
    
    if (!validator.isEmail(emailID)) {
      return res.json({ success: false, message: "Please enter a valid email" });
    }

    // Handle image upload
    let imageUrl = "";
    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image"
      });
      imageUrl = imageUpload.secure_url;
    } else {
      return res.json({ success: false, message: "IT Staff photo is required" });
    }

    // Prepare data for database
    const staffData = {
      photo: imageUrl,
      name,
      gender,
      dateOfBirth: new Date(dateOfBirth),
      contactNumber,
      addressLine1,
      addressLine2,
      emailID,
      role,
      dateOfJoining: new Date(dateOfJoining),
      salary: Number(salary)
    };

    // Create and save new IT staff
    const newStaff = new itTechnicalStaffModel(staffData);
    await newStaff.save();
    
    res.json({ success: true, message: "IT Staff Added Successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get all IT staff
const getAllITStaff = async (req, res) => {
  try {
    const staffList = await itTechnicalStaffModel.find({});
    res.json({ success: true, staffList });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to update IT staff details
const updateITStaff = async (req, res) => {
  try {
    const staffId = req.params.id;
    const existingStaff = await itTechnicalStaffModel.findById(staffId);
    
    if (!existingStaff) {
      return res.status(404).json({ success: false, message: "IT Staff not found" });
    }

    const {
      name,
      gender,
      dateOfBirth,
      contactNumber,
      addressLine1,
      addressLine2,
      emailID,
      role,
      dateOfJoining,
      salary
    } = req.body;

    // Check if email is being changed and already exists
    if (emailID && emailID !== existingStaff.emailID) {
      const duplicateEmail = await itTechnicalStaffModel.findOne({ emailID });
      if (duplicateEmail) {
        return res.json({ success: false, message: "Email already exists" });
      }
    }

    // Validate email and contact number if provided
    if (emailID && !validator.isEmail(emailID)) {
      return res.json({ success: false, message: "Invalid email format" });
    }
    
    if (contactNumber && !validator.isMobilePhone(contactNumber)) {
      return res.json({ success: false, message: "Please enter a valid contact number" });
    }

    // Handle image update
    let imageUrl = existingStaff.photo;
    if (req.file) {
      const imageUpload = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "image"
      });
      imageUrl = imageUpload.secure_url;
    }

    // Prepare updated data
    const updatedData = {
      photo: imageUrl
    };

    // Update fields if provided
    if (name) updatedData.name = name;
    if (gender) updatedData.gender = gender;
    if (dateOfBirth) updatedData.dateOfBirth = new Date(dateOfBirth);
    if (contactNumber) updatedData.contactNumber = contactNumber;
    if (addressLine1) updatedData.addressLine1 = addressLine1;
    if (addressLine2 !== undefined) updatedData.addressLine2 = addressLine2;
    if (emailID) updatedData.emailID = emailID;
    if (role) updatedData.role = role;
    if (dateOfJoining) updatedData.dateOfJoining = new Date(dateOfJoining);
    if (salary) updatedData.salary = Number(salary);

    await itTechnicalStaffModel.findByIdAndUpdate(staffId, updatedData, { new: true });
    res.json({ success: true, message: "IT Staff updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// API to delete IT staff
const deleteITStaff = async (req, res) => {
  try {
    const staffId = req.params.id;
    const deleted = await itTechnicalStaffModel.findByIdAndDelete(staffId);
    
    if (!deleted) {
      return res.status(404).json({ success: false, message: "IT Staff not found" });
    }
    
    res.json({ success: true, message: "IT Staff deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};



export { addAdministrativeStaff, getAllAdministrativeStaff, updateAdministrativeStaff, deleteAdministrativeStaff, 
    addNurse, getAllNurses, updateNurse, deleteNurse, addLabTechnician, getAllLabTechnicians, updateLabTechnician, 
    deleteLabTechnician, addPharmacist, getAllPharmacists,updatePharmacist,deletePharmacist,addSupportStaff,
  getAllSupportStaff, updateSupportStaff, deleteSupportStaff, addITStaff, getAllITStaff, updateITStaff, deleteITStaff };