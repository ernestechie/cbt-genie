import mongoose from "mongoose";

const mongo_url = process.env.MONGO_URI!;

/**
 * Function to initialize the mongoose instance.
 * This function is to be called in every route.
 */
export const connect = async () => {
  try {
    mongoose.connect(mongo_url);

    const connection = mongoose.connection.setMaxListeners(16);
    connection.on("connected", () => {
      console.log(`MongoDB Connected Successfully!`);
    });
    connection.on("error", (err) => {
      console.log(`MongoDB Error ->`, err);
    });
  } catch (err) {
    console.log(
      err instanceof Error ? err.message : "Unexpected error occured"
    );
  }
};
