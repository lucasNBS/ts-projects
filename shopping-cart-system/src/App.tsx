import { Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Store } from "./pages/Store";
import { About } from "./pages/About";
import { Home } from "./pages/Home";
import { Navbar } from "./components/Navbar";
import { ShoppingCartProvider } from "./contexts/ShoppingCartContext";

function App() {
  return (
    <>
      <ShoppingCartProvider>
        <Navbar />
        <Container className="mb-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/store" element={<Store />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Container>
      </ShoppingCartProvider>
    </>
  );
}

export default App;
