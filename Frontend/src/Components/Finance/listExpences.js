import React, { useState, useEffect } from "react";
import axios from "axios";

import "./Styles/listPayments.css";

import ExpenceCard from "./ExpencesListCard";
import AddExpences from "./AddExpences";
import Cookies from "js-cookie";

const ListExpences = (props) => {
  const [ExpencesList, setExpencesList] = useState([]);

  // modal states
  const [OpenPaymentAddModal, setOpenPaymentAddModal] = useState(false);

  const FetchItems = () => {
    axios
      .get("http://localhost:8070/expences/", {
        headers: { ruid: Cookies.get("UID") || 0 },
      })
      .then((resp) => {
        setExpencesList(resp.data);
      })
      .catch((err) => {
        setExpencesList([
          {
            id: "613a139eba3cf55460af1c3e",
            name: "sasi",
            class: "adad",
            perpose: "fee",
            bank: "boc",
            amount: 2432,
            payslip:
              "https://help.myob.com/wiki/download/attachments/17273963/Note%20on%20pay%20slip.jpg?version=1&modificationDate=1519266766000&api=v2",
            date: "2021-09-09T14:01:02.000Z",
            _v: 0,
          },
          {
            id: "613a139eba3cf55460af1c3e",
            name: "sasi",
            class: "adad",
            perpose: "fee",
            bank: "boc",
            amount: 2432,
            payslip:
              "https://help.myob.com/wiki/download/attachments/17273963/Note%20on%20pay%20slip.jpg?version=1&modificationDate=1519266766000&api=v2",
            date: "2021-09-09T14:01:02.000Z",
            _v: 0,
          },
          {
            id: "613a139eba3cf55460af1c3e",
            name: "sasi",
            class: "adad",
            perpose: "fee",
            bank: "boc",
            amount: 2432,
            payslip:
              "https://help.myob.com/wiki/download/attachments/17273963/Note%20on%20pay%20slip.jpg?version=1&modificationDate=1519266766000&api=v2",
            date: "2021-09-09T14:01:02.000Z",
            _v: 0,
          },
          {
            id: "613a139eba3cf55460af1c3e",
            name: "sasi",
            class: "adad",
            perpose: "fee",
            bank: "boc",
            amount: 2432,
            payslip:
              "https://help.myob.com/wiki/download/attachments/17273963/Note%20on%20pay%20slip.jpg?version=1&modificationDate=1519266766000&api=v2",
            date: "2021-09-09T14:01:02.000Z",
            _v: 0,
          },
        ]);
      });
  };

  useEffect(() => {
    FetchItems();
  }, []);

  return (
    <div className="container listPaymentsContainer">
      <h1>My Expences</h1>
      <hr />

      <div className="actionBar">
        <button onClick={() => setOpenPaymentAddModal(true)}>
          <i className="fas fa-money-bill-wave"></i> Add Expence
        </button>
      </div>

      {ExpencesList.map((data, i) => {
        return <ExpenceCard key={i * i} FetchItems={FetchItems} data={data} />;
      })}

      {/* Payment Add Modal */}
      <div
        className={
          OpenPaymentAddModal
            ? "payment_modal_wrapper open_modal"
            : "payment_modal_wrapper close_modal"
        }
      >
        <button
          className="closeBtn"
          onClick={() => setOpenPaymentAddModal(false)}
        >
          <i class="fas fa-times"></i>
        </button>
        <div className="payment_modal_container">
          <div className="payment_modal_content">
            <AddExpences
              onEnd={() => {
                setOpenPaymentAddModal(false);
                FetchItems();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListExpences;
