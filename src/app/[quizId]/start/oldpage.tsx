// "use client"
// import React, { useState, useEffect } from "react"
// import ResultPage from "./components/resultPage"
// import Header from "./components/header"
// import getQuizData from "../../../../lib/getQuizData"

// type Params = {
//   params: {
//     quizId: number
//   }
// }
// export default function Quiz({ params: { quizId } }: Params) {
//   const [questions, setQuestions] = useState<Question[] | null>(null)
//   const [title, setTitle] = useState("")
//   const [time, setTime] = useState<number>(0)
//   const [qI, setQI] = useState<number>(0)
//   const [cQ, setCQ] = useState<Question | null>(null)
//   const [sAnswer, setSAnswer] = useState<Choice | null>(null)
//   const [inputsDisabled, setInputsDisabled] = useState(false)
//   const [isPrevBtnDisabled, setIsPrevBtnDisabled] = useState(false)
//   const [stopTimer, setStopTimer] = useState(false)
//   const [score, setScore] = useState(0)
//   const [updateScore, setUpdateScore] = useState(false)
//   const [pa, setPa] = useState<Choice[]>([])
//   const [showResult, setShowResult] = useState(false)
//   useEffect(() => {
//     const fetchData = async () => {
//       const data = await getQuizData(quizId)
//       setQuestions(data.questions)
//       setTitle(data.title)
//       setTime(data.questions.length * 60)
//     }
//     fetchData()
//   }, [title, questions])
//   useEffect(() => {
//     setIsPrevBtnDisabled(qI === 0)
//     timer
//     if (sAnswer) checkSelectedAnswer(sAnswer)
//     setContentHeight()
//     window.onbeforeunload = (event: Event) => {
//       window.alert("about to reload")
//       sessionStorage.setItem(
//         "quizState",
//         JSON.stringify({
//           qI,
//           sAnswer,
//           inputsDisabled,
//           isPrevBtnDisabled,
//           stopTimer,
//           score,
//           updateScore,
//           pa,
//           showResult,
//           time,
//         })
//       )
//     }
//     return () => {
//       window.removeEventListener("beforeunload", (event) => {
//         event.preventDefault()
//       })
//     }
//   }, [])

//   // const timer = () => {
//   const timer = setTimeout(() => {
//     // time === 0 ? setShowResult(true) : setTime(time - 1)
//     !stopTimer && clearInterval(timer)
//   }, 1000)
//   // }
//   function setContentHeight() {
//     const footerHeight = getComputedStyle(
//       document.getElementById("footer")!
//     ).height
//     document.getElementById("quizContent")!.style.marginBottom = footerHeight
//   }
//   const currentQ = questions[qI]
//   const handleNextQuestion = () => {
//     if (sAnswer === null) {
//       alert("Please select an answer")
//       return
//     }
//     document.getElementById(`${sAnswer.id}`)!.style.backgroundColor =
//       "rgba(255, 255, 255, 0.6)"
//     setIsPrevBtnDisabled(false)
//     if (qI + 1 < questions.length) {
//       setQI(qI + 1)
//       if (qI + 1 > pa.length - 1) {
//         setStopTimer(false)
//         setInputsDisabled(false)
//         setSAnswer(null)
//         setScore(
//           updateScore
//             ? sAnswer.is_right_choice
//               ? score + 1
//               : parseFloat(score.toString()) - 0.25
//             : score
//         )
//         stopTimer && timer
//       } else {
//         setSAnswer(pa[qI + 1])
//         setInputsDisabled(true)
//       }
//     } else {
//       setScore(
//         sAnswer.is_right_choice
//           ? score + 1
//           : parseFloat(score.toString()) - 0.25
//       )
//       setShowResult(true)
//     }
//   }

//   const handleSelectAnswer = (c: Choice) => {
//     checkSelectedAnswer(c)
//     setSAnswer(c)
//     setInputsDisabled(true)
//     setStopTimer(true)
//     setUpdateScore(true)
//     if (pa.indexOf(c) === -1) setPa([...pa, c])
//     const elements = document.getElementsByClassName("inputs")
//     Array.from(elements).forEach((input) => {
//       ;(input as HTMLInputElement).disabled = true
//     })
//   }
//   const handlePrevQuestion = () => {
//     setInputsDisabled(true)
//     if (sAnswer) {
//       document.getElementById(`${sAnswer.id}`)!.style.backgroundColor =
//         "rgba(255, 255, 255, 0.6)"
//     }
//     setIsPrevBtnDisabled(qI === 1)
//     setSAnswer(pa[qI - 1])
//     setQI(qI - 1)
//     setUpdateScore(false)
//   }
//   const checkSelectedAnswer = (c: Choice) => {
//     if (c !== null) {
//       const listItem = document.getElementById(`${c.id}`)!
//       if (c.is_right_choice) {
//         listItem.style.backgroundColor = "rgb(46, 237, 148)"
//       } else {
//         listItem.style.backgroundColor = "rgb(236, 146, 146)"
//       }
//     }
//   }

//   if (showResult) {
//     return <ResultPage />
//   }
//   const content = (
//     <main className="min-h-screen p-0">
//       <Header
//         title={title}
//         count={questions.length}
//         qI={qI + 1}
//         score={score}
//         time={time}
//         setShowResult={setShowResult}
//       />
//       <div id="quizContent" className="relative py-2">
//         <p
//           className="px-2 text-center"
//           dangerouslySetInnerHTML={{
//             __html: currentQ?.question,
//           }}
//         />
//         <ul id="choicesUl" className="flex flex-col">
//           {currentQ?.choices.map((c: Choice, index: number) => {
//             return (
//               <li
//                 id={`${c.id}`}
//                 className="flex justify-start py-2 bg-gray-100 my-1"
//                 key={index}
//               >
//                 <input
//                   className="inputs mx-2"
//                   type="radio"
//                   id={`option-${index}`}
//                   name="answer"
//                   value={c.choice}
//                   disabled={false}
//                   checked={sAnswer?.id === c.id}
//                   onChange={() => handleSelectAnswer(c)}
//                 />
//                 <label
//                   htmlFor={`option-${index}`}
//                   dangerouslySetInnerHTML={{
//                     __html: c.choice,
//                   }}
//                 />
//               </li>
//             )
//           })}
//         </ul>
//         <div
//           id="explaination"
//           className={inputsDisabled ? "px-2" : "hidden px-2"}
//         >
//           <h2 className="w-full font-bold text-xl text-center">Explanation</h2>
//           <div
//             className="w-full font-bold text-md text-center"
//             dangerouslySetInnerHTML={{
//               __html: currentQ?.solution,
//             }}
//           />
//         </div>
//       </div>
//       <div
//         id="footer"
//         className="w-full flex justify-between px-2 py-2 bg-amber-100 fixed bottom-0 "
//       >
//         <button
//           id="prevBtn"
//           className="bg-green-600 px-3 py-2 rounded-xl disabled:opacity-30"
//           disabled={isPrevBtnDisabled}
//           onClick={handlePrevQuestion}
//         >
//           Prev Question
//         </button>
//         <button
//           id="nextBtn"
//           className="bg-green-600 px-3 py-2 rounded-xl disabled:opacity-30"
//           disabled={false}
//           onClick={handleNextQuestion}
//         >
//           {qI + 1 === questions.length ? "Show Result" : "Next Question"}
//         </button>
//       </div>
//     </main>
//   )
//   return content
// }
