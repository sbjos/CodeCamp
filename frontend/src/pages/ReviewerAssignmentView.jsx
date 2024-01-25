import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// TODO: Uncomment
// import Validate from "../components/Validate";

function ReviewerAssignmentView() {
  const [assignment, setAssignment] = useState("");
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

        <div className="form-container">
          <div className="form-create-box">
            <label htmlFor="githuburl">Github</label>
            <input
              id="githuburl"
              // type="text"
              placeholder={assignment.assignment.githubUrl}
              disabled
            />
          </div>
          <div className="form-create-box">
            <label htmlFor="branch">Branch</label>
            <input
              id="branch"
              type="text"
              placeholder={assignment.assignment.branch}
              disabled
            />
          </div>
        </div>
        <form className="form-create" onSubmit={handleSubmit}>
          <div className="form-create-box">
            <label htmlFor="review video url">Review video</label>
            <input
              id="branch"
              type="text"
              defaultValue={assignment.assignment.reviewVideoUrl}
              // onChange={}
            />
          </div>
          <div className="form-create-button">
            <button id="ref-button">Submit</button>
            <button id="ref-button">Reject</button>
            <a id="redirect" href="/api/reviewer/dashboard">
              dashboard
            </a>
          </div>
        </form>
        <div></div>
      </div>
    </>
  );
}

export default ReviewerAssignmentView;
