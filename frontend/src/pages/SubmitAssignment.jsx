import { useState } from "react";
import axios from "axios";
import "../css/CreateAssignment.css";
// TODO: Uncomment
// import Validate from "../components/Validate";

function SubmitAssignment() {
  const [number, setNumber] = useState(null);
  const [githubUrl, setGithubUrl] = useState(null);
  const [branch, setBranch] = useState(null);
  const token = localStorage.getItem("lmsusertoken");
  const userAuthority = localStorage.getItem("lmsuserauthorities");
  const cleanUserAuthority = userAuthority ? userAuthority.trim() : "";
  const authorityArray = cleanUserAuthority
    ? cleanUserAuthority.split(", ")
    : "";
  const user = authorityArray[0];

  // TODO: Uncomment
  // Validate a user's access to a webpage
  // Validate(token, cleanUserAuthority);

  // submits a new assignment
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const assignment = { number, githubUrl, branch };
      const response = await axios.post(
        "http://localhost:8080/api/assignments",
        assignment,
        { headers: { Authorization: "Bearer " + token } }
      );
      // TEST: for testing
      console.log(response.status);
      alert("Assignment submitted !");
      window.location.reload();
    } catch (err) {
      if (!err) {
        console.error("No Server Response");
      } else {
        console.error(err);
        alert("Failed to submit the assignment !");
      }
    }
  };

  return (
    <>
      <div className="create-container">
        <div className="submit-header">
          <h1>Create a new assignment</h1>
        </div>
        <div className="option">
          <a id="redirect" href="/api/dashboard">
            Return to dashboard
          </a>
        </div>
        <form className="form-create" onSubmit={handleSubmit}>
          <div className="form-container">
            <div className="form-create-box">
              <label htmlFor="number">Assignment number</label>
              <input
                id="number"
                type="number"
                inputMode="numeric"
                value={number}
                onChange={(e) => {
                  setNumber(e.target.value);
                }}
                required
              />
            </div>
            <div className="form-create-box">
              <label htmlFor="githuburl">Github</label>
              <input
                id="githuburl"
                type="text"
                value={githubUrl}
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
                value={branch}
                onChange={(e) => {
                  setBranch(e.target.value);
                }}
                required
              />
            </div>
          </div>
          <div className="form-create-button">
            <button>Submit assignment</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default SubmitAssignment;
