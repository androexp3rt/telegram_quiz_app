interface IdInputProps {
  handleQuizId: Function
  quizIdMin: number
  quizIdMax: number
}

const IdInput: React.FC<IdInputProps> = ({
  handleQuizId,
  quizIdMin,
  quizIdMax,
}) => {
  function onSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault()
    var input: HTMLInputElement = document.getElementsByTagName("input")[0]
    if (input.id === "idInput") {
      const id: string = input.value
      handleQuizId(id)
    } else {
      handleQuizId(0)
    }
  }

  return (
    <div className="w-full flex flex-col align-center">
      <label
        className="w-full flex justify-center font-bold text-lg"
        htmlFor="idInput"
      >
        Enter your Quiz ID :
      </label>
      <input
        id="idInput"
        className="w-60 h-10 m-4 self-center bg-gray-300 dark:bg-gray-950 text-center focus:outline-none"
        type="text"
        placeholder={`Between ${quizIdMin} & ${quizIdMax}`}
      />
      <button
        className="w-30 px-4 py-2 rounded-full self-center bg-zinc-700 text-white flex flex-col align-center justify-around"
        onClick={(e) => onSubmit(e)}
      >
        Submit
      </button>
    </div>
  )
}
export default IdInput
