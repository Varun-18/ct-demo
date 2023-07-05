import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Header } from "../components/Header";
import { SignUp } from "../pages/SignUp";
import { Login } from "../pages/Login";
import { PDP } from "../pages/PDP";
import { PLP } from "../pages/PLP";

export const MainRoutes = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/products" element={<PLP />} />
        <Route path="/products/:id" element={<PDP />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate replace to={"/products"} />} />
      </Routes>
    </div>
  );
};
