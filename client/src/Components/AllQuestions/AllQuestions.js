import React, { Component } from "react";
import { deleteQuestion, getAllQuestions } from "../Dataservice/DataService";
import ShowError from "../ErrorComponent/ShowError";
import "./AllQuestion.css";
import { Link } from "react-router-dom";
import UpdateQA from "../UpdateQA/UpdateQA";
export default class AllQuestions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allrows: [],
      loading: true,
      gotError: false,
      isAboutVisible: false,
      text: "",
      editItem: {},
    };
  }
  async componentDidMount() {
    await getAllQuestions()
      .then((result) => {
        if (result.message) {
          console.log(result);
          this.setState({
            text: result.message,
          });
          this.setState({
            gotError: true,
          });
          this.setState({
            loading: false,
          });
        } else {
          console.log(result.data);
          this.setState({
            loading: false,
          });
          this.setState({
            allrows: result.data,
          });
        }
      })
      .catch((error) => {
        this.setState({
          text: "Nextwork Error",
        });
        this.setState({
          gotError: true,
        });
      });
  }
  handleDelete = (item) => {
    // e.preventDefault();
    let sendData = {
      id: item.id,
    };

    if (window.confirm("Are you sure you wish to delete this item?")) {
      deleteQuestion(sendData)
        .then((result) => {
          console.log(result.data);
          if (result.data.error) {
            alert(result.data.error);
          } else if (result.data.message) {
            console.log(result);
            alert(result.data.message);
            window.location.reload();
          }
        })
        .catch((error) => {
          this.setState({
            text: "Nextwork Error",
          });
          this.setState({
            gotError: true,
          });
        });
    }
  };
  render() {
    return (
      <div>
        {" "}
        <div className="container">
          {this.state.isAboutVisible ? (
            <UpdateQA
              qa={this.state.editItem}
              isVisible={this.state.isAboutVisible}
            />
          ) : (
            <div>
              <div className="row">
                <div className="col-md-12 offset-md-0 mt-5">
                  <div className="jumbotron">
                    <h1 className="display-4 text-left">Admin</h1>
                    <p className="lead font-italic text-left">
                      QUESTION - ANSWER TABLE
                    </p>
                    <hr className="my-4" />
                    <div className="row d-flex align-items-center justify-content-center">
                      <div className="col-md-6">
                        <Link to={"./unsatQ"}>
                          <button
                            type="button"
                            className="btn btn-dark col-md-12"
                          >
                            <span className="mr-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="currentColor"
                                className="bi bi-list"
                                viewBox="0 0 16 16"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                                />
                              </svg>
                            </span>
                            <span>List of unsatisfied questions</span>
                          </button>
                        </Link>
                      </div>
                      <div className="col-md-3">
                        <Link
                          to={"./addnew"}
                          className="btn btn-outline-success"
                        >
                          {/* <a href="/addnew" className="btn btn-outline-success"> */}
                          <i className="fas fa-plus"></i> Add New Question
                          {/* </a> */}
                        </Link>
                      </div>
                    </div>
                  </div>

                  {this.state.loading ? (
                    <div>Loading</div>
                  ) : (
                    <table className="table table-sm  table-responsive-sm table-borderless table-hover text-left">
                      <thead className="border-bottom font-weight-bold">
                        <tr>
                          <th>ID</th>
                          <th>Question</th>
                          <th>Answer</th>
                          <th>Viewed Count</th>
                          <th>Satisfied Count</th>
                          <th>Unsatisfied Count</th>
                          <th></th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.allrows.map((item, index) => (
                          <tr key={`tr${index}`}>
                            <td>{item.id}</td>
                            <td>{item.question}</td>
                            <td>{item.answer}</td>
                            <td>{item.viewed}</td>
                            <td>{item.satisfied}</td>
                            <td>{item.unsatisfied}</td>
                            <td>
                              <button
                                type="button"
                                onClick={() => {
                                  this.setState({ isAboutVisible: true });
                                  this.setState({
                                    editItem: item,
                                  });
                                }}
                                className="AllQuestion_button"
                              >
                                <i className="far fa-edit fa-lg"></i>
                              </button>
                            </td>
                            <td>
                              <button
                                type="button"
                                className="AllQuestion_button"
                                onClick={() => this.handleDelete(item)}
                              >
                                <i className="far fa-trash-alt fa-lg text-danger float-right"></i>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
              {this.state.gotError && !this.state.loading && (
                <ShowError text={this.state.text} />
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}
