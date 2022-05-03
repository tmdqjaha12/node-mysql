const express = require("express");
// const ip = require("ip");
// const moment = require("moment");

const router = express.Router();

const Index_model = require("../models/Index_model");

// main
router.get("/", async (req, res) => {
  let data = [];
  data["message"] = "hello Rs-Team!!!";
  data["ifs"] = true;
  data["fors"] = [
    { label: 1 },
    { label: 2 },
    { label: 3 },
    { label: 4 },
    { label: 5 },
    { label: 6 },
  ];

  const testResult = await Index_model.getUserList();
  console.log("testResult => ", testResult);

  res.render("index", data);
});

module.exports = router;
