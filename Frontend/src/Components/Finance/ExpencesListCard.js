import React, { useState, useEffect } from "react";
import axios from "axios";

import "./Styles/PaymentListCard.css";

const PaymentCard = (props) => {
  const [ShowImage, setShowImage] = useState(false);

  const DeleteItem = () => {
    axios
      .delete("http://localhost:8070/expences/delete/" + props.data._id)
      .then(() => {
        alert("Payment Deleted");
        props.FetchItems();
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div className="paymentCard">
      <div className="static">
        <div className="details">
          <p>
            <span className="title">Date : </span>
            <span className="data">
              {props.data.date ? props.data.date.split("T")[0] : ""}
            </span>
            <br />
            <span className="title">Bank : </span>
            <span className="data">{props.data.bank}</span>
            <br />
            <span className="title">Purpose : </span>
            <span className="data">{props.data.purpose}</span>
          </p>
        </div>
        <div className="details">
          <p>
            <span className="title">Name : </span>
            <span className="data">{props.data.name}</span>
            <br />
            <span className="title">Designation : </span>
            <span className="data">{props.data.designation}</span>
          </p>
        </div>

        <div className="amount">
          <h1>LKR {props.data.amount}</h1>
        </div>

        <div className="actions">
          <button
            onClick={() => {
              setShowImage((st) => {
                return !st;
              });
            }}
          >
            <i class="fas fa-image"></i>
          </button>
          {/* <button
            onClick={() => {
              window.location.href = `/payments/edit/${props.data._id}`;
            }}
          >
            <i class="fas fa-edit"></i>
          </button>
          <button onClick={DeleteItem}>
            <i class="fas fa-trash"></i>
          </button> */}
        </div>
      </div>

      <div
        className={ShowImage ? "dynamic openPaySlip" : "dynamic closePaySlip"}
      >
        <img src={"http://localhost:8070/public/" + props.data.payslip} alt="" srcset="" />
      </div>
    </div>
  );
};

export default PaymentCard;
