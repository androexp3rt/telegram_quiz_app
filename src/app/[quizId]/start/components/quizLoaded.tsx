import React, { useState, useEffect, Component } from "react"
import Header from "./header"
import DOMPurify from "dompurify"
import ResultPage from "./resultPage"

type QuizProps = {
  quizData: QuizSolution
}

interface QuizState {
  title: string
  questions: Array<Question>
  currentQuestion: number
  selectedAnswer: Choice | null
  inputsDisabled: boolean
  isPrevBtnDisabled: boolean
  score: number
  updateScore: boolean
  pa: Choice[]
  pc: Array<Choice[]>
  stopTimer: boolean
  time: number
  showResult: boolean
}

export default class QuizLoaded extends Component<QuizProps, QuizState> {
  private quizData: QuizSolution
  constructor(props: QuizProps) {
    super(props)
    this.quizData = this.props.quizData
    // this.quizData = JSON.parse(localStorage.getItem("quizData")!)
    this.state = localStorage.getItem("quizState")
      ? JSON.parse(localStorage.getItem("quizState")!)
      : {
          currentQuestion: 0,
          selectedAnswer: null,
          score: 0,
          stopTimer: false,
          time: this.quizData.questions.length * 60,
          pa: [],
          pc: [],
          showResult: false,
          isPrevBtnDisabled: false,
          inputsDisabled: false,
          updateScore: true,
        }
  }
  componentDidMount() {
    this.setState({
      stopTimer: false,
      isPrevBtnDisabled: this.state.currentQuestion === 0,
    })
    this.timer()
    this.checkSelectedAnswer(this.state.selectedAnswer!)
    window.onbeforeunload = (event) => {
      localStorage.setItem("quizState", JSON.stringify(this.state))
    }
  }
  componentWillUnmount() {
    window.onbeforeunload = null // Remove listener to avoid memory leaks
  }
  componentDidUpdate(prevProps: QuizProps, prevState: QuizState) {
    if (prevState.currentQuestion !== this.state.currentQuestion) {
      this.checkSelectedAnswer(this.state.selectedAnswer!)
    }
  }
  timer = () => {
    setTimeout(() => {
      this.state.time === 0
        ? this.setState({ showResult: true })
        : this.setState({ time: this.state.time - 1 })
      !this.state.stopTimer && this.timer()
    }, 1000)
  }
  handleNextQuestion = () => {
    if (this.state.selectedAnswer === null) {
      alert("Please select an answer")
      return
    }
    document.getElementById(
      this.state.selectedAnswer.id.toString()
    )!.style.backgroundColor = "rgba(255, 255, 255, 0.6)"
    this.setState({ isPrevBtnDisabled: false })
    if (this.state.currentQuestion + 1 < this.quizData.questions.length) {
      this.setState({ currentQuestion: this.state.currentQuestion + 1 })
      if (this.state.currentQuestion + 1 > this.state.pa.length - 1) {
        this.setState({
          stopTimer: false,
          score: this.state.updateScore
            ? this.state.selectedAnswer.is_right_choice
              ? this.state.score + 1
              : parseFloat(this.state.score.toString()) - 0.25
            : this.state.score,
          inputsDisabled: false,
          selectedAnswer: null,
        })
        this.state.stopTimer && this.timer()
      } else {
        this.setState({
          selectedAnswer: this.state.pa[this.state.currentQuestion + 1],
          inputsDisabled: true,
        })
      }
    } else {
      this.setState({
        score: this.state.selectedAnswer.is_right_choice
          ? this.state.score + 1
          : parseFloat(this.state.score.toString()) - 0.25,
        showResult: true,
      })
    }
  }

  handleSelectAnswer = (choice: Choice) => {
    this.checkSelectedAnswer(choice)
    this.setState({
      inputsDisabled: true,
      stopTimer: true,
      updateScore: true,
      selectedAnswer: choice,
      pa:
        this.state.pa.indexOf(choice) === -1
          ? [...this.state.pa, choice]
          : this.state.pa,
    })
  }

