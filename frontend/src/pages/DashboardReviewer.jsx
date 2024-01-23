import { useState, useEffect } from "react";
import axios from "axios";
import AssignmentMapping from "../components/AssignmentMapping";
// import Validate from "../components/Validate";
import "../css/Dashboard.css";
import "../css/ScrollButton.css";

function DashboardReviewer() {
  const [assignments, setAssignments] = useState([]);
  const token = localStorage.getItem("lmsusertoken");
  const authority = localStorage.getItem("lmsuserauthorities").split(", ");
  const user = authority[0];

  // TODO: Uncomment
  // Validate a user's access to a webpage
  // Validate(token);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/assignments",
          { headers: { Authorization: "Bearer " + token } }
        );
        console.log(response.data);
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

  console.log("assignments", assignments);
  return (
    <>
      <div className="dashboard-header">
        <h1>{user}'s Dashboard</h1>
      </div>
      <div className="option">
        <a id="logout" href="logout">
          Logout
        </a>
      </div>
      <hr className="separationline" />
      <div className="assignment">
        <label htmlFor="in review">In review</label>
        <ul className="card-container">
          {AssignmentMapping(
            assignments.filter(
              (item) => item.assignment.status === "In review"
            ),
            authority
          )}
        </ul>
        <label htmlFor="Submitted">Submitted</label>
        <ul className="card-container">
          {AssignmentMapping(
            assignments.filter(
              (item) => item.assignment.status === "Submitted"
            ),
            authority
          )}
        </ul>
        <label htmlFor="completed">Completed</label>
        <ul className="card-container">
          {AssignmentMapping(
            assignments.filter(
              (item) => item.assignment.status === "Completed"
            ),
            authority
          )}
        </ul>
      </div>
    </>
  );
}

export default DashboardReviewer;
