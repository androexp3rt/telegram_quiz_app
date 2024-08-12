import Heading from "@/app/components/heading"
import Link from "next/link"

type Params = {
  score: number
  total: number
}
export default function ResultPage({ score, total }: Params) {
  return (
    <main className="w-full h-screen flex flex-col align-center justify-center py-5">
      <Heading />
      <h2 className="font-bold text-xl self-center py-3">
        You scored {score} out of {total}
      </h2>
      <Link
        className="bg-green-600 px-3 py-2 rounded-xl text-white font-bold self-center"
        href="/"
      >
        Back to Home
      </Link>
    </main>
  )
}
