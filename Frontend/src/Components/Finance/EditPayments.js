import React, { useState, useEffect } from "react";
import axios from "axios";

import "./Styles/listPayments.css";

import PaymentCard from "./PaymentEditCard";
import AddPayment from "./AddPayment";
import EditPaymentModal from "./EditPaymentModal";

const ListPayments = (props) => {
  const [PaymentsList, setPaymentsList] = useState([]);

  // modal states
  const [OpenPaymentAddModal, setOpenPaymentAddModal] = useState(false);
  const [OpenPaymentEditModal, setOpenPaymentEditModal] = useState(false);
  const [EditItem, setEditItem] = useState(null);

  const FetchItems = () => {
    axios
      .get("http://localhost:6060/payment/")
      .then((resp) => {
        setPaymentsList(resp.data);
      })
      .catch((err) => {
        setPaymentsList([
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
      <h1>All Payments</h1>
      <hr />

      <div className="actionBar">
        <button onClick={() => setOpenPaymentAddModal(true)}>
          <i className="fas fa-money-bill-wave"></i> Add Payment
        </button>
      </div>

      {PaymentsList.map((data) => {
        return (
          <PaymentCard
            editItem={() => {
              setEditItem(data)
              setOpenPaymentEditModal(true);
            }}
            FetchItems={FetchItems}
            data={data}
          />
        );
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
            <AddPayment
              onEnd={() => {
                setOpenPaymentAddModal(false);
                FetchItems();
              }}
            />
          </div>
        </div>
      </div>

      {/* Payment Edit Modal */}
      <div
        className={
          OpenPaymentEditModal
            ? "payment_modal_wrapper open_modal"
            : "payment_modal_wrapper close_modal"
        }
      >
        <button
          className="closeBtn"
          onClick={() => setOpenPaymentEditModal(false)}
        >
          <i class="fas fa-times"></i>
        </button>
        <div className="payment_modal_container">
          <div className="payment_modal_content">
            <EditPaymentModal
              EditItem={EditItem}
              onEnd={() => {
                setOpenPaymentEditModal(false);
                FetchItems();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListPayments;
