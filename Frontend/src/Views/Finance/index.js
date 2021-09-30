import React from "react";

// Components
import Dashboard from "../../Components/Common/Dashboard";
import EditPayments from "../../Components/Finance/EditPayments";
import EditExpences from "../../Components/Finance/EditExpences";

const Finance = (props) => {
  return (
    <Dashboard
      config={[
        {
          name: "Payment",
          path: "payment",
          component: EditPayments,
          props: {
            type: "finance",
          },
        },
        {
          name: "Expences",
          path: "expences",
          component: EditExpences,
          props: {
            type: "finance",
          },
        },
      ]}
    />
  );
};

export default Finance;
