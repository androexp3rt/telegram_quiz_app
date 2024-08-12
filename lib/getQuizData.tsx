export default async function getQuizData(quizId: number) {
  const options = {
    authorization:
      "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5jYXJlZXJzY2xvdWQuaW4vYXBpL2xvZ2luIiwiaWF0IjoxNzEwMDU0ODcyLCJleHAiOjE3NDE1OTA4NzIsIm5iZiI6MTcxMDA1NDg3MiwianRpIjoiamZBYVZQU0hIc0ViS2hZNyIsInN1YiI6MTY0OTksInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.4COls_39N9qOfXRsQQa95WO-iFZou1q1N2TMg5A4b70",
    "Content-Type": "application/json",
  }
  const res = await fetch(
    `https://api.careerscloud.in/api/quiz/solution/${quizId}`,
    {
      headers: options,
    }
  )
  const data: QuizResponse = await res.json()
  var quizSolution: QuizSolution = data.response.quizSolution
  return quizSolution
}
