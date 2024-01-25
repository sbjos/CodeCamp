import { useState, useEffect } from "react";
import axios from "axios";
import LearnerMapping from "../components/LearnerMapping";
import Logout from "../components/Logout";
// TODO: Uncomment
// import Validate from "../components/Validate";
import "../css/Dashboard.css";
import "../css/ScrollButton.css";

function DashboardLearner() {
  const [assignments, setAssignments] = useState([]);
  const token = localStorage.getItem("lmsusertoken");
  const userAuthority = localStorage.getItem("lmsuserauthorities");
  const cleanUserAuthority = userAuthority ? userAuthority.trim() : "";
  const authorityArray = cleanUserAuthority
    ? cleanUserAuthority.split(", ")
    : "";
  const user = authorityArray[0];

  // Validate a user's access to a webpage
  // TODO: Uncomment
  // Validate(token, cleanUserAuthority);

  // automatically fetches and loads assignments by user
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/assignments",
          { headers: { Authorization: "Bearer " + token } }
        );
        console.log(response);
        setAssignments(response.data);
      } catch (err) {
        if (!err) {
          console.error("No server response");
        } else {
          console.error(err);
        }
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="dashboard-header">
        <h1>{user}'s Dashboard</h1>
        <h2>Welcome {user}...</h2>
      </div>
      <div className="option">
        <a id="redirect" href="/api/submitassignment">
          Submit new assignment
        </a>
        <div>
          <p>{Logout()}</p>
        </div>
      </div>
      <hr className="separationline" />
      <div className="assignment">
        <label htmlFor="submitted">Submitted</label>
        <ul className="card-container">
          {LearnerMapping(
            assignments.filter((item) => item.assignment.status === "Submitted")
          )}
        </ul>
        <label htmlFor="in review">In review</label>
        <ul className="card-container">
          {LearnerMapping(
            assignments.filter((item) => item.assignment.status === "In review")
          )}
        </ul>
        <label htmlFor="needs work">Needs work</label>
        <ul className="card-container">
          {LearnerMapping(
            assignments.filter(
              (item) => item.assignment.status === "Needs work"
            )
          )}
        </ul>
        <label htmlFor="completed">Completed</label>
        <ul className="card-container">
          {LearnerMapping(
            assignments.filter((item) => item.assignment.status === "Completed")
          )}
        </ul>
      </div>
    </>
  );
}

export default DashboardLearner;
