import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AdminRoute } from "./components/AdminRoute";
import {HomePage, CreatePage, SignIn, SignUp, Footer,Navbar,Products, UpdateProductPage, ProtectedRoute } from "./sources";
const App = () => {
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage /> } />
        <Route path="/home" element={<HomePage />} />
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <AdminRoute>
                <CreatePage />
              </AdminRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/products/:id/edit"
          element={
            <ProtectedRoute>
              <AdminRoute>
                <UpdateProductPage />
              </AdminRoute>
            </ProtectedRoute>
          }
        />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
