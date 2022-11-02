import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Home from "./pages/Home";
import User from "./pages/User";
import AddCategory from "./pages/AddCategory";
import Navbar from "./components/Navbar";
import AddProduct from "./pages/AddProduct";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user" element={<User />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/categories" element={<AddCategory/>} />
          <Route path="/addproduct" element={<AddProduct/>} />
      </Routes>
    </Router>

  );
}

export default App;
