const router = require("express").Router();
const { v4: uuidv4 } = require("uuid");
let multer = require("multer");
const Expence = require("../models/expences");

const DIR = "./public/";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, uuidv4() + "-" + fileName);
  },
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("File type not accepted (.png, .jpg, .jpeg)"));
    }
  },
});

router.post("/add", upload.single("payslip"), (req, res, next) => {
  console.log(req.body);
  // var file = req.files.payslip;
  const name = req.body.name;
  const uid = req.body.uid;
  const designation = req.body.designation;
  const purpose = req.body.purpose;
  const bank = req.body.bank;
  const amount = Number(req.body.amount);
  const date = Date(req.body.date);

  const newExpence = new Expence({
    name,
    uid,
    designation,
    purpose,
    bank,
    amount,
    date,
    payslip: req.file.filename,
  });

  newExpence
    .save()
    .then(() => {
      res.json("Expence Added");
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/").get((req, res) => {
  if (req.headers.ruid) {
    var q = { uid: req.headers.ruid.toString() };
    console.log("headerFound : ", q);
    Expence.find(q)
      .then((expences) => {
        res.json(expences);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    Expence.find()
      .then((expences) => {
        res.json(expences);
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

router.route("/update/:id").put(async (req, res) => {
  let expenceID = req.params.id;
  const { name, designation, purpose, bank, amount, date } = req.body;

  console.log(req.body);

  Expence.findById(expenceID)
    .then(async (expence) => {
      const updateExpence = {
        name,
        designation,
        purpose,
        bank,
        amount,
        date,
        payslip: expence.payslip,
      };

      const update = await Expence.findByIdAndUpdate(expenceID, updateExpence)
        .then(() => {
          res.status(200).send({ status: "Expence details updated" });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send({ status: "Error, Update failed" });
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ status: "Error", error: err.message });
    });
});

router.route("/delete/:id").delete(async (req, res) => {
  let expenceID = req.params.id;

  await Expence.findByIdAndDelete(expenceID)
    .then(() => {
      res.status(200).send({ status: "Expence details deleted" });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({
        status: "Error, Failed to delete the expence",
        error: err.message,
      });
    });
});

router.route("/get/:id").get(async (req, res) => {
  let expenceID = req.params.id;
  Expence.findById(expencetID)
    .then((expence) => {
      res.status(200).send({ status: "success", expence });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ status: "Error", error: err.message });
    });
});

module.exports = router;
