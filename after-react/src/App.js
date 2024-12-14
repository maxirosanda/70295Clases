import { BrowserRouter, Routes, Route } from "react-router"
import { Home } from "./pages/Home"
import { Login } from "./pages/Login"
import { Register } from "./pages/Register"
import { EditProduct } from "./pages/EditProduct"

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/edit-product" element={<EditProduct/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
