"use client";
import React from "react";
import Matrixvisualize from "./Matrixvisualize";
import USDCactiveMatrixVisualize from "../USDC-active-matrix/Matrixvisualize";
import { Suspense } from "react";
import { Tabs } from "@radix-ui/react-tabs";
import { TabsList } from "@radix-ui/react-tabs";
import { useState } from "react";
import { TabsTrigger } from "@radix-ui/react-tabs";
import { TabsContent } from "@radix-ui/react-tabs";

export default function Page() {
  const [activeMembershipLevel, setActiveMembershipLevel] = useState(1);
  return (
    <Tabs
      defaultValue={activeMembershipLevel.toString()}
      value={activeMembershipLevel.toString()}
      className="w-full bg-[#050810] "
      onValueChange={(value: string) =>
        setActiveMembershipLevel(parseInt(value))
      }
    >
      <TabsList className="w-full flex justify-center items-center   ">
        <TabsTrigger
          value="1"
          style={{ width: "10%" }}
          className={`px-6 py-3 rounded-lg font-medium transition-all 
              ${
                activeMembershipLevel === 1
                  ? "border-b-2 border-green-500 text-green-600 dark:text-green-400"
                  : "text-green-600 hover:text-green-500  dark:hover:text-green-400 text-2xl cursor-pointer"
              }`}
        >
          WBTC
        </TabsTrigger>
        <TabsTrigger
          value="2"
          style={{ width: "10%" }}
          className={`px-6 py-3 rounded-lg font-medium transition-all 
              ${
                activeMembershipLevel === 2
                  ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                  : "text-blue-600 hover:text-blue-500  dark:hover:text-blue-400 text-2xl cursor-pointer"
              }`}
        >
          USDC
        </TabsTrigger>
      </TabsList>

      <TabsContent value="1">
        <Suspense fallback={<div>Loading...</div>}>
          <Matrixvisualize />
        </Suspense>
      </TabsContent>
      <TabsContent value="2">
        <Suspense fallback={<div>Loading...</div>}>
          <USDCactiveMatrixVisualize />
        </Suspense>
      </TabsContent>
    </Tabs>
  );
}
