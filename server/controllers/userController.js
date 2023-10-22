const UserModel = require('../models/Users');
const path = require('path');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find({});
    res.json(users);
  } catch (err) {
    res.json(err);
  }
};

exports.getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await UserModel.findOne({ _id: id });
    res.json(user);
  } catch (err) {
    res.json(err);
  }
};

exports.updateUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await UserModel.findOneAndUpdate(
      { _id: id },
      {
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
      },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    res.json(err);
  }
};

exports.deleteUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await UserModel.findByIdAndDelete({ _id: id });
    res.json(result);
  } catch (err) {
    res.json(err);
  }
};

exports.createUser = async (req, res) => {
  try {
    const { name, email, age } = req.body;
    const photo = req.file.filename;
    const user = await UserModel.create({ name, email, age, photo });
    res.json(user);
  } catch (err) {
    res.json(err);
  }
};