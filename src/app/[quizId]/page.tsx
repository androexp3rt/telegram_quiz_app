import getQuizData from "../../../lib/getQuizData"
import Link from "next/link"
import Heading from "../components/heading"
import LogoutBtn from "../components/logoutBtn"
import { displayTime } from "../../../lib/calculateTime"
import quizes from "../../../lib/allQuizes"
import Navbar from "../components/Navbar"

type Params = {
  params: {
    quizId: number
  }
}
export default async function QuizHome({ params: { quizId } }: Params) {
  const quizDataPromise: Promise<QuizSolution> = getQuizData(quizId)
  const quizData: QuizSolution = await quizDataPromise
  const title: string = quizData.title
  const questions = quizData.questions
  return (
    <main className="w-full min-h-screen">
      <Navbar back={true} logout={true} />
      <section className="p-5">
        <Heading />
        <p className="w-full flex justify-center font-bold text-lg">{title}</p>
        <div className="w-full max-w-lg m-auto flex flex-col align-between justify-center px-3 py-4">
          <p className="w-full flex justify-between font-bold text-sm">
            <span className="w-1/2">Total Time :</span>
            <span>{displayTime(questions.length * 60)}</span>
          </p>
          <p className="w-full flex justify-between font-bold text-sm">
            <span className="w-1/2">Total Questions :</span>
            <span>{questions.length}</span>
          </p>
          <p className="w-full flex justify-between font-bold text-sm">
            <span className="w-1/2">Total Marks :</span>
            <span>{questions.length}</span>
          </p>
          <p className="w-full flex justify-between font-bold text-sm">
            <span className="w-1/2">Negative Marking :</span>
            <span>-0.25</span>
          </p>
          <Link
            className="bg-green-500 self-center rounded-full px-4 py-2 my-6"
            href={`/${quizId}/start`}
          >
            Start
          </Link>
        </div>
      </section>
    </main>
  )
}
export async function generateStaticParams() {
  return quizes.map((quiz) => `${quiz.id}`)
}
