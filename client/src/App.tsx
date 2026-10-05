import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicOnlyRoute from "./components/PublicOnlyRoute";
import Dashboard from "./pages/Dashboard";
import Accounts from "./pages/Accounts";
import Schedular from "./pages/Schedular";
import AIComposer from "./pages/AIComposer";

export default function App() {
  return (
    <>
      <Routes>
        <Route element={<PublicOnlyRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/schedule" element={<Schedular />} />
            <Route path="/ai-composer" element={<AIComposer />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}
