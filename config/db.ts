import { connect } from "mongoose";

export const connectDB = async () => {
  try {
    const connectionString: string = process.env.MONGO_URI || "";
    await connect(connectionString, {dbName : 'chat_app'})
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};
