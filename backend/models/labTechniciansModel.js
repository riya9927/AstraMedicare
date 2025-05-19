import mongoose from "mongoose";

const labTechnicianSchema = new mongoose.Schema({
    photo: {
        type: String,
        required: true,
    },
    technicianID: {
        type: String,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female'],
        required: true,
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    contactNumber: {
        type: String,
        required: true,
    },
    addressLine1: {
        type: String,
        required: true,
    },
    addressLine2: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
    },
    qualifications: {
        type: String
    },
    shiftDetails: {
        type: String,
        required: true,
        enum: ["Day", "Night"]
    },
    supervisedDoctors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'doctor'  // Reference to the doctor model
    }],
    salaryDetails: {
        type: Number,
        required: true
    },
}, { timestamps: true })

labTechnicianSchema.pre('save', async function (next) {
    if (!this.technicianID) {
        const count = await mongoose.models.labTechnician.countDocuments();
        this.technicianID = `ASTRA-${(300 + count).toString()}`;
    }
    next();
});

const labTechnicianModel = mongoose.models.labTechnician || mongoose.model('labTechnician', labTechnicianSchema);

export default labTechnicianModel;