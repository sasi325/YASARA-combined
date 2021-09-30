const router = require("express").Router();
const { v4: uuidv4 } = require("uuid");
let multer = require("multer");
const Payment = require("../../models/finance/payment");

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
  console.log(req.file);
  // var file = req.files.payslip;
  const name = req.body.name;
  const uid = req.body.uid;
  const clas = req.body.clas;
  const perpose = req.body.perpose;
  const bank = req.body.bank;
  const amount = Number(req.body.amount);
  const date = Date(req.body.date);

  const newPayment = new Payment({
    name,
    uid,
    class: clas,
    perpose,
    bank,
    amount,
    date,
    payslip: req.file.filename,
  });

  newPayment
    .save()
    .then(() => {
      res.json("Payment Added");
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/").get((req, res) => {
  if (req.headers.ruid) {
    var q = { uid: req.headers.ruid.toString() };
    console.log("headerFound : ", q);
    Payment.find(q)
    .then((payments) => {
      res.json(payments);
    })
    .catch((err) => {
      console.log(err);
    });
    
  } else {
    Payment.find()
      .then((payments) => {
        res.json(payments);
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

router.route("/update/:id").put(async (req, res) => {
  let paymentID = req.params.id;
  const { name, clas, perpose, bank, amount, date } = req.body;

  console.log(req.body);

  Payment.findById(paymentID)
    .then(async (payment) => {
      const updatePayment = {
        name,
        class: clas,
        perpose,
        bank,
        amount,
        date,
        payslip: payment.payslip,
      };

      const update = await Payment.findByIdAndUpdate(paymentID, updatePayment)
        .then(() => {
          res.status(200).send({ status: "Payment details updated" });
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
  let paymentID = req.params.id;

  await Payment.findByIdAndDelete(paymentID)
    .then(() => {
      res.status(200).send({ status: "Payment details deleted" });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({
        status: "Error, Failed to delete the payment",
        error: err.message,
      });
    });
});

router.route("/get/:id").get(async (req, res) => {
  let paymentID = req.params.id;
  Payment.findById(paymentID)
    .then((payment) => {
      console.log(payment);
      res.status(200).send({ status: "success", payment });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ status: "Error", error: err.message });
    });
});

module.exports = router;
