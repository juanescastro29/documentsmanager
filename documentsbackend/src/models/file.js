const { Schema, model } = require("mongoose");

const fileSchema = new Schema(
  {
    driveId: { type: String, required: true },
    name: { type: String, required: true },
    extention: { type: String, required: true },
    url: { type: String, required: true },
    downloadUrl: { type: String, require: true },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("File", fileSchema);
