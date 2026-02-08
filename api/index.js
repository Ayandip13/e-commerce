require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("./models/user.model.js");
const Order = require("./models/order.model.js");
const fs = require("fs");
const path = require("path");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const bcrypt = require("bcrypt");

const app = express();
const PORT = process.env.PORT || 8000;
const cors = require("cors");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "profile_pictures",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const upload = multer({ storage });

const connectDB = require("./db");

app.use(async (req, res, next) => {
  await connectDB();
  next();
});

//endpoints to register and login the user
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Registration failed" });
  }
});

const secretKey = process.env.JWT_SECRET;

//endpoint to login the user
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    //check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User does not exist" });
    }

    //check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ userId: user._id }, secretKey);

    //login successful
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
});

//endpoint to store the user's addresses in the database
app.post("/addresses", async (req, res) => {
  try {
    const { userId, address } = req.body;

    //check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    //add new addresses to the user's addresses array
    user.addresses.push(address);
    //save the updated user document to the database
    await user.save();
    res.status(200).json({ message: "Address created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding address" });
  }
});

//endpoint to get the user's addresses from the database
app.get("/addresses/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const addresses = user.addresses;
    res.status(200).json({ addresses });
  } catch (error) {
    res.status(500).json({ message: "Error getting addresses" });
  }
});

//endpoint to store all of the orders
app.post("/orders", async (req, res) => {
  try {
    const { userId, cartItems, totalPrice, shippingAddress, paymentMethod } =
      req.body;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //create an array of product objects from the cart items
    const products = cartItems.map((item) => ({
      name: item.title,
      price: item.price,
      quantity: item.quantity,
      image: item.image,
    }));

    //create a new order
    const order = new Order({
      user: userId,
      products,
      totalPrice,
      shippingAddress,
      paymentMethod,
    });

    //save the order to the database
    await order.save();
    res.status(201).json({ message: "Order created successfully!" });
  } catch (error) {
    console.log("Error creating order", error);
    res.status(500).json({ message: "Error creating order" });
  }
});

//get the user profile
app.get("/profile/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving the user profile" });
  }
});

//get the orders which will be eventually shown on the profile screen
app.get("/orders/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const orders = await Order.find({ user: userId }).populate("user");
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found for the user" });
    }

    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
});

//endpoint to get products by category with pagination
app.get("/categories/:categoryName", async (req, res) => {
  try {
    const categoryName = req.params.categoryName;
    const page = parseInt(req.query.page) || 1;
    const limit = 10;

    const fileName = `${categoryName
      .charAt(0)
      .toUpperCase()}${categoryName.slice(1)}.json`;
    const filePath = path.join(__dirname, "categories", fileName);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "Category not found" });
    }

    const jsonData = fs.readFileSync(filePath, "utf-8");
    const products = JSON.parse(jsonData);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const paginatedProducts = products.slice(startIndex, endIndex);

    res.status(200).json({
      currentPage: page,
      totalPages: Math.ceil(products.length / limit),
      totalItems: products.length,
      itemsPerPage: limit,
      products: paginatedProducts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getting products" });
  }
});

//endpoint to get all products by category
app.get("/categories/:categoryName/all", async (req, res) => {
  try {
    const { categoryName } = req.params;

    const fileName = `${categoryName
      .charAt(0)
      .toUpperCase()}${categoryName.slice(1)}.json`;
    const filePath = path.join(__dirname, "categories", fileName);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "Category not found" });
    }

    const jsonData = fs.readFileSync(filePath, "utf-8");
    const products = JSON.parse(jsonData);

    res.status(200).json({
      totalItems: products.length,
      products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getting products" });
  }
});
// GET /categories/electronics/all


//endpoint to upload profile picture
app.put(
  "/edit-profile/:userId",
  upload.single("profileImage"),
  async (req, res) => {
    try {
      const { userId } = req.params;
      const { name, email, password } = req.body;

      // ❗ profile picture is mandatory
      if (!req.file) {
        return res.status(400).json({ message: "Profile picture is required" });
      }

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // optional updates
      if (name) user.name = name;
      if (email && email !== user.email) {
        const emailExists = await User.findOne({ email });
        if (emailExists) {
          return res.status(400).json({ message: "Email already in use" });
        }
        user.email = email;
      }

      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
      }

      // mandatory profile image
      user.profileImage = req.file.path; // Cloudinary URL

      await user.save();

      res.status(200).json({
        message: "Profile updated successfully",
        user,
      });
    } catch (error) {
      console.log("Edit profile error:", error);
      res.status(500).json({ message: "Failed to update profile" });
    }
  }
);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
