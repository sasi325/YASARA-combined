import React, { useState, useEffect } from "react";
import axios from "axios";

import "./Styles/listPayments.css";

import ExpencesCard from "./ExpencesEditCard";
import AddExpences from "./AddExpences";
import EditExpencesModal from "./EditExpencesModal";

const EditExpences = (props) => {
  const [PaymentsList, setPaymentsList] = useState([]);

  // modal states
  const [OpenPaymentAddModal, setOpenPaymentAddModal] = useState(false);
  const [OpenPaymentEditModal, setOpenPaymentEditModal] = useState(false);
  const [EditItem, setEditItem] = useState(null);

  const FetchItems = () => {
    axios
      .get("http://localhost:8070/expences/")
      .then((resp) => {
        setPaymentsList(resp.data);
      })
      .catch((err) => {
        setPaymentsList([]);
      });
  };

  useEffect(() => {
    FetchItems();
  }, []);

  return (
    <div className="container listPaymentsContainer">
      <h1>All Expences</h1>
      <hr />

      <div className="actionBar">
        <button onClick={() => setOpenPaymentAddModal(true)}>
          <i className="fas fa-money-bill-wave"></i> Add Expence
        </button>
      </div>

      {PaymentsList.map((data) => {
        return (
          <ExpencesCard
            editItem={() => {
              setEditItem(data);
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
            <AddExpences
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
            <EditExpencesModal
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

export default EditExpences;
