import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import "./stylebox.css";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Breadcrumb from "../common/breadcrumb";
import { toast } from "react-toastify";

class Issues extends Component {
  constructor() {
    super();
    this.state = {
      problems: [],
      issuesData: [],
      validation: false,
    };
  }
  async componentDidMount() {
    let data = JSON.parse(localStorage.getItem("SelectedIssues") || {});
    await this.setState({
      issuesData: data.issues || [],
      problems: data.problems || [],
    });
  }
  handleChecked = (e, index) => {
    let { name, checked } = e.target;
    let problems = [];
    let issuesData = this.state.issuesData.map((m, i) => {
      if (i === index) {
        if (checked) {
          m.checked = true;
          problems.push(...this.state.problems, { issue: m.issue });
        } else {
          m.checked = false;
          problems = this.state.problems.filter((f) => f.issue !== m.issue);
        }
      }
      return m;
    });
    let obj = {
      issues: issuesData,
      problems: problems,
    };
    localStorage.setItem("SelectedIssues", JSON.stringify(obj));
    this.setState({
      issuesData,
      problems,
    });
  };

  handleSelection = () => {
    toast.error("please Select Any issue");
  };

  render() {
    let { colSize, hasMoreItems } = this.state;
    const { filters } = this.props;

    return (
      <div>
        {console.log("$$$$ issues State", this.state)}
        {/*SEO Support*/}
        <Helmet>
          <title>Shoop | Repair</title>
          <meta name="description" content="..." />
        </Helmet>
        {/*SEO Support End */}

        <Breadcrumb title={"Collection"} />

        <section className="section-b-space">
          <div className="collection-wrapper">
            <div className="container">
              <div className="row">
                <form
                  name="issue_form"
                  id="repair-desk-issue-form"
                  className="repair_desk_lead_form repair-desk-issue-form"
                  action="https://phonesurgeryonline.co.uk/select-delivery-method/"
                  method="POST"
                >
                  {this.state.issuesData.map((m, i) => {
                    return (
                      <div key={i} className="col-lg-3 col-md-4 col-sm-6">
                        <input
                          type="checkbox"
                          name="problem"
                          id={`problem${i}`}
                          checked={m.checked}
                          onChange={(e) => this.handleChecked(e, i)}
                        />
                        <label htmlFor={`problem${i}`}>
                          <div className="issue-placeholder">
                            <img src={m.pictures} />
                          </div>
                          <div className="issue-details">
                            <div className="issuename">{m.issues}</div>
                            <div className="issueprice">
                              <span className="woocommerce-Price-amount amount">
                                <bdi>
                                  {/* <span className="woocommerce-Price-currencySymbol">
                                            £
                                          </span> */}
                                  {m.charges}
                                </bdi>
                              </span>
                            </div>
                          </div>
                        </label>
                      </div>
                    );
                  })}
                </form>
              </div>
              <div className="row justify-content-center">
                <div className="btuun">
                  {this.state.problems && this.state.problems.length > 0 ? (
                    <Link to={`${process.env.PUBLIC_URL}/date`}>
                      <button
                        type="button"
                        class="btn btn-outline-danger"
                        id="btton"
                      >
                        Next
                      </button>
                    </Link>
                  ) : (
                    <div onClick={this.handleSelection}>
                      <button
                        type="button"
                        class="btn btn-outline-danger"
                        id="btton"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({});
export default connect(
  mapStateToProps,
  {}
)(Issues);
