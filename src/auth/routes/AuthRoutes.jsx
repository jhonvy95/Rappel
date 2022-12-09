import { Navigate, Route, Routes } from "react-router-dom";
import Hero from "../../ui/components/Hero";

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="home" element={<Hero />} />
      <Route path="/*" element={<Navigate to="/app/home" />} />
    </Routes>
  );
};
export default AuthRoutes;
