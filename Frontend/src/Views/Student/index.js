import React from "react";

// Components
import Dashboard from "../../Components/Common/Dashboard";

import ListPayments from "../../Components/Finance/listPayments";
import ListExpences from "../../Components/Finance/listExpences";
import ListBooks from "../../Components/Library/ListBooks";

const Student = (props) => {
  return (
    <Dashboard
      config={[
        {
          name: "Library",
          path: "library",
          component: ListBooks,
          props: {
            type: "student",
          },
        },
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
