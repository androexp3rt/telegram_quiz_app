"use client"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import Heading from "./components/heading"
import HomePageInputs from "./components/homePageInputs/homePageInputs"
import StartQuizContainer from "./components/startQuizContainer"
import ErrorBoundary from "./components/ErrorBoundary"
import Navbar from "./components/Navbar"
import checkSubs from "../../lib/checkSubs"

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

export default function Home() {
  const router = useRouter()
  const [mode, setMode] = useState<string>("light")
  const [quizId, setQuizId] = useState<number>(0)
  const [quizIdMin, setQuizIdMin] = useState<number>(11407)
  const [quizIdMax, setQuizIdMax] = useState<number>(12598)
  const [user, setUser] = useState<TelegramUser | null>(null)
  const [isSubscriber, setIsSubscriber] = useState<boolean>(false)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp) {
      const { initDataUnsafe } = window.Telegram.WebApp;
      const { user } = initDataUnsafe;
      checkSubs({userId:user.id}).then(sub => {
        setIsSubscriber(sub);
        setUser(user as TelegramUser);
      });
    }
  }, []);
  return (
    <ErrorBoundary>
      <main className="min-h-screen">
        {/* <Navbar back={false} logout={isLoggedIn} /> */}
        <Navbar back={false} logout={false} />
        <section className="p-5">
          <Heading />
          <p className="w-full flex justify-center font-bold text-lg">{`Welcome ${user?.username}!`}</p>
          <HomePageInputs
            handleQuizId={setQuizId}
            quizIdMin={quizIdMin}
            quizIdMax={quizIdMax}
          />
          <StartQuizContainer
            quizId={quizId}
            quizIdMin={quizIdMin}
            quizIdMax={quizIdMax}
            isSubscriber={isSubscriber}
          />
        </section>
      </main>
    </ErrorBoundary>
  )
}
