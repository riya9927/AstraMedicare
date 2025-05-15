// import mongoose from "mongoose";

// const connectDB = async () => {
//     mongoose.connection.on('connected', () => console.log("Database Connected"))
//     await mongoose.connect(`${process.env.MONGODB_URI}/astramedicare`)
// }

// export default connectDB

import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("DB Connected");
    } catch (error) {
        console.error("Error connecting to DB:", error.message);
        process.exit(1); // Exit process with failure
    }
};

export default connectDB;