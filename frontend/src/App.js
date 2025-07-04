import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Blogs from "./pages/Blogs";
import Recipes from "./pages/Recipes";
import NoPage from "./pages/NoPage";
import BlogDetails from "./components/Blog-Components/BlogDetails";
import RecipeDetails from "./components/Recipe-Components/RecipeDetails";
import PrivateRoute from "./components/PrivateRoute";
import FoodTracking from "./pages/FoodTracking";
import FoodDetail from "./components/food-tracking/foodDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:id" element={<BlogDetails />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/recipes/:id" element={<RecipeDetails />} />
          <Route path="/foodtracking" element={<FoodTracking />} />
          <Route path="/food/:id" element={<FoodDetail />} />
          
          
        </Route>

        {/* Catch-all for non-existent routes */}
        <Route path="*" element={<NoPage />} />
      </Routes>
    </Router>
  );
}

export default App;
