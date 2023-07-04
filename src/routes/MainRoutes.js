import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Header } from "../components/Header";
import { SignUp } from "../components/SignUp";
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
        <Route path="*" element={<Navigate replace to={"/products"} />} />
      </Routes>
    </div>
  );
};
