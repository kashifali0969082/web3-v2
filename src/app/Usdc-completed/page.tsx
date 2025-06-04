"use client"
import React from 'react'
import USDCMatrixVisualize from './complte-visualize'
import { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
    <USDCMatrixVisualize/>
    </Suspense>
  )

}

export default page