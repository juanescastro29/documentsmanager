const userControl = {};

const User = require("../models/user");
const Bcrypt = require("bcryptjs");

userControl.getUsers = async (req, res) => {
  const data = await User.find({});
  res.json(data);
};

userControl.createUser = async (req, res) => {
  try {
    const userFound = await User.find({ email: req.body.email });

    if (userFound.length == 0) {
      const newUser = new User(req.body);
      newUser.password = await Bcrypt.hash(newUser.password, 10);
      await newUser.save();
      res.json({ message: "User created successfully" });
    } else {
      res.json({ message: "Already registered user" });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

userControl.updateUser = async (req, res) => {
  try {
    if (req.params.password) {
      req.params.password = await Bcrypt.hash(req.params.password, 10);
    }
    await User.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: "User updated" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

userControl.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndRemove(req.params.id);
    res.json({ message: "User deleted" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

userControl.login = async (req, res) => {
  try {
    const data = req.body;
    const user = await User.find({ email: data.email });

    if (user.length > 0) {
      const validation = await Bcrypt.compare(data.password, user[0].password);
      if (validation) {
        res.json({ message: "Session", user: user });
      } else {
        res.json({ message: "Wrong password" });
      }
    } else {
      res.json({ message: "Unregistered user" });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports = userControl;
