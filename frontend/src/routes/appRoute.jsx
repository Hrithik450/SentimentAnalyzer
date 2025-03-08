import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/home.jsx";
import NotFound from "../pages/NotFound/notFound.jsx"

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
