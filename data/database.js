import mongoose from "mongoose";

export const mongoConnect = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "todo",
    })
    .then(() => {console.log("mongoDb connected successfully")})
    .catch((error) => {
      console.log("Something went wrong in mongoDb connection", error);
    });
};
