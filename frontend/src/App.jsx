import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import DashboardLearner from "./pages/DashboardLearner";
import LearnerAssignmentView from "./pages/LearnerAssignmentView";
import DashboardReviewer from "./pages/DashboardReviewer";
import ReviewerAssignmentView from "./pages/ReviewerAssignmentView";
import SubmitAssignment from "./pages/SubmitAssignment";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/api/auth/login" element={<Login />} />
        <Route path="/api/dashboard" element={<DashboardLearner />} />
        <Route path="/api/assignment/:id" element={<LearnerAssignmentView />} />
        <Route path="/api/reviewer/dashboard" element={<DashboardReviewer />} />
        <Route
          path="/api/reviewer/assignment/:id"
          element={<ReviewerAssignmentView />}
        />
        <Route
          path="/api/submitassignment"
          element={<SubmitAssignment />}
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
