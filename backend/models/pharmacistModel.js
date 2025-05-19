import mongoose from "mongoose";

const pharmacistSchema = new mongoose.Schema({
    pharmacistID: {
        type: String,
        unique: true,
    },
    photo: {
        type: String,
        required: true
    },
    name: {
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
    shiftDetails: {
        type: String,
        required: true,
        enum: ["Day", "Night"]
    },
    qualifications: {
        type: String
    },
    dateOfJoining: {
        type: Date,
        required: true
    },
    salaryDetails: {
        type: Number,
        required: true
    },
}, { timestamps: true });

pharmacistSchema.pre('save', async function (next) {
    if (!this.pharmacistID) {
        const count = await mongoose.models.pharmacist.countDocuments();
        this.pharmacistID = `ASTRA-${(500 + count).toString()}`;
    }
    next();
});

const pharmacistModel = mongoose.models.pharmacist || mongoose.model('pharmacist', pharmacistSchema);

export default pharmacistModel;
