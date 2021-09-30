import React from "react";

// Components
import Dashboard from "../../Components/Common/Dashboard";

import ListPayments from "../../Components/Finance/listPayments";

const Student = (props) => {
  return (
    <Dashboard
      config={[
        {
          name: "Payment",
          path: "payment",
          component: ListPayments,
          props: {
            type: "student",
          },
        }
      ]}
    />
  );
};

export default Student;
