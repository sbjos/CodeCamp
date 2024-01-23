import { useState, useEffect } from "react";
import axios from "axios";
import AssignmentMapping from "../components/AssignmentMapping";
import Logout from "../components/Logout";
// import Validate from "../components/Validate";
import "../css/Dashboard.css";
import "../css/ScrollButton.css";

function DashboardLearner() {
  const [assignments, setAssignments] = useState([]);
  const authority = localStorage.getItem("lmsuserauthorities").split(", ");
  const user = authority[0];

  // TODO: Uncomment
  // Validate a user's access to a webpage
  // Validate(token);

  // automatically fetches and loads assignments by user
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("lmsusertoken");
        const response = await axios.get(
          "http://localhost:8080/api/assignments",
          {
            headers: { Authorization: "Bearer " + token },
          }
        );
        console.log("assignments", response);
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
        <label htmlFor="in review">In review</label>
        <ul className="card-container">
          {AssignmentMapping(
            assignments.filter(
              (item) => item.assignment.status === "In review"
            ),
            authority
          )}
        </ul>
        <label htmlFor="needs work">Needs work</label>
        <ul className="card-container">
          {AssignmentMapping(
            assignments.filter(
              (item) => item.assignment.status === "Needs work"
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

export default DashboardLearner;
