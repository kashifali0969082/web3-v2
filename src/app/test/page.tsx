"use client"
import React from 'react'
import Matrixvisualize from './complte-visualize'
import { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
    <Matrixvisualize/>
    </Suspense>
  )

}

export default page