import React, { Component } from "react";
import { Link } from "react-router-dom";
import { editQA } from "../Dataservice/DataService";

export default class UpdateQA extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      gotError: false,
      errorText: "",
      qa: this.props.qa,
      questionNew: "",
      answerNew: "",
      isShow: this.props.isVisible,
    };
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
    data["questionNew"] = formData.get("questionNew") || this.state.qa.question;
    data["answerNew"] = formData.get("answerNew") || this.state.qa.answer;
    data["qid"] = this.state.qa.id;
    console.log(data);
    editQA(data)
      .then((result) => {
        console.log(result.data);
        if (result.data.error) {
          alert(result.data.error);
        } else if (result.data.message) {
          console.log(result);
          alert(result.data.message);
          setTimeout(() => {
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
    // window.location.reload();
  };
  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-12 offset-md-0 mt-5">
              <div className="jumbotron">
                <h1 className="display-4 text-left">Admin</h1>
                <p className="lead font-italic text-left">
                  Update QUESTION - ANSWER
                </p>
                <hr className="my-4" />
              </div>
              <div className="row d-flex justify-content-center text-left ">
                <div className="col-md-11 col-12 NewQA_Row mb-5">
                  <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                      <label className="" htmlFor="question">
                        Question*
                      </label>
                      <input
                        type="text"
                        placeholder={this.state.qa.question}
                        className="form-control"
                        id="questionNew"
                        name="questionNew"
                        onChange={this.handleChange}
                        aria-describedby="question"
                      />
                    </div>
                    <div className="form-group">
                      <label className="" htmlFor="question">
                        Answer*
                      </label>
                      <textarea
                        type="text"
                        placeholder={this.state.qa.answer}
                        className="form-control"
                        onChange={this.handleChange}
                        id="answerNew"
                        name="answerNew"
                        aria-describedby="answer"
                      />
                    </div>
                    <button type="submit" className="btn btn-success col-5">
                      <i class="fas fa-database"></i> Submit
                    </button>
                    <a href="/">
                      <button
                        type="button"
                        className="btn btn-light ml-5 col-3"
                      >
                        Cancel/Back
                      </button>
                    </a>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
