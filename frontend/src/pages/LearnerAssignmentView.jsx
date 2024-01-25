import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import axios from "axios";
// TODO: Uncomment
// import Validate from "../components/Validate";
import "../css/AssignmentViews.css";

function LearnerAssignmentView() {
  const [assignment, setAssignment] = useState(null);
  const [githubUrl, setGithubUrl] = useState(null);
  const [branch, setBranch] = useState(null);
  const { id } = useParams(null);
  const token = localStorage.getItem("lmsusertoken");
  const userAuthority = localStorage.getItem("lmsuserauthorities");
  const cleanUserAuthority = userAuthority ? userAuthority.trim() : "";
  const authorityArray = cleanUserAuthority
    ? cleanUserAuthority.split(", ")
    : "";

  // Validate a user's access to a webpage
  // TODO: Uncomment
  // Validate(token, cleanUserAuthority);

  // automatically fetches and loads the assignment by ID
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/assignments/" + id,
          { headers: { Authorization: "Bearer " + token } }
        );
        console.log(response.data);
        setAssignment(response.data);
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

  // Handles loading of data fetching
  if (!assignment) {
    return <div>Loading...</div>;
  }

  // Submits an updated assignment
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      (!githubUrl && !branch) ||
      githubUrl == assignment.assignment.githubUrl ||
      branch == assignment.assignment.branch
    ) {
      alert("No changes detected");
    } else {
      try {
        const assignment = { githubUrl, branch };
        const response = await axios.put(
          "http://localhost:8080/api/assignments/" + id,
          assignment,
          { headers: { Authorization: "Bearer " + token } }
        );
        alert("Assignment updated !");
        window.location.reload();
      } catch (err) {
        if (!err) {
          console.error("No server response");
        } else {
          console.error(err);
          alert("Failed to update the assignment !");
        }
      }
    }
  };

  return (
    <>
      <div className="learnerview-container">
        <div className="submit-header">
          <h1>Assignment {assignment.assignment.number}</h1>
          <h2>{assignment.assignment.status}</h2>
        </div>
        <div className="nav">
          {/* TODO: fix this navbar situation */}
          <Nav>
            <NavDropdown title="Assignments">
              <NavDropdown.Item id="nav">List of assignments</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </div>
        <div className="assignmentlist"></div>
        <form className="form-create" onSubmit={handleSubmit}>
          <div className="form-container">
            <div className="form-create-box">
              <label htmlFor="githuburl">Github</label>
              <input
                id="githuburl"
                type="text"
                defaultValue={
                  githubUrl ? githubUrl : assignment.assignment.githubUrl
                }
                onChange={(e) => {
                  setGithubUrl(e.target.value);
                }}
                required
              />
            </div>
            <div className="form-create-box">
              <label htmlFor="branch">Branch</label>
              <input
                id="branch"
                type="text"
                defaultValue={branch ? branch : assignment.assignment.branch}
                onChange={(e) => {
                  setBranch(e.target.value);
                }}
                required
              />
            </div>
          </div>
          <div className="form-create-button">
            <button id="ref-button">Submit</button>
            <a id="redirect" href="/api/dashboard">
              dashboard
            </a>
          </div>
        </form>
      </div>
    </>
  );
}

export default LearnerAssignmentView;
