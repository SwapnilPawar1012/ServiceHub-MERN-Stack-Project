const port = 4000;
require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { error } = require("console");
const exp = require("constants");
const bcrypt = require("bcrypt");

app.use(express.json());
app.use(cors());

// Database connect with MongoDB
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_ID}:${process.env.DB_PASS}@cluster0.zv8livl.mongodb.net/service-hub`,
    {
      connectTimeoutMS: 30000, // Increase connection timeout
      socketTimeoutMS: 45000, // Increase socket timeout
    }
  )
  .then(() => console.log("MongoDB connection successful"))
  .catch((err) => console.error("MongoDB connection error:", err));

// API Creation
app.get("/", (req, res) => {
  res.send("Express App is Running");
});

// Image Storage Engine
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

// Creating Upload Endpoint for images (Upload new images in upload folder)
app.use("/images", express.static("upload/images"));

app.post("/upload", upload.single("service-center"), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`,
  });
});

// Schema for Creating Service Center
const ServiceCenterSchema = mongoose.model("ServiceCenter", {
  id: {
    type: Number,
    required: true,
    unique: true,
    trim: true,
  },

  userId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },

  name: {
    type: String,
    required: true,
    trim: true,
  },

  description: {
    type: String,
    required: true,
    trim: true,
  },

  image: {
    type: String,
    required: true,
    trim: true,
  }, // Assuming this is a URL or path to the image file

  category: {
    type: String,
    required: true,
    trim: true,
  },

  address: {
    type: String,
    required: true,
    trim: true,
  },

  location: {
    latitude: {
      type: String,
      required: true,
      trim: true,
    },
    longitude: {
      type: String,
      required: true,
      trim: true,
    },
  },

  servicesOffered: [
    {
      type: String,
      required: true,
      trim: true,
    },
  ],

  operatingHours: {
    workingDays: {
      days: {
        type: String,
        required: true,
        trim: true,
      },
      hours: {
        type: String,
        required: true,
        trim: true,
      },
    },
    nonWorkingDays: {
      days: {
        type: String,
        required: true,
        trim: true,
      },
    },
  },

  contact: {
    phone: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],
    email: {
      type: String,
      required: true,
      trim: true,
    },
    website: String,
  },

  ratings: {
    type: Number,
    default: 0, // Consider adding a default value
  },

  reviews: [
    {
      reviewerId: {
        type: String,
        required: true,
        trim: true,
      },
      reviewText: {
        type: String,
        required: true,
        trim: true,
      },
      rating: {
        type: Number,
        required: true,
        trim: true,
      },
    },
  ],

  verificationStatus: {
    type: String,
    required: true,
    trim: true,
  },

  discounts: [
    {
      discountName: {
        type: String,
        required: true,
        trim: true,
      },
      discountDescription: String,
      percentageOff: {
        type: Number,
        required: true,
        trim: true,
      },
      conditions: String,
      validity: {
        startDate: Date,
        endDate: Date,
      },
    },
  ],
});

// Schema for Creating User
const UserSchema = mongoose.model("User", {
  userImage: {
    type: String,
    // required: true,
    trim: true,
  },

  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },

  password: {
    // Store hashed passwords only
    type: String,
    required: true,
    trim: true,
  },

  serviceCenterData: [
    {
      type: Number,
      required: true,
      ref: "ServiceCenter",
      trim: true,
    },
  ],

  reviewsData: [
    {
      serviceCenterId: {
        type: Number,
        required: true,
        trim: true,
        ref: "ServiceCenter", // Assuming you have a ServiceCenter model
      },
      reviewText: {
        type: String,
        required: true,
        trim: true,
      },
      rating: {
        type: Number,
        required: true,
        trim: true,
        min: 1, // minimum rating value
        max: 5, // maximum rating value
      },
      datePosted: {
        type: Date,
        default: Date.now,
      },
    },
  ], // Embedding user reviews directly within the user document

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Creating Endpoint for registering the user
app.post("/signup", async (req, res) => {
  try {
    let check = await UserSchema.findOne({ email: req.body.email });
    if (check) {
      return res.status(400).json({
        success: false,
        error: "existing user found with same email address",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = new UserSchema({
      userImage: req.body.userImage || null,
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      serviceCenterData: req.body.serviceCenterData,
      reviewsData: req.body.reviewsData,
    });
    console.log(user._id);
    await user.save();
    console.log("user saved");

    const data = {
      user: {
        id: user.id,
        _id: user._id, // MongoDB ID
      },
    };

    const token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ success: true, token });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error registering new user");
  }
});

app.post("/login", async (req, res) => {
  let user = await UserSchema.findOne({ email: req.body.email });
  if (user) {
    // Verify password
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (isMatch) {
      const data = {
        user: {
          id: user.id,
          _id: user._id, // MongoDB ID
        },
      };
      const token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "1h" });
      res.json({ success: true, token });
    } else {
      res.status(400).json({ success: false, error: "Wrong Password" });
    }
  } else {
    res.status(400).json({ success: false, error: "Wrong Email Id" });
  }
});

