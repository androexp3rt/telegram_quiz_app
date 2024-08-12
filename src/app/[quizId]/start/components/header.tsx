"useClient"
import { SubscribeBtnRound } from "@/app/components/subscribeBtn"
import React, { useState, useEffect } from "react"
import { displayTime } from "../../../../../lib/calculateTime"
import { useRouter } from "next/navigation"
import ThemeSwitch from "@/app/components/ThemeSwitch"
type Params = {
  title: string
  count: number
  qI: number
  score: number
  time: number
}

export default function Header({ title, count, qI, score, time }: Params) {
  const router = useRouter()
  return (
    <div id="header" className="w-full p-0">
      <h1 className="w-full bg-gray-300 dark:bg-gray-950 py-3 w-full text-center text-xl font-bold ">
        {title}
      </h1>
      <div className="w-full flex justify-between px-2 py-1">
        <button
          className="bg-red-400 rounded-full px-4 py-1"
          onClick={() => {
            localStorage.clear()
            router.back()
          }}
        >
          Exit
        </button>
        <span className="text-center text-xl font-bold px-3 py-3.5">
          {displayTime(time)}
        </span>
        <ThemeSwitch />
        <SubscribeBtnRound padding={"px-2"} margin={"ms-0"} ImgHeight={40} />
      </div>
      <div className="w-full bg-gray-300 dark:bg-gray-950 flex justify-between px-1 py-3">
        <span className="font-bold text-md">{`Score: ${score}`}</span>
        <span className="font-bold text-md">{`Question: ${qI} of ${count}`}</span>
        <div>
          <span className="bg-green-400 rounded-lg px-1.5 py-2 mr-1 ">
            1.00
          </span>
          <span className="bg-red-300 rounded-lg px-1.5 py-2">0.25</span>
        </div>
      </div>
    </div>
  )
}
