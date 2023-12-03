import { BrowserRouter, Route, Routes } from "react-router-dom";
import PaymentSuccess from "./components/paymentSuccess";
import Login from "./components/Login/Login";
import PreviousTransaction from "./components/previousTransaction";
import PaymentPage from "./components/PaymentPage";

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/> } />
        <Route path="/feepayment" element={<PaymentPage/>} />
        <Route path="/paymentsuccess" element={<PaymentSuccess/>} />
        <Route path="/previoustransaction" element={<PreviousTransaction/>} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
