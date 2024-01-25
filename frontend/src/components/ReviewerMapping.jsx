import axios from "axios";

function ReviewerMapping(assignments, token) {
  // Sets the button based on the assignment status. Also submits a form to claim an assignment.
  function button(assignmentItem) {
    const assignmentStatus = assignmentItem.assignment.status;
    const video = assignmentItem.assignment.reviewVideoUrl;
    const id = assignmentItem.assignment.id;
    const codeReviewer = assignmentItem.assignment.codeReviewer;
    const user = assignmentItem.assignment.user;

    // Form submition for claiming an assignment.
    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        const status = "In review";
        const assignment = { codeReviewer, status, user };
        const response = await axios.put(
          "http://localhost:8080/api/assignments/" + id,
          assignment,
          { headers: { Authorization: "Bearer " + token } }
        );
        console.log(response);
        alert("Assignment claimed successfully !");
        window.location.reload();
      } catch (err) {
        if (!err) {
          console.error("No server response");
        } else {
          console.error(err);
          alert("Failed to claim the assignment !");
        }
      }
    };

    // Button config based in assignment status.
    if (assignmentStatus === "Submitted") {
      return (
        <form className="form-claim" onSubmit={handleSubmit}>
          <button>Claim</button>
        </form>
      );
    } else {
      return (
        <a id="redirect" href={"/api/reviewer/assignment/" + id}>
          View
        </a>
      );
    }
  }

  return (
    <>
      {assignments.map((assignmentItem) => (
        <li id="dashboard-cards" key={assignmentItem.assignment.id}>
          <div>
            <p>Number: {assignmentItem.assignment.number}</p>
          </div>
          <div>
            <a href={assignmentItem.assignment.githubUrl} target="blank">
              Github
            </a>
          </div>
          <div>
            <a href={assignmentItem.assignment.branch} target="blank">
              Branch
            </a>
          </div>
          <div></div>
          <div className="assignment-button">{button(assignmentItem)}</div>
        </li>
      ))}
    </>
  );
}

export default ReviewerMapping;
