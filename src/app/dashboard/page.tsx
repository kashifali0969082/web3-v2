"use client";
import React from "react";
import Dashboard from "./Dashboard";
import { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Dashboard />
    </Suspense>
  );
};

export default page;
