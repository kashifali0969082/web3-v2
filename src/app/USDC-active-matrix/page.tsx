"use client"
import React from 'react'
import USDCactiveMatrixVisualize from './Matrixvisualize'
import { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
    <USDCactiveMatrixVisualize/>
    </Suspense>
  )

}

export default page