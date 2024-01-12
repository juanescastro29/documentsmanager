const fileControl = {};
const stream = require("stream");
const path = require("path");
const { google } = require("googleapis");
const File = require("../models/file");
const User = require("../models/user");

const SCOPES = ["https://www.googleapis.com/auth/drive"];

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.CLIENT_EMAIL,
    private_key: process.env.PRIVATE_KEY,
    project_id: process.env.PROJECT_ID
  },
  scopes: SCOPES,
  role: "reader",
});

const uploadFile = async (fileObject) => {
  const bufferStream = new stream.PassThrough();
  bufferStream.end(fileObject.buffer);
  const response = await google.drive({ version: "v3", auth }).files.create({
    media: {
      mimeType: fileObject.mimeType,
      body: bufferStream,
    },
    requestBody: {
      name: fileObject.originalname,
      parents: ["1zkiAbHdiSYMwQASngzwNpJbz3fgogxNc"],
    },
    fields: "webViewLink, webContentLink, id",
  });
  
  const data = response.data;

  const fileData = {
    driveId: data.id,
    name: fileObject.originalname,
    extention: fileObject.originalname.split(".").pop(),
    url: data.webViewLink,
    downloadUrl: data.webContentLink,
  };

  const file = new File(fileData);
  return file;
};

fileControl.getFiles = async (req, res) => {
  try {
    const data = await File.find({owner: req.params.id});
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error when fetch" });
  }
};

fileControl.upload = async (req, res) => {
  try {
    const { files } = req;
    for (let i = 0; i < files.length; i++) {
      const file = await uploadFile(files[i]);
      file.owner = req.params.id;
      const owner = await User.findById(req.params.id);
      owner.files.push(file);
      await owner.save();
      await file.save();
    }
    res.status(200).send("File uploaded successfully");
  } catch (error) {
    res.status(500).send("Error uploading file: " + error);
  }
};

fileControl.delete = async (req, res) => {
  try {
    const fileData = req.body;
    await google.drive({ version: "v3", auth }).files.update({
      fileId: fileData.driveId,
      requestBody: {
        trashed: true,
      },
    });
    await File.findByIdAndDelete(fileData.id);
    res.status(200).send("Document deleted successfully");
  } catch (error) {
    res.status(500).send("Error deleting file: " + error);
  }
};

module.exports = fileControl;
