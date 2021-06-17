import React, { Component } from "react";
import {
  addNewQA,
  addNewQueType,
  countUnsat,
  deleteQtype,
  getAllQueTypes,
} from "../Dataservice/DataService";
import ShowError from "../ErrorComponent/ShowError";
import "./NewQA.css";
export default class NewQA extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      gotError: false,
      errorText: "",
      questypes: [],
      question: "",
      answer: "",
      view: "0",
      satisfied: "0",
      unsatisfied: "0",
      queType: "",
      queTypeNew: "",
      countOfUnsat: [],
    };
  }
  async loadData() {
    await getAllQueTypes()
      .then((result) => {
        if (result.message) {
          console.log(result);
          this.setState({
            errorText: result.message,
          });
          this.setState({
            gotError: true,
          });
          this.setState({
            loading: false,
          });
        } else {
          this.setState({
            questypes: result.data,
          });
        }
      })
      .catch((error) => {
        this.setState({
          errorText: "Nextwork Error",
        });
        this.setState({
          gotError: true,
        });
      });
    await countUnsat()
      .then((result) => {
        if (result.message) {
          console.log(result);
          this.setState({
            errorText: result.message,
          });
          this.setState({
            gotError: true,
          });
          this.setState({
            loading: false,
          });
        } else {
          this.setState({
            countOfUnsat: result.data,
          });
        }
      })
      .catch((error) => {
        this.setState({
          errorText: "Nextwork Error",
        });
        this.setState({
          gotError: true,
        });
      });
  }
  componentDidMount() {
    this.loadData();
  }
  handleChange = (event) => {
    event.preventDefault();
    // let key = event.target.name;
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    // console.log(this.state);
    var formData = new FormData(e.target);
    const data = {};
    data["question"] = formData.get("question") || this.state.question;
    data["answer"] = formData.get("answer") || this.state.answer;
    data["queType"] = formData.get("queType") || this.state.queType;
    data["view"] = formData.get("view") || this.state.view;
    data["satisfied"] = formData.get("satisfied") || this.state.satisfied;
    data["unsatisfied"] = formData.get("unsatisfied") || this.state.unsatisfied;
    console.log(data);
    addNewQA(data)
      .then((result) => {
        console.log(result.data);
        if (result.data.error) {
          alert(result.data.error);
        } else if (result.data.message) {
          console.log(result);
          alert(result.data.message);
          setTimeout(() => {
            this.loadData();
            e.target.reset();
          }, 2000);
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
  };
  handleDeleteQtype = (item) => {
    if (window.confirm("Are you sure you wish to delete this item?")) {
      deleteQtype(item)
        .then((result) => {
          console.log(result.data);
          if (result.data.error) {
            alert(result.data.error);
          } else if (result.data.message) {
            console.log(result);
            alert(result.data.message);
            this.loadData();
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
  handleSubmitQueType = (e) => {
    e.preventDefault();
    var formData = new FormData(e.target);
    const data = {};
    data["queTypeNew"] = formData.get("queTypeNew") || this.state.queTypeNew;
    addNewQueType(data)
      .then((result) => {
        console.log(result.data);
        if (result.data.error) {
          alert(result.data.error);
        } else if (result.data.message) {
          console.log(result);
          alert(result.data.message);
          setTimeout(() => {
            this.loadData();
            e.target.reset();
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
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 offset-md-0 mt-5">
            <div className="jumbotron pb-4  ">
              <h1 className="display-4 text-left">Admin</h1>
              <p className="lead font-italic text-left">
                QUESTION - ANSWER TABLE
              </p>
              <hr className="my-4" />
              <div className="row">
                <div className="col-6">
                  <h4>Add new question answer</h4>
                </div>
                <div className="col-6 d-flex justify-content-end align-items-end">
                  <a href="/">
                    <button type="button" className="btn btn-light">
                      GO BACK
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          {this.state.gotError && !this.state.loading && (
            <ShowError text={this.state.errorText} />
          )}
        </div>
        <div className="row d-flex justify-content-center text-left ">
          <div className="col-md-11 col-12 NewQA_Row mb-5">
            {this.state.loading ? (
              <div>
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label className="" htmlFor="question">
                      Question*
                      <p className="m-0 p-0">
                        <small>Cannot contain ' or "</small>
                      </p>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="question"
                      name="question"
                      onChange={this.handleChange}
                      required
                      aria-describedby="question"
                      placeholder="Enter Question"
                    />
                  </div>
                  <div className="form-group">
                    <label className="" htmlFor="question">
                      Answer*
                      <p className="m-0 p-0">
                        <small>Cannot contain ' or "</small>
                      </p>
                    </label>
                    <textarea
                      type="text"
                      required
                      className="form-control"
                      onChange={this.handleChange}
                      id="answer"
                      name="answer"
                      aria-describedby="answer"
                      placeholder="Enter Answer"
                    />
                  </div>
                  <div className="form-group">
                    <label className="" htmlFor="question">
                      Viewed Count (default zero)
                    </label>
                    <input
                      type="number"
                      min="0"
                      required
                      className="form-control"
                      onChange={this.handleChange}
                      id="view"
                      name="view"
                      aria-describedby="view"
                      defaultValue="0"
                      placeholder="Enter Viewed Count"
                    />
                  </div>
                  <div className="form-group">
                    <label className="" htmlFor="question">
                      Unsatisfied Count (default zero)
                    </label>
                    <input
                      type="number"
                      min="0"
                      required
                      className="form-control"
                      id="unsatisfied"
                      onChange={this.handleChange}
                      name="unsatisfied"
                      defaultValue="0"
                      aria-describedby="unsatisfied"
                      placeholder="Enter Unsatisfied Count"
                    />
                  </div>
                  <div className="form-group">
                    <label className="" htmlFor="question">
                      Satisfied Count (default zero)
                    </label>
                    <input
                      type="number"
                      min="0"
                      defaultValue="0"
                      className="form-control"
                      id="satisfied"
                      name="satisfied"
                      onChange={this.handleChange}
                      required
                      aria-describedby="satisfied"
                      placeholder="Enter Satisfied Count"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="queType">Example select</label>
                    <p className="p-0 m-0">
                      <small>
                        If you do not find question type add a new one.
                      </small>
                    </p>
                    <select
                      required
                      className="form-control"
                      name="queType"
                      onChange={this.handleChange}
                      id="queType"
                    >
                      <option value="" selected disabled>
                        Select Question Type
                      </option>
                      {this.state.questypes.map((item, index) => (
                        <option key={item.id} value={item.typename}>
                          {item.typename}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button type="submit" className="btn btn-success col-5">
                    <i class="fas fa-database"></i> Submit
                  </button>
                  <a href="/">
                    <button type="button" className="btn btn-light ml-5 col-3">
                      Cancel/Back
                    </button>
                  </a>
                </form>
                <hr className="NewQA_hr" />
                <h5>Current question types</h5>
                <small style={{ color: "red" }}>
                  Deleting question type will delete related questions from
                  database
                </small>
                <table className="table  table-sm  table-responsive-sm table-borderless table-hover text-left">
                  <thead className="border-bottom font-weight-bold">
                    <tr>
                      <th>Question Type</th>
                      <th>Count of question in database</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.countOfUnsat.map((item, index) => (
                      <tr key={`tr${index}`}>
                        <td>{item.typename}</td>
                        <td>{item.count}</td>{" "}
                        <td>
                          <button
                            type="button"
                            className="AllQuestion_button"
                            onClick={() => this.handleDeleteQtype(item)}
                          >
                            <i className="far fa-trash-alt fa-lg text-danger float-right"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <hr className="NewQA_hr" />

                <h5>Add new question type</h5>
                <form onSubmit={this.handleSubmitQueType}>
                  <div className="form-group">
                    <label className="" htmlFor="questionType">
                      Question Type
                      <p className="m-0 p-0">
                        <small>Cannot contain ' or "</small>
                      </p>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="queTypeNew"
                      name="queTypeNew"
                      onChange={this.handleChange}
                      required
                      aria-describedby="questionType"
                      placeholder="Enter Question Type"
                    />
                  </div>
                  <button type="sumbit" className="btn btn-success ">
                    ADD
                  </button>
                </form>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
