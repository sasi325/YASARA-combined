import React from "react";

// Components
import Dashboard from "../../Components/Common/Dashboard";
import ListBooks from "../../Components/Library/ListBooks";
import AddBook from "../../Components/Library/AddBook";

const Library = (props) => {
  return (
    <Dashboard
      config={[
        {
          name: "Book List",
          path: "booklist",
          component: ListBooks,
          props: {
            type: "student",
          },
        },
        {
          name: "Add Book",
          path: "addbook",
          component: AddBook,
          props: {
            type: "student",
          },
        },
      ]}
    />
  );
};

export default Library;
