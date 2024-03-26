import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/auth";
import ProtectRoute from "./routes/ProtectRoute";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />∏
      </Routes>
      <ProtectRoute />
    </>
  );
}

export default App;
