"use client"
import React, { useState, useEffect } from "react"
import ResultPage from "./components/resultPage"
import Header from "./components/header"
import getQuizData from "../../../../lib/getQuizData"
import QuizLoaded from "./components/quizLoaded"

type Params = {
  params: {
    quizId: number
  }
}

export default function Quiz({ params: { quizId } }: Params) {
  const [content, setContent] = useState<React.JSX.Element | null>(null)
  useEffect(() => {
    const fetchData = async () => {
      const data = await getQuizData(quizId)
      if (data) {
        setContent(<QuizLoaded quizData={data} />)
      }
    }
    fetchData()
  })

  return content
}
