import React, { Component } from "react";
import { Link } from "react-router-dom";
// import '../App.css';
import axios from "axios";

class AddBook extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      isbn: "",
      author: "",
      description: "",
      published_date: "",
      publisher: "",
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const data = {
      title: this.state.title,
      isbn: this.state.isbn,
      author: this.state.author,
      description: this.state.description,
      published_date: this.state.published_date,
      publisher: this.state.publisher,
    };

    axios
      .post("http://localhost:6060/api/books", data)
      .then((res) => {
        this.setState({
          title: "",
          isbn: "",
          author: "",
          description: "",
          published_date: "",
          publisher: "",
        });
        alert("Book added succesfully")
      })
      .catch((err) => {
        console.log("Error in CreateBook!");
      });
  };

  render() {
    return (
      <div className="CreateBook">
        <div className="container mt-5">
          <div className="row">
            {/* <div className="col-md-8 m-auto">
              <br />
              <Link to="/" className="btn btn-outline-warning float-left">
                  Show BooK List
              </Link>
            </div> */}
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Add Book</h1>
              {/*  */}
              <hr />
              <p className="lead text-center mb-5">Create new book</p>

              <form noValidate onSubmit={this.onSubmit}>
                <div className="row">
                  <div className="form-group col-sm-12 mb-3">
                    <input
                      type="text"
                      placeholder="Title of the Book"
                      name="title"
                      className="form-control"
                      value={this.state.title}
                      onChange={this.onChange}
                    />
                  </div>
                  <br />

                  <div className="form-group col-sm-6 mb-3">
                    <input
                      type="text"
                      placeholder="ISBN"
                      name="isbn"
                      className="form-control"
                      value={this.state.isbn}
                      onChange={this.onChange}
                    />
                  </div>

                  <div className="form-group col-sm-6 mb-3">
                    <input
                      type="text"
                      placeholder="Author"
                      name="author"
                      className="form-control"
                      value={this.state.author}
                      onChange={this.onChange}
                    />
                  </div>

                  <div className="form-group col-sm-12 mb-3">
                    <input
                      type="text"
                      placeholder="Describe this book"
                      name="description"
                      className="form-control"
                      value={this.state.description}
                      onChange={this.onChange}
                    />
                  </div>

                  <div className="form-group col-sm-6 mb-3">
                    <input
                      type="date"
                      placeholder="published_date"
                      name="published_date"
                      className="form-control"
                      value={this.state.published_date}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group col-sm-6 mb-3">
                    <input
                      type="text"
                      placeholder="Publisher of this Book"
                      name="publisher"
                      className="form-control"
                      value={this.state.publisher}
                      onChange={this.onChange}
                    />
                  </div>

                  <input
                    type="submit"
                    className="btn btn-outline-warning btn-block mt-4"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddBook;
