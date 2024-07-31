import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Signin from "./pages/Signin";
import SignUp from "./pages/SignUp";
import PrivateRoute from "./components/PrivateRoute";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminPrivateRoute from "./components/AdminPrivateRoute";
import UserLayout from "./components/UserLayout";
import AdminPublicRoute from "./pages/admin/AdminPublicRoute";
import PublicRoute from "./pages/PublicRoute";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<UserLayout />}>
          <Route path="/" element={<Home />} />
          <Route
            path="/signin"
            element={<PublicRoute element={<Signin />} restricted={true} />}
          />
          <Route
            path="/signup"
            element={<PublicRoute element={<SignUp />} restricted={true} />}
          />
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>

        <Route
          path="/admin/login"
          element={
            <AdminPublicRoute element={<AdminLogin />} restricted={true} />
          }
        />
        <Route element={<AdminPrivateRoute admin={true} />}>
          <Route path="/admin/home" element={<AdminDashboard />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
