import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/pages/Dashboard";
import Home from "./components/pages/Home";
import Category from "./components/pages/category/Category";
import FinancialRecord from "./components/pages/financialrecord/FinancialRecord";
import UserManagement from "./components/pages/user-management/UserManagement";
import UserUpdate from "./components/pages/user-management/UserUpdate";
import UserView from "./components/pages/user-management/UserView";
import FinancialRecordCreate from "./components/pages/financialrecord/FinancialRecordCreate";
import FinancialRecordUpdate from "./components/pages/financialrecord/FinancialRecordUpdate";
import FinancialRecordView from "./components/pages/financialrecord/FinancialRecordView";
import { Toaster } from "react-hot-toast";
import { RequireAuth } from "./components/auth/RequireAuth";
import Unauthorized from "./components/pages/Unauthorized";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
          {/* categories */}
          <Route
            path="/dashboard/category"
            element={
              <RequireAuth allowedRoles={["admin", "analyst"]}>
                <Category />
              </RequireAuth>
            }
          />
          {/* financial-records */}
          <Route
            path="/dashboard/financial-records"
            element={
              <RequireAuth allowedRoles={["admin", "analyst"]}>
                <FinancialRecord />
              </RequireAuth>
            }
          />
          <Route
            path="/dashboard/financial-records/create"
            element={
              <RequireAuth allowedRoles={["admin"]}>
                <FinancialRecordCreate />
              </RequireAuth>
            }
          />
          <Route
            path="/dashboard/financial-records/update/:id"
            element={
              <RequireAuth allowedRoles={["admin"]}>
                <FinancialRecordUpdate />
              </RequireAuth>
            }
          />
          <Route
            path="/dashboard/financial-records/view/:id"
            element={
              <RequireAuth allowedRoles={["admin", "analyst"]}>
                <FinancialRecordView />
              </RequireAuth>
            }
          />
          {/* user-management */}
          <Route
            path="/dashboard/user-management"
            element={
              <RequireAuth allowedRoles={["admin"]}>
                <UserManagement />
              </RequireAuth>
            }
          />
          <Route
            path="/dashboard/user-management/update/:id"
            element={
              <RequireAuth allowedRoles={["admin"]}>
                <UserUpdate />
              </RequireAuth>
            }
          />
          <Route
            path="/dashboard/user-management/view/:id"
            element={
              <RequireAuth allowedRoles={["admin"]}>
                <UserView />
              </RequireAuth>
            }
          />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;
