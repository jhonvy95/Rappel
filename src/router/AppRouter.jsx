import { Navigate, Route, Routes } from "react-router-dom";
import { useCheckAuth } from "../hooks";
import JournalRoutes from "../journal/routes/JournalRoutes";
import CheckingAuth from "../ui/components/CheckingAuth";
import Hero from "../ui/components/Hero";

const AppRouter = () => {
  const { status } = useCheckAuth();
  if (status === "checking") {
    return <CheckingAuth />;
  }
  return (
    <Routes>
      {status === "not-authenticated" ? (
        <Route path="/home/*" element={<Hero />} />
      ) : (
        <Route path="/*" element={<JournalRoutes />} />
      )}

      <Route path="/*" element={<Navigate to="/home" />} />
    </Routes>
  );
};
export default AppRouter;
