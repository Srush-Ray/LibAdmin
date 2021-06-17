import React, { Component } from "react";
import "./UnsatQ.css";
import {
  delete_Unsat_Question,
  getUnsatisfiedQuestions,
} from "../Dataservice/DataService";
import ShowError from "../ErrorComponent/ShowError";

export default class UnsatQ extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allrows: [],
      loading: true,
      gotError: false,
      text: "",
    };
  }
  async loadData() {
    await getUnsatisfiedQuestions()
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
  componentDidMount() {
    this.loadData();
  }

  handleDelete = (item) => {
    // e.preventDefault();
    let sendData = {
      id: item.id,
    };
    if (window.confirm("Are you sure you wish to delete this item?")) {
      delete_Unsat_Question(sendData)
        .then((result) => {
          console.log(result.data);
          if (result.data.error) {
            alert(result.data.error);
          } else if (result.data.message) {
            console.log(result);
            alert(result.data.message);
            setTimeout(() => {
              this.loadData();
            }, 1500);
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
      // window.location.reload();
    }
  };

  render() {
    return (
      <div>
        <div>
          {" "}
          <div className="container">
            <div className="row">
              <div className="col-md-12 offset-md-0 mt-5">
                <div className="jumbotron">
                  <h1 className="display-4 text-left">Admin</h1>
                  <p className="lead font-italic text-left">
                    UNSATISFIED QUESTION - ANSWER TABLE
                  </p>
                  <hr className="my-4" />
                  <div className="row d-flex align-items-center justify-content-center">
                    <div className="col-md-6">
                      <a href="/">
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
                          <span>List of all questions</span>
                        </button>
                      </a>
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
                        <th>AnswerID</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.allrows.map((item, index) => (
                        <tr key={`tr${index}`}>
                          <td>{item.id}</td>
                          <td>{item.question}</td>
                          <td>{item.qid}</td>
                          <td>
                            <button
                              type="button"
                              className="UnsatQ_button"
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
        </div>
      </div>
    );
  }
}
