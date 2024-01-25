function LearnerMapping(assignments) {
  // If assignment status is completed, a view button is added to access video review.
  function button(assignmentItem) {
    const assignmentStatus = assignmentItem.assignment.status;
    const video = assignmentItem.assignment.reviewVideoUrl;
    const id = assignmentItem.assignment.id;
    if (assignmentStatus !== "Completed") {
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
          <div>
            <p>
              Reviewer:{" "}
              {assignmentItem.assignment.codeReviewer
                ? assignmentItem.assignment.codeReviewer.username
                : "Not assigned"}
            </p>
          </div>
          <div className="assignment-button">{button(assignmentItem)}</div>
        </li>
      ))}
    </>
  );
}

export default LearnerMapping;
