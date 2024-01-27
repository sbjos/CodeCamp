function LearnerMapping(assignments) {
  // If assignment status is completed, a view button is added to access video review.
  function button(assignmentItem) {
    const assignmentStatus = assignmentItem.assignment.status;
    const video = assignmentItem.assignment.reviewVideoUrl;
    const id = assignmentItem.assignment.id;

    // filters by assignment status to assign the appropriate button
    if (assignmentStatus !== "Completed") {
      return (
        <a className="button" href={"/api/assignment/" + id}>
          Edit
        </a>
      );
    } else if (video === null) {
      return <h4>No review</h4>;
    } else {
      return (
        <a
          className="button"
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
        <li className="cards" key={assignmentItem.assignment.id}>
          <div>Number: {assignmentItem.assignment.number}</div>
          <div>
            Github:&nbsp;
            <a href={assignmentItem.assignment.githubUrl}>Link</a>
          </div>
          <div>Branch: {assignmentItem.assignment.branch}</div>
          <div>
            Reviewer:&nbsp;
            {assignmentItem.assignment.codeReviewer
              ? assignmentItem.assignment.codeReviewer.username
              : "N/A"}
          </div>
          <div id="card-button">{button(assignmentItem)}</div>
        </li>
      ))}
    </>
  );
}

export default LearnerMapping;
