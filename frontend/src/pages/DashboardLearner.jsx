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
      <div className="ldashboard-header">
        <h1>{user}'s Dashboard</h1>
        <h2>Welcome {user}</h2>
      </div>
      <div className="ldashboard-navbar">
        <a className="button" href="/api/submitassignment">
          Submit new assignment
        </a>
        {Logout()}
      </div>
      <hr className="separationline" />
      <div className="assignments-container">
        <div className="label-container">
          <label>Submitted</label>
        </div>
        <ul>
          {LearnerMapping(
            assignments.filter((item) => item.assignment.status === "Submitted")
          )}
        </ul>
        <hr className="separationline" />
        <div className="label-container">
          <label>In review</label>
        </div>
        <ul>
          {LearnerMapping(
            assignments.filter((item) => item.assignment.status === "In review")
          )}
        </ul>
        <hr className="separationline" />
        <div className="label-container">
          <label>Needs work</label>
        </div>
        <ul>
          {LearnerMapping(
            assignments.filter(
              (item) => item.assignment.status === "Needs work"
            )
          )}
        </ul>
        <hr className="separationline" />
        <div className="label-container">
          <label>Completed</label>
        </div>
        <ul>
          {LearnerMapping(
            assignments.filter((item) => item.assignment.status === "Completed")
          )}
        </ul>
      </div>
    </>
  );
}

export default DashboardLearner;
