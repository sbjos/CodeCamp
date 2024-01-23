function GetUserAssignments(url, id) {
  const [assignment, setAssignment] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id) {
          const response = await axios.get(url, {
            headers: { Authorization: "Bearer " + token },
          });
          console.log("assignments", response);
          setAssignments(response.data);
        } else {
          const response = await axios.get(url + id, {
            headers: { Authorization: "Bearer " + token },
          });
          console.log("assignment", response);
          setAssignment(response.data);
        }
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

  if (!id) {
    return assignments;
  } else {
    return assignment;
  }
}
export default GetUserAssignments;
