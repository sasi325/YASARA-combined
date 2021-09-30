import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default function AddPayment(props) {
  function sendData(e) {
    e.preventDefault();

    // get all values to variable
    const newPayment = {
      uid: Cookies.get("UID") || 0,
      name: e.target.name.value,
      //   clas: e.target.clas.value,
      clas: Cookies.get("type") || "N/A",
      perpose: e.target.perpose.value,
      bank: e.target.bank.value,
      amount: e.target.amount.value,
      date: e.target.date.value,
    };

    // form data object for send to API
    var ReqBody = new FormData();

    // add all daata in new payment variable to formsata object
    Object.keys(newPayment).map((key) => {
      ReqBody.append(key, newPayment[key]);
    });

    // add file to formdata
    ReqBody.append("payslip", e.target.payslip.files[0]);

    console.log("json : ", newPayment);
    console.log("Form data : ", ReqBody);

    axios
      .post("http://localhost:6060/payment/add", ReqBody)
      .then(() => {
        alert("Payment Added");
        props.onEnd();
        e.target.reset();
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div className="container">
      <h1>Add Payment</h1>
      <form onSubmit={sendData}>
        <div className="container row addPaymentForm">
          <div className="mt-3 mb-1 col-sm-6 col-lg-4">
            <div class="form-group">
              <label for="name">Name</label>
              <input
                requird
                type="text"
                class="form-control"
                id="name"
                name="name"
                defaultValue={Cookies.get("name")}
                placeholder="Enter Full Name"
              />
            </div>
          </div>
          {/* <div className="mt-3 mb-1 col-sm-6 col-lg-4">
            <div class="form-group">
              <label for="clas">Student's Class</label>
              <select
                class="form-control"
                id="clas"
                name="clas"
                placeholder="Enter Class"
              >
                <option value="" disabled selected>
                  Select Your Class
                </option>
                <option value="Com.Maths">Com.Maths</option>
                <option value="Biology">Biology</option>
                <option value="Commerce">Commerce</option>
                <option value="Arts">Arts</option>
              </select>
            </div>
          </div> */}
          <div className="mt-3 mb-1 col-sm-6 col-lg-8">
            <div class="form-group">
              <label for="perpose">Purpose</label>
              <select
                class="form-control"
                id="perpose"
                name="perpose"
                placeholder="Enter perpose for the payment"
              >
                <option value="" disabled selected>
                  Select Perpose For Payment
                </option>
                <option value="Admission fee">Admission fee</option>
                <option value="Tution fee">Tution fee</option>
                <option value="Exam fee">Exam fee</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          <div className="mt-3 mb-1 col-sm-6 col-lg-4">
            <div class="form-group">
              <label for="bank">Bank Name</label>
              <select
                class="form-control"
                id="bank"
                name="bank"
                placeholder="Enter Bank Name"
              >
                <option value="" disabled selected>
                  Select Bank Name
                </option>
                <option value="BOC">BOC</option>
                <option value="Sampath Bank">Sampath Bank</option>
                <option value="NTB">NTB</option>
                <option value="Commercial Bank">Commercial Bank</option>
                <option value="People's Bank">People's Bank</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          <div className="mt-3 mb-1 col-sm-6 col-lg-4">
            <div class="form-group">
              <label for="amount">Amount</label>
              <input
                requird
                type="Number"
                class="form-control"
                id="amount"
                name="amount"
                placeholder="Enter Payment Amount"
              />
            </div>
          </div>
          <div className="mt-3 mb-1 col-sm-6 col-lg-4">
            <div class="form-group">
              <label for="date">Date</label>
              <input
                requird
                type="date"
                class="form-control"
                id="date"
                name="date"
                placeholder="Enter Date"
              />
            </div>
          </div>
          <div className="mt-3 mb-4 col-sm-12 col-lg-12">
            <div class="form-group">
              <label for="date">pay slip</label>
              <input
                requird
                type="file"
                class="form-control"
                id="payslip"
                name="payslip"
                placeholder="Upload your payment slip"
              />
            </div>
          </div>
          <div className="mt-3 mb-1 col-sm-12 col-lg-12">
            <button type="submit" class="btn dubmitButton">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
