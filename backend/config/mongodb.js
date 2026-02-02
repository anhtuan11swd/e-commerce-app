import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionString = `${process.env.MONGODB_URI}`;

    const conn = await mongoose.connect(connectionString, {
      family: 4, // Use IPv4, skip trying IPv6
      // Connection options for better performance and reliability
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    });

    console.log(`MongoDB đã kết nối thành công: ${conn.connection.host}`);
  } catch (error) {
    console.error("Lỗi kết nối MongoDB:", error.message);
    process.exit(1);
  }
};

export default connectDB;
