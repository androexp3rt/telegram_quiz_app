"use client"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function SubscribeBtnBox({
  width,
  padding,
  margin,
  ImgHeight,
}: SubscribeBtnProps) {
  const router = useRouter()
  function handleSubscribe() {
    router.push("https://t.me/tqdtc")
  }
  const w = width ? width : ""
  const p = padding ? padding : "px-4 py-1"
  const m = margin ? margin : "m-0"
  const ih = ImgHeight ? ImgHeight : 30
  return (
    <button
      className={`${w} ${p} ${m} self-center flex justify-center align-center bg-blue-500 rounded-xl`}
      onClick={handleSubscribe}
    >
      <span className="h-8 pt-1 text-white font-bold">Subscribe</span>
      <Image
        className="w-sm h-sm"
        src="/telegram.png"
        alt="Logout"
        width={30}
        height={30}
      />
    </button>
  )
}
export function SubscribeBtnRound({
  width,
  padding,
  margin,
  ImgHeight,
}: SubscribeBtnProps) {
  const router = useRouter()
  function handleSubscribe() {
    router.push("https://t.me/tqdtc")
  }
  const w = width ? width : "w-15"
  const p = padding ? padding : "px-1 py-1"
  const m = margin ? margin : "ms-2"
  const ih = ImgHeight ? ImgHeight : 30
  return (
    <button
      className={`${w} ${p} ${m} bg-blue-500 aspect-square rounded-full flex items-center justify-center focus:outline-none`}
      onClick={handleSubscribe}
    >
      <Image
        className="rounded-full aspect-square"
        src="/telegram.png"
        alt="Logout"
        width={ih}
        height={ih}
      />
    </button>
  )
}
