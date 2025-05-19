import mongoose from "mongoose";

const supportStaffSchema = new mongoose.Schema({
    photo: {
        type: String,
        required: true,
    },
    staffID: {
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
    role: {
        type: String,
        enum: [
            'Housekeeping',
            'Security',
            'Canteen',
            'Maintenance',
            'Laundry Services',
            'Supervisor',
            'Electrical',
            'Gardening',
            'Ambulance Services',
            'Ward Boy'
        ],
        required: true,
    },
    shiftTimings: {
        type: String,
        enum: ['Day', 'Night'],
        required: true,
    },
    supervisorName: {
        type: String,
        required: true,
    },
    dateOfJoining: {
        type: Date,
        required: true,
    },
    basicSalary: {
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

supportStaffSchema.pre('save', async function (next) {
    if (!this.staffID) {
        const count = await mongoose.models.supportStaff.countDocuments();
        this.staffID = `ASTRA-${(400 + count).toString()}`;
    }
    next();
});

const supportStaffModel = mongoose.models.supportStaff || mongoose.model('supportStaff', supportStaffSchema);

export default supportStaffModel;
