import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String, default: "" },
    patientId: { type: String, unique: true },
    phone: { type: String, default: "" },
    address: { 
        line1: { type: String, default: "" },
        line2: { type: String, default: "" },
        line3: { type: String, default: "" }
    },
    gender: { type: String, enum: ["Male", "Female", "Other"], default: "Male" },
    dob: { type: Date, default: null },
    bloodGroup: { type: String, enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], default: "O+" },
    emergencyContact: {
        name: { type: String, default: "" },
        relation: { type: String, default: "" },
        phone: { type: String, default: "" }
    },
    appointments: [{
        date: { type: Date },
        time: { type: String },
        doctor: { type: String },
        department: { type: String },
        status: { type: String, enum: ["Upcoming", "Completed", "Cancelled"], default: "Upcoming" }
    }],
    medicalRecords: { type: mongoose.Schema.Types.Mixed }
}, { timestamps: true });


userSchema.pre('save', async function(next) {
    if (!this.patientId) {
        const count = await mongoose.models.user.countDocuments();
        this.patientId = `ASTRA-${(20000 + count).toString()}`;
    }
    next();
});

const userModel = mongoose.models.user || mongoose.model('user', userSchema);

export default userModel;

// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     address: { type: Object, default: true },
//     gender: { type: String, default: {line1:"",line2:"",line3:""} },
//     dob: { type: String, default: "Not selected" },
//     phone: { type: String, default: "0000000000" },
// })

// const userModel = mongoose.models.doctor || mongoose.model('user', userSchema)

// export default userModel
