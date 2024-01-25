import { useState } from "react";
// TODO: Uncomment
// import Validate from "../components/Validate";

function ReviewerAssignmentView() {
  const [number, setNumber] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [branch, setBranch] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
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

  return (
    <>
      <div className="learnerview-container">
        <div className="submit-header">
          <h1>Assignment number{}</h1>
        </div>
        <div className="option">
          <a id="ref-button" href="/api/dashboard/">
            Return to dashboard
          </a>
        </div>
        <form className="form-create">
          <div className="form-container">
            <div className="form-create-box">
              <label htmlFor="githuburl">Github url</label>
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
            <div className="form-create-box">
              <label htmlFor="videourl">Video</label>
              <input
                id="videourl"
                type="text"
                value={videoUrl}
                onChange={(e) => {
                  setVideoUrl(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="form-create-button">
            <button disabled={!number || !githubUrl || !branch ? true : false}>
              Submit assignment
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default ReviewerAssignmentView;
