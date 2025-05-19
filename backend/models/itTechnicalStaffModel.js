import mongoose from "mongoose";

const itTechnicalStaffSchema = new mongoose.Schema({
    photo: {
        type: String,
        required: true,
    },
    itID: {
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
    emailID: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: [
            'IT Support Technician',
            'Network Administrator',
            'System Administrator',
            'Hardware Technician',
            'Software Engineer',
            'EMR/EHR Specialist (Electronic Medical Records)'
        ],
        required: true,
    },
    dateOfJoining: {
        type: Date,
        required: true,
    },
    salary: {
        type: Number,
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
}, { timestamps: true });

itTechnicalStaffSchema.pre('save', async function (next) {
    if (!this.itID) {
        const count = await mongoose.models.itTechnicalStaff.countDocuments();
        this.itID = `ASTRA-${(600 + count).toString()}`;
    }
    next();
});

const itTechnicalStaffModel = mongoose.models.itTechnicalStaff || mongoose.model('itTechnicalStaff', itTechnicalStaffSchema);

export default itTechnicalStaffModel;
