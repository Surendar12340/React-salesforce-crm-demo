import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Callback from "./Callback";
import Profile from "./pages/Profile";
import CustomerImport from "./pages/CustomerImport";
import CRMAssistant from "./pages/CRMAssistant";
import CustomerPerformance from "./pages/CustomerPerformance";
import CustomerSearch from "./CustomerSearch";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/callback" element={<Callback />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/customer-import" element={<CustomerImport />} />
        <Route path="/crm-assistant" element={<CRMAssistant />} />
        <Route path="/customer-performance" element={<CustomerPerformance />} />
        <Route path="/customer-search" element={<CustomerSearch />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;