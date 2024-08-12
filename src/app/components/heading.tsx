import { SubscribeBtnRound } from "./subscribeBtn"
export default function Heading() {
  return (
    <div className="pt-6 my-10">
      <div className="w-full flex justify-center">
        <h1 className="h-15 pt-1 font-bold text-xl md:text-2xl text-center">
          Uncommon S2 Quiz App
        </h1>
        <SubscribeBtnRound />
      </div>
      <p className="my-2 font-bold text-sm text-center">
        Your Daily Dose of Current Events & IQ Challenges
      </p>
    </div>
  )
}
