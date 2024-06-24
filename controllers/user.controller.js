require("dotenv").config();
const userdata = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.signUp = async (req, res) => {
  try {
    const payload = req.body;
    const existingUser = await userdata.findOne({ email: payload.email });
    if (existingUser) {
      return res.status(401).json({ message: "User already exists" });
    }
    const salt = bcrypt.genSaltSync(10);
    payload.password = bcrypt.hashSync(payload.password, salt);
    const user = await userdata(payload).save();
    return res.json({ message: "Account created Successfully", user });
  } catch (error) {
    return res.status(500).json({
      message: "Somthings went worng. Please try again later",
    });
  }
};

module.exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userdata.findOne({ email });
    if (user) {
      if (!bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({
          message: "Invalid credentials",
        });
      }

      const payload = {
        name: user.name,
        email: user.email,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "365d",
      });

      return res.status(200).json({
        message: "Login Successfully",
        access_token: `Bearer ${token}`,
      });
    }
    return res.status(401).json({
      message: "Invalid credentials",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something wants wrong :(",
    });
  }
};

module.exports.fetchUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const users = await userdata.find().skip(skip).limit(limit);
    const totalCount = await userdata.countDocuments();
    let nextPageUrl = null;
    if (skip + limit < totalCount) {
      const nextPage = page + 1;
      nextPageUrl = `${req.protocol}://${req.get("host")}${
        req.baseUrl
      }?page=${nextPage}&limit=${limit}`;
    }
    return res.json({
      message: "Fetch All User's :)",
      data: users,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
      totalUsers: totalCount,
      nextPageUrl: nextPageUrl,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something wants wrong :(",
    });
  }
};

module.exports.fetchUserById = async (req, res) => {
  try {
    const user_id = req.params.id;
    const user = await userdata.findById(user_id);
    return res.status(200).json({
      message: "User fetch Successfully :)",
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something wants wrong :(",
    });
  }
};

module.exports.updateUser = async (req, res) => {
  try {
    const user_id = req.params.id;
    const update = {
      firstName: req.body?.firstName,
      lastName: req.body?.lastName,
      phoneNumber: req.body?.phoneNumber,
      email: req.body?.email,
      password: req.body?.password,
    };

    const result = await userdata.findByIdAndUpdate(user_id, update, {
      new: true,
    });
    res.status(200).json({
      message: "User Information Updated Successfully :)",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong :(",
    });
  }
};

module.exports.deleteUser = async (req, res) => {
  try {
    const user_id = req.params.id;
    const result = await userdata.findByIdAndDelete(user_id, { new: true });
    res.status(200).json({
      message: "User Deleted Successfully :)",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong :(",
    });
  }
};
