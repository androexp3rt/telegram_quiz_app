"use client"
import Heading from "./components/heading"
import InputsStartContainer from "./components/inputsStartContainer/inputsStartContainer"
import ErrorBoundary from "./components/ErrorBoundary"
import Navbar from "./components/Navbar"
import checkSubs from "../../lib/checkSubs"
import { useState, useEffect } from "react";

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
  const [player, setPlayer] = useState<TelegramUser | null>(null)
  const [isSubscriber, setIsSubscriber] = useState<boolean>(false)
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
  return (
    <ErrorBoundary>
      <main className="min-h-screen">
        <Navbar back={false} />
        <section className="p-5">
          <Heading />
          <p className="w-full flex justify-center font-bold text-lg">{`Welcome ${player?.username}!`}</p>
          <InputsStartContainer isSubscriber={isSubscriber}/>
        </section>
      </main>
    </ErrorBoundary>
  )
}
