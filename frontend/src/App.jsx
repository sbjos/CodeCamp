import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import DashboardLearner from "./pages/DashboardLearner";
import DashboardReviewer from "./pages/DashboardReviewer";
import LearnerAssignmentView from "./pages/LearnerAssignmentView";
import SubmitAssignment from "./pages/SubmitAssignment";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/api/auth/login" element={<Login />} />
        <Route path="/api/dashboard" element={<DashboardLearner />} />
        <Route path="/api/dashboard/reviewer" element={<DashboardReviewer />} />
        <Route path="/api/assignment/:id" element={<LearnerAssignmentView />} />
        <Route
          path="/api/submitassignment"
          element={<SubmitAssignment />}
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
