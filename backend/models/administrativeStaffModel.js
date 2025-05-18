import mongoose from "mongoose";

const administrativeStaffSchema = new mongoose.Schema({
    photo: {
        type: String,
        required: true,
    },
    staffID: {
        type: String,
        unique: true,
    },
    fullName: {
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
    role: {
        type: String,
        enum: ['Admin','Receptionist', 'Billing Clerk', 'HR Assistant'],
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    shiftTimings: {
        type: String,
        required: true,
    },
    dateOfJoining: {
        type: Date,
        required: true,
    },
    salaryDetails: {
        type: Number,
        required: true,
    },
}, { timestamps: true });

administrativeStaffSchema.pre('save', async function (next) {
    if (!this.staffID) {
        const count = await mongoose.models.administrativeStaff.countDocuments();
        this.staffID = `ASTRA-${(100 + count).toString()}`;
    }
    next();
});


const administrativeStaffModel = mongoose.models.administrativeStaff || mongoose.model('administrativeStaff', administrativeStaffSchema);

export default administrativeStaffModel;