// Creating middelware to fetch user
const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "Please authenticate using valid token" });
  } else {
    try {
      const data = jwt.verify(token, process.env.JWT_SECRET);
      req.user = data.user;
      next();
    } catch (error) {
      res.status(401).send({ error: "Please authenticate using valid token" });
    }
  }
};

app.post("/addservicecenter", fetchUser, async (req, res) => {
  const token = req.header("auth-token");
  console.log("addservicecenter : " + token);
  let serviceCenters = await ServiceCenterSchema.find({});
  let id = serviceCenters.length > 0 ? serviceCenters.slice(-1)[0].id + 1 : 1;

  const serviceCenter = new ServiceCenterSchema({
    id: id,
    userId: req.body.userId,
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    image: req.body.image,
    address: req.body.address,
    location: req.body.location,
    servicesOffered: req.body.servicesOffered,
    operatingHours: req.body.operatingHours,
    contact: req.body.contact,
    ratings: req.body.ratings,
    reviews: req.body.reviews,
    verificationStatus: req.body.verificationStatus,
    discounts: req.body.discounts,
  });
  console.log(serviceCenter);
  await serviceCenter.save();
  console.log("Saved");
  res.json({
    success: true,
    name: req.body.name,
  });
});

// Creating API for update service center data reviews and rating
app.post("/addservicecenterreview/:serviceCenterID", async (req, res) => {
  const serviceCenterID = req.params.serviceCenterID;
  try {
    const exists = await ServiceCenterSchema.findOne({
      id: serviceCenterID,
      "reviews.reviewerId": req.body.reviewerId,
    });

    let result;
    if (exists) {
      // Update the existing review
      result = await ServiceCenterSchema.findOneAndUpdate(
        { id: serviceCenterID, "reviews.reviewerId": req.body.reviewerId },
        {
          $set: {
            "reviews.$.reviewText": req.body.reviewText,
            "reviews.$.rating": req.body.rating,
          },
        },
        { new: true }
      );
      res.json({
        success: true,
        message: "Review updated successfully",
      });
    } else {
      // Add a new review
      result = await ServiceCenterSchema.findOneAndUpdate(
        { id: serviceCenterID },
        {
          $push: {
            reviews: {
              reviewerId: req.body.reviewerId,
              reviewText: req.body.reviewText,
              rating: req.body.rating,
            },
          },
          $inc: {
            ratings: 1,
          },
        },
        { new: true }
      );
      res.json({
        success: true,
        message: "Review added successfully",
      });
    }
  } catch (error) {
    console.error("Failed to update service center review:", error);
    res.status(500).send("An error occurred while updating the review.");
  }
});

