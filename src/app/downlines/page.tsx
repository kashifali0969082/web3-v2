import React from "react";
import Downlines from "./Downlines";
import { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Downlines />
    </Suspense>
  );
};

export default page;
