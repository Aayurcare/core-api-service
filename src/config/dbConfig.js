const mongoose = require("mongoose");
exports.connect = () => {
  mongoose.set("strictQuery", true);

  mongoose
    .connect(
      process.env.MONGODB_URI ||
        "mongodb+srv://dev:aayurcaredev@atlascluster.8sec8ix.mongodb.net/aayurdb?retryWrites=true&w=majority&appName=AtlasCluster",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.error("Failed to connect to MongoDB", err);
    });
};
