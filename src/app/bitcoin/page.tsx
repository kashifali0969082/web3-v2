"use client"
import React from 'react'
// import Bitcoin from './bitcoin'
import { Suspense } from "react";
const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
    {/* <Bitcoin/> */}
    </Suspense>
  )
}

export default page