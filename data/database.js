import mongoose from "mongoose";

export const mongoConnect = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "todo",
    })
    .then((res) => {console.log(`mongoDb connected successfully with ${res.connection.host}`)})
    .catch((error) => {
      console.log("Something went wrong in mongoDb connection", error);
    });
};
