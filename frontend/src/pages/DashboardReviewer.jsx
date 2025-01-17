import { useState, useEffect } from "react";
import axios from "axios";
import ReviewerMapping from "../components/ReviewerMapping";
import Logout from "../components/Logout";
import Validate from "../components/Validate";
import "../css/Dashboard.css";
import "../css/ScrollButton.css";

function DashboardReviewer() {
  const [assignments, setAssignments] = useState([]);
  const token = localStorage.getItem("lmsusertoken");
  const userAuthority = localStorage.getItem("lmsuserauthorities");
  const cleanUserAuthority = userAuthority ? userAuthority.trim() : "";
  const authorityArray = cleanUserAuthority
    ? cleanUserAuthority.split(", ")
    : "";
  const user = authorityArray[0];

  // Validate a user's access to a webpage
  Validate(token, cleanUserAuthority);

  // automatically fetches and loads all assignments
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("lmsusertoken");
        const response = await axios.get(
          "http://localhost:8080/api/assignments",
          { headers: { Authorization: "Bearer " + token } }
        );
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
      </div>
      <div className="dashboard-navbar">
        <p>{Logout()}</p>
      </div>
      <hr className="separationline" />
      <div className="assignments-container">
        <div className="label-container">
          <label htmlFor="Submitted">Submitted</label>
        </div>
        <ul className="card-container">
          {ReviewerMapping(
            assignments.filter(
              (item) => item.assignment.status === "Submitted"
            ),
            token
          )}
        </ul>
        <hr className="separationline" />
        <div className="label-container">
          <label htmlFor="in review">In review</label>
        </div>
        <ul className="card-container">
          {ReviewerMapping(
            assignments.filter(
              (item) =>
                item.assignment.status === "In review" &&
                item.assignment.codeReviewer.username == user
            ),
            token
          )}
        </ul>
        <hr className="separationline" />
        <div className="label-container">
          <label htmlFor="completed">Completed</label>
        </div>
        <ul className="card-container">
          {ReviewerMapping(
            assignments.filter(
              (item) =>
                item.assignment.status === "Completed" &&
                item.assignment.codeReviewer.username == user
            ),
            token
          )}
        </ul>
      </div>
    </>
  );
}

export default DashboardReviewer;
