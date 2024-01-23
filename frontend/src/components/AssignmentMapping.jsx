function AssignmentMapping(assignments, authority) {
  // Filters the assignment by authority to map to relevant dashboard
  function userType(item) {
    if (authority[1] === "[REVIEWER]") {
      return <p>user: {item.assignment.user.username}</p>;
    } else {
      <div>No assignments</div>;
    }
    if (authority[1] === "[LEARNER]") {
      return (
        <p>
          Reviewer:{" "}
          {item.assignment.codeReviewer
            ? item.assignment.codeReviewer.username
            : "Not assigned"}
        </p>
      );
    } else {
      <div>No assignments</div>;
    }
  }

  // If assignment status is completed, will chage the edit button to a view button for reviewer review
  function viewedit(assignmentItem) {
    const assignments = assignmentItem.assignment.status;
    const video = assignmentItem.assignment.reviewVideoUrl;
    const id = assignmentItem.assignment.id;
    if (assignments !== "Completed") {
      return (
        <a id="redirect" href={"/api/assignment/" + id}>
          Edit
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
          <div>{userType(assignmentItem)}</div>
          <div className="assignment-button">{viewedit(assignmentItem)}</div>
        </li>
      ))}
    </>
  );
}

export default AssignmentMapping;
