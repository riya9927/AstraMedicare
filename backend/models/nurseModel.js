import mongoose from "mongoose";

const nurseSchema = new mongoose.Schema({
    staffID: {
        type: String,
        unique: true,
    },
    photo: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female"]
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    addressLine1: {
        type: String,
        required: true
    },
    addressLine2: {
        type: String
    },
    department: {
        type: String,
        required: true,
        enum: [
            "ICU",
            "General Ward",
            "Emergency Ward",
            "Surgical Ward",
            "Maternity Ward",
            "Operation Theater (OT)",
            "Outpatient Department (OPD)"
        ]
    },
    shiftDetails: {
        type: String,
        required: true,
        enum: ["Day", "Night"]
    },
    assignedDoctors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'doctor'  // Reference to the doctor model
    }],
    dateOfJoining: {
        type: Date,
        required: true
    },
    salaryDetails: {
        type: Number,
        required: true
    },
}, { timestamps: true });

nurseSchema.pre('save', async function (next) {
    if (!this.staffID) {
        const count = await mongoose.models.nurse.countDocuments();
        this.staffID = `ASTRA-${(200 + count).toString()}`;
    }
    next();
});

const nurseModel = mongoose.models.nurse || mongoose.model('nurse', nurseSchema);

export default nurseModel;
