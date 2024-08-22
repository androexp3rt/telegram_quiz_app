"use client"
import Link from "next/link"
import ThemeSwitch from "./ThemeSwitch"

type Params = {
  back: boolean
}
export default function Navbar({ back }: Params) {
  return (
    <nav
      className={`w-full bg-slate-300 dark:bg-gray-600 dark:text-white flex align-center justify-between px-2 ${
        back ? "py-2" : "py-3"
      }`}
    >
      <div className="w-1/2 lg:w-1/4">
        {back ? (
          <div className="w-20 bg-blue-400 self-center px-5 py-1 rounded-xl">
            <Link className="text-2xl font-bold" href="/">
              {"<--"}
            </Link>
          </div>
        ) : (
          <></>
        )}
      </div>
      <h1 className="hidden lg:block lg:w-1/2 text-xl self-center text-center font-bold">
        Uncommon S2 Quiz App
      </h1>
      <div className="w-1/2 lg:w-1/4 flex justify-between lg:justify-end">
        <ThemeSwitch />
      </div>
    </nav>
  )
}
