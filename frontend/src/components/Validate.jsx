import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Validate(token, userAuthority) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || !userAuthority) {
      navigate("/api/auth/login");
      localStorage.clear();
    } else {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            "http://localhost:8080/api/auth/validate",
            { headers: { Authorization: "Bearer " + token } }
          );
          // TEST: for testing
          console.log("assignments", response);
        } catch (err) {
          localStorage.clear();
          if (!err) {
            console.error("No Server Response");
          } else {
            navigate("/api/auth/login");
            localStorage.clear();
            console.error(err);
          }
        }
      };
      fetchData();
    }
  }, []);
}

export default Validate;
