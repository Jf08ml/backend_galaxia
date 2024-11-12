import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  permissions: [String],
});

export default mongoose.model("Role", roleSchema);