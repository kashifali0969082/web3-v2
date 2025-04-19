"use client";
import React from "react";
import RegisterPage from "./register";
import { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegisterPage />
    </Suspense>
  );
};

export default page;
