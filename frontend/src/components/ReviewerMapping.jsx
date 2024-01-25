import axios from "axios";

function ReviewerMapping(assignments, token) {
  // TEST:
  const user = assignments.map((item) => item.assignment.codeReviewer);
  console.log("user", user);

  // TEST:
  const id = assignments.map((item) => item.assignment.id);
  console.log("id", id);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const status = "In review";
      const id = assignments.map((item) => item.assignment.id);
      const user = assignments.map((item) => item.assignment.codeReviewer);
      // const assignment = {  };
      const response = await axios.put(
        "http://localhost:8080/api/assignments/" + id,
        user,
        status,
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

  function button(assignmentItem) {
    const assignmentStatus = assignmentItem.assignment.status;
    const video = assignmentItem.assignment.reviewVideoUrl;
    const id = assignmentItem.assignment.id;

    if (assignmentStatus === "Submitted") {
      return (
        <form className="form-claim" onSubmit={handleSubmit}>
          <button>Claim</button>
        </form>
      );
    } else if (assignmentStatus === "Needs review") {
      return (
        <a id="redirect" href={"/api/assignment/" + id}>
          View
        </a>
      );
    } else if (video === null) {
      return <h4>No review</h4>;
    } else {
      return (
        <a
          id="redirect"
          href={assignmentItem.assignment.reviewVideoUrl}
          target="blank"
        >
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