// Creating API for update user reviews and rating data
app.post("/adduserreview/:userId", async (req, res) => {
  const userID = req.params.userId;
  try {
    const exists = await UserSchema.findOne({
      _id: userID,
      "reviewsData.serviceCenterId": req.body.serviceCenterID,
    });

    let result;
    if (exists) {
      // Update the existing review
      result = await UserSchema.findOneAndUpdate(
        {
          _id: userID,
          "reviewsData.serviceCenterId": req.body.serviceCenterID,
        },
        {
          $set: {
            "reviewsData.$.reviewText": req.body.reviewText,
            "reviewsData.$.rating": req.body.rating,
          },
        },
        { new: true }
      );
      res.json({
        success: true,
        message: "User review updated successfully",
      });
    } else {
      // Add a new review
      result = await UserSchema.findOneAndUpdate(
        { _id: userID },
        {
          $push: {
            reviewsData: {
              serviceCenterId: req.body.serviceCenterID,
              reviewText: req.body.reviewText,
              rating: req.body.rating,
            },
          },
          $inc: {
            reviewCount: 1,
          },
        },
        { new: true }
      );
      res.json({
        success: true,
        message: "User review added successfully",
      });
    }
  } catch (error) {
    console.error("Failed to update user review:", error);
    res.status(500).send("An error occurred while updating the review.");
  }
});

// Creating API for deleting service center
app.post("/removeservicecenter", async (req, res) => {
  await ServiceCenterSchema.findOneAndDelete({ id: req.body.id });
  console.log("Removed");
  res.json({
    success: true,
    name: req.body.name,
  });
});

// Creating API for getting all service centers
app.get("/allservicecenters", async (req, res) => {
  let serviceCenter = await ServiceCenterSchema.find({});
  res.send(serviceCenter);
});

// Creating API for getting list of service centers of user
app.get("/listservicecenter/:userID", async (req, res) => {
  const id = req.params.userID.toString();
  console.log("listservicecenter " + id);
  let serviceCenter = await ServiceCenterSchema.find({ userId: id });
  console.log(serviceCenter);
  res.send(serviceCenter);
});

// Creating API for getting a service center data
app.get("/servicecenterdata/:service_centerID", async (req, res) => {
  const { service_centerID } = req.params;
  console.log("id : " + service_centerID);
  const serviceCenter = await ServiceCenterSchema.findOne({
    id: service_centerID,
  });
  // console.log(serviceCenter);

  if (!serviceCenter) {
    return res.status(404).send("Service Center not found");
  }

  res.json(serviceCenter);
});

// Creating endpoint for remove service center from reviewsData
app.post("/removereviewsdata", fetchUser, async (req, res) => {
  console.log(req.body, req.user);
  let userData = await UserSchema.findOne({ _id: req.user.id });
  if (userData.reviewsData[req.body.itemId] > 0) {
    userData.reviewsData[req.body.itemId] -= 1;
    await UserSchema.findOneAndUpdate(
      { _id: req.user.id },
      { reviewsData: userData.reviewsData }
    );
  }
  res.send("Removed");
});

// Creating endpoint to get reviews data
app.post("/getreviewsdata", fetchUser, async (req, res) => {
  console.log("Get Reviews Data");
  let userData = await UserSchema.findOne({ _id: req.user.id });
  res.json(userData.reviewsData);
});

// Creating endpoint for adding service centers in reviewsData section
app.post("/addservicecenterdata", fetchUser, async (req, res) => {
  console.log(req.body, req.user);
  let userData = await UserSchema.findOne({ _id: req.user.id });
  userData.serviceCenterData[req.body.itemId] += 1;
  await UserSchema.findOneAndUpdate(
    { _id: req.user.id },
    { serviceCenterData: userData.serviceCenterData }
  );
  res.send("Added");
});

// Creating endpoint for remove service center from reviewsData
app.post("/removeservicecenterdata", fetchUser, async (req, res) => {
  console.log(req.body, req.user);
  let userData = await UserSchema.findOne({ _id: req.user.id });
  if (userData.serviceCenterData[req.body.itemId] > 0) {
    userData.serviceCenterData[req.body.itemId] -= 1;
    await UserSchema.findOneAndUpdate(
      { _id: req.user.id },
      { serviceCenterData: userData.serviceCenterData }
    );
  }
  res.send("Removed");
});

// Creating endpoint to get reviews data
app.post("/getservicecenterdata", fetchUser, async (req, res) => {
  console.log("Get Reviews Data");
  let userData = await UserSchema.findOne({ _id: req.user.id });
  res.json(userData.serviceCenterData);
});

app.listen(port, (error) => {
  if (!error) {
    console.log("Server Running on Port " + port);
  } else {
    console.log("Error : " + error);
  }
});
