"use Client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"
import SelectInput from "./selectInput";
import IdInput from "./idInput";
import checkSubs from "../../../../lib/checkSubs"
import SubscribeBtnBox from "../subscribeBtn";

declare global {
  interface Window {
    Telegram: {
      WebApp: {
        initDataUnsafe: {
          user: {
            first_name: string;
            last_name: string;
            id:number;
          };
        };
      };
    };
  }
}

export default function InputsStartContainer() {
  const [quizId, setQuizId] = useState<number>(0)
  const [quizIdMin, setQuizIdMin] = useState<number>(11407)
  const [quizIdMax, setQuizIdMax] = useState<number>(12598)
  const [player, setPlayer] = useState<TelegramUser | null>(null)
  const [isSubscriber, setIsSubscriber] = useState<boolean>(false)
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp) {
      const { initDataUnsafe } = window.Telegram.WebApp;
      const { user } = initDataUnsafe;
      setPlayer(user as TelegramUser);
      checkSubs({userId:user.id}).then(sub => {
        setIsSubscriber(sub);
      });
    }
  }, []);
  function startQuiz() {
    router.push(`/${quizId}`);
  }
  return (
    <>
    <div className="w-full h-80 my-5 flex flex-col align-center justify-around">
      <p className="w-full flex justify-center font-bold text-lg">{`Welcome ${player?.username}!`}</p>
      <SelectInput handleQuizId={setQuizId} />
      <p className="w-full flex justify-center text-lg text-center font-bold">
        Or
      </p>
      <IdInput
        handleQuizId={setQuizId}
        quizIdMin={quizIdMin}
        quizIdMax={quizIdMax}
      />
    </div>
    {quizIdMin > quizId ?<p className="w-full text-red-600 text-center">Invalid Quiz ID</p>:isSubscriber?<div className="w-full h-24 flex flex-col align-center justify-center">
          <p className="w-full text-center my-2">
            Your Quiz is ready. Please click start Button to start
          </p>
          <button
            className="bg-green-500 self-center rounded-full px-4 py-2"
            onClick={startQuiz}
          >
            Start
          </button>
        </div>:<div className="w-full h-24 flex flex-col align-center justify-center">
          <p className="w-full text-center my-2">
            To enroll the quiz, please subscribe to our channel first.
          </p>
          <SubscribeBtnBox />
        </div>}
    </>
  );
};
