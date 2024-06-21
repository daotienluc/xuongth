const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../client")));
app.use(cors());

app.use((req, res, next) => {
  console.log(`Request URL: ${req.url}`);
  next();
});

app.use("/assets", express.static(path.join(__dirname, "../assets")));

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

app.post("/signup", async (req, res) => {
  const { username, password, walletAddress } = req.body;

  try {
    const existingUser = await User.findOne({ username: username });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Tên người dùng đã tồn tại. Vui lòng chọn tên khác.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username: username,
      password: hashedPassword,
      walletAddress: walletAddress,
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "Đăng ký thành công!",
    });
  } catch (error) {
    console.error("Đã xảy ra lỗi khi đăng ký:", error);
    res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi khi đăng ký, vui lòng thử lại sau.",
    });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username: username });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Tài khoản không tồn tại!" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res
        .status(401)
        .json({ success: false, message: "Mật khẩu không đúng!" });
    }

    const accessToken = jwt.sign(
      { username: user.username, walletAddress: user.walletAddress },
      process.env.ACCESS_TOKEN_SECRET || "default_secret_value", // Sử dụng giá trị mặc định nếu không có trong .env
      { expiresIn: "1h" }
    );

    res.json({
      success: true,
      message: "Đăng nhập thành công!",
      accessToken,
    });
  } catch (error) {
    console.error("Đã xảy ra lỗi khi đăng nhập:", error);
    res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi khi đăng nhập, vui lòng thử lại sau.",
    });
  }
});

app.get("/user", authenticateJWT, async (req, res) => {
  try {
    const username = req.user.username;
    const user = await User.findOne({ username: username });
    if (user) {
      res.json({ success: true, user: user });
    } else {
      res
        .status(404)
        .json({ success: false, message: "Người dùng không tồn tại!" });
    }
  } catch (error) {
    console.error("Đã xảy ra lỗi khi lấy thông tin người dùng:", error);
    res.status(500).json({
      success: false,
      message:
        "Đã xảy ra lỗi khi lấy thông tin người dùng, vui lòng thử lại sau.",
    });
  }
});

mongoose.connect("mongodb://localhost/myapp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Lỗi kết nối MongoDB:"));
db.once("open", function () {
  console.log("Đã kết nối đến MongoDB");
});

app.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
});
