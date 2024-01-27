import { useState } from "react";
import axios from "axios";
import "../css/SubmitAssignment.css";
// TODO: Uncomment
// import Validate from "../components/Validate";

function SubmitAssignment() {
  const [githubUrl, setGithubUrl] = useState("");
  const [branch, setBranch] = useState("");
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

  // creates a new assignment
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const assignment = { githubUrl, branch };
      const response = await axios.post(
        "http://localhost:8080/api/assignments",
        assignment,
        { headers: { Authorization: "Bearer " + token } }
      );
      // TEST: for testing
      console.log(response.status);
      alert("Assignment created !");
      window.location.reload();
    } catch (err) {
      if (!err) {
        console.error("No Server Response");
      } else {
        console.error(err);
        alert("Failed to create the assignment !");
      }
    }
  };

  return (
    <>
      <div className="create-header">
        <h1>Submit a new assignment</h1>
      </div>
      <div className="burger">
        <form className="form-create" onSubmit={handleSubmit}>
          <div className="form-create-github">
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
          <div className="form-create-branch">
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
          <div className="form-create-button">
            <button>Submit</button>
            <a className="button" href="/api/dashboard">
              dashboard
            </a>
          </div>
        </form>
      </div>
    </>
  );
}

export default SubmitAssignment;
