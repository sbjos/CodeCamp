import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Validate(item) {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = item ? item : navigate("/api/auth/login");

      try {
        console.log("token", token);
        const response = await axios.post(
          "http://localhost:8080/api/auth/validate",
          null,
          { headers: { Authorization: "Bearer " + token } }
        );
        console.log(response);
        console.log(response.status);
      } catch (err) {
        if (!err) {
          console.error("No Server Response");
        } else {
          navigate("/api/auth/login");
          console.error(err);
        }
      }
    };

    fetchData();
  }, []);
}

export default Validate;
