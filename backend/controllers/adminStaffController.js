import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import jwt from "jsonwebtoken";
import administrativeStaffModel from "../models/administrativeStaffModel.js";
import nurseModel from "../models/nurseModel.js";

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

        if ( !fullName || !gender || !dateOfBirth || !contactNumber ||
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


export { addAdministrativeStaff, getAllAdministrativeStaff, updateAdministrativeStaff, deleteAdministrativeStaff, addNurse, getAllNurses, updateNurse, deleteNurse};