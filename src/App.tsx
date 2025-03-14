import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/mainContent";
import ProductPage from "./components/productPage";
import TopSeller from "./components/topSeller";
import PopularBlogs from "./components/popularBlogs";

function App() {
  return (
    <Router basename="/E-Commerce">
      <div className="flex h-screen">
        <Sidebar />
        <div className="rounded w-full flex justify-between flex-wrap">
          <Routes>
            <Route path="/" element={<MainContent />} />
            <Route path="/product/:id" element={<ProductPage />} />
          </Routes>
          <div>
            <TopSeller />
            <PopularBlogs />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