  handlePrevQuestion = () => {
    this.setState({ inputsDisabled: true })
    if (this.state.selectedAnswer) {
      document.getElementById(
        this.state.selectedAnswer.id.toString()
      )!.style.backgroundColor = "rgba(255, 255, 255, 0.6)"
    }
    this.setState({
      isPrevBtnDisabled: this.state.currentQuestion === 1,
      selectedAnswer: this.state.pa[this.state.currentQuestion - 1],
      currentQuestion: this.state.currentQuestion - 1,
      updateScore: false,
    })
  }
  checkSelectedAnswer = (choice: Choice) => {
    if (choice !== null) {
      const listItem = document.getElementById(choice.id.toString())
      if (choice.is_right_choice) {
        ;(listItem as HTMLLIElement).style.backgroundColor = "rgb(46, 237, 148)"
      } else {
        ;(listItem as HTMLLIElement).style.backgroundColor =
          "rgb(236, 146, 146)"
      }
    }
  }

  render() {
    const { currentQuestion, selectedAnswer } = this.state
    const { questions } = this.quizData
    const currentQ = questions[currentQuestion]
    const renderResult = () => {
      localStorage.clear()
      return (
        <ResultPage
          score={this.state.score}
          total={this.quizData.questions.length}
        />
      )
    }
    const renderQuestion = () => (
      <main className="w-full min-h-screen flex flex-col">
        <Header
          title={this.quizData.title}
          count={this.quizData.questions.length}
          qI={this.state.currentQuestion + 1}
          score={this.state.score}
          time={this.state.time}
        />
        <section className="w-full">
          <div
            className="question w-full px-2 py-2 text-center"
            dangerouslySetInnerHTML={{
              __html: currentQ.question,
            }}
          />
          <ul id="choicesUl" className="choicesUl flex flex-col w-full">
            {currentQ.choices.map((c, index) => {
              return (
                <li
                  id={c.id.toString()}
                  className="choice w-full flex justify-start my-1 py-2 bg-gray-100 dark:bg-gray-950"
                  key={index}
                >
                  <input
                    className="mx-3"
                    type="radio"
                    id={`option-${index}`}
                    name="answer"
                    value={c.choice}
                    disabled={this.state.inputsDisabled}
                    checked={selectedAnswer?.id === c.id}
                    onChange={() => this.handleSelectAnswer(c)}
                  />
                  <label
                    htmlFor={`option-${index}`}
                    dangerouslySetInnerHTML={{
                      __html: c.choice,
                    }}
                  />
                </li>
              )
            })}
          </ul>
          <div
            id="explaination"
            className={
              this.state.inputsDisabled
                ? "explaination px-2 py-2"
                : "hidden explaination px-2 py-2"
            }
          >
            <h2 className="w-full font-bold text-xl text-center">
              Explanation
            </h2>
            <div
              className="explainPara text-center"
              dangerouslySetInnerHTML={{
                __html: currentQ.solution,
              }}
            />
          </div>
          {/* just to add padding to the bottom to avoid overLaping with footer*/}
          <div className="bg-slate-200 w-full flex justify-between px-2 py-4 opacity-0">
            <div className="bg-green-600 px-3 py-2">P</div>
            <div className="bg-green-600 px-3 py-2">N</div>
          </div>
          {/* just to add padding to the bottom to avoid overLaping with footer */}
        </section>
        <footer className="bg-slate-200 w-full flex justify-between px-2 py-4 fixed bottom-0">
          <button
            id="prevBtn"
            className="bg-green-600 px-3 py-2 rounded-xl disabled:opacity-30"
            disabled={this.state.isPrevBtnDisabled}
            onClick={this.handlePrevQuestion}
          >
            Prev Question
          </button>
          <button
            id="nextBtn"
            className="bg-green-600 px-3 py-2 rounded-xl disabled:opacity-30"
            disabled={false}
            onClick={this.handleNextQuestion}
          >
            {currentQuestion + 1 === questions.length
              ? "Show Result"
              : "Next Question"}
          </button>
        </footer>
      </main>
    )
    return <>{!this.state.showResult ? renderQuestion() : renderResult()}</>
  }
}
