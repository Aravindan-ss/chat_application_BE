import { connect } from "mongoose";

export const connectDB = async () => {
  try {
    const connectionString: string = process.env.MONGO_URI || "";
    await connect(connectionString, {dbName : 'chat_app'})
    console.info("[INFO] MongoDB connected");
    //eslint-disable-next-line
  } catch (error: any) {
    console.error("[ERROR] MongoDB connection error:", error.message);
    process.exit(1);
  }
};
