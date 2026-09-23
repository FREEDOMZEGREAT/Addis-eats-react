import { BrowserRouter, Routes, Route } from "react-router-dom";
import ThemeProvider from "./theme/ThemeProvider";
import AuthProvider from "./auth/AuthProvider";
import ErrorBoundary from "./ui/ErrorBoundary";
import Layout from "./components/Layout";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Menu from "./menu/Menu";
import DishDetail from "./menu/DishDetail";
import Cart from "./cart/Cart";
import Checkout from "./checkout/Checkout";
import OrderConfirmation from "./checkout/OrderConfirmation";
import Favorites from "./favorites/Favorites";
import OrderHistory from "./orders/OrderHistory";
import AdminLogin from "./admin/AdminLogin";
import AdminLayout from "./admin/AdminLayout";
import RequireAdmin from "./admin/RequireAdmin";
import Dashboard from "./admin/Dashboard";
import DishManager from "./admin/DishManager";
import OrderManager from "./admin/OrderManager";
import RequireAuth from "./auth/RequireAuth";
import Login from "./auth/Login";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
                <Route path="menu" element={<Menu />} />
                <Route path="menu/:id" element={<DishDetail />} />
                <Route path="cart" element={<Cart />} />
                <Route
                  path="checkout"
                  element={
                    <RequireAuth>
                      <Checkout />
                    </RequireAuth>
                  }
                />
                <Route
                  path="order-confirmation"
                  element={<OrderConfirmation />}
                />
                <Route path="favorites" element={<Favorites />} />
                <Route path="orders" element={<OrderHistory />} />
              </Route>
              <Route path="/login" element={<Login />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route
                path="/admin"
                element={
                  <RequireAdmin>
                    <AdminLayout />
                  </RequireAdmin>
                }
              >
                <Route index element={<Dashboard />} />
                <Route path="menu" element={<DishManager />} />
                <Route path="orders" element={<OrderManager />} />
              </Route>
            </Routes>
          </ErrorBoundary>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
