import React from "react";

// Components
import Dashboard from "../../Components/Common/Dashboard";
import ListPayments from "../../Components/Finance/listPayments";
import ListExpences from "../../Components/Finance/listExpences";

const Shop = (props) => {
  return (
    <Dashboard
      config={[
        {
          name: "Payment",
          path: "payment",
          component: ListPayments,
          props: {
            type: "shop",
          },
        },
        {
          name: "Expences",
          path: "expences",
          component: ListExpences,
          props: {
            type: "shop",
          },
        },
      ]}
    />
  );
};

export default Shop;
