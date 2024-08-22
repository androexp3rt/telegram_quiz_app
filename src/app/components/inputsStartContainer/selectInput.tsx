import quizes from "../../../../lib/allQuizes"

interface SelectInputProps {
  handleQuizId: Function
}

const SelectInput: React.FC<SelectInputProps> = ({ handleQuizId }) => {
  function onSelectOption(e: React.ChangeEvent<HTMLSelectElement>) {
    e.preventDefault()
    var input: HTMLSelectElement = e.target
    if (input.id === "QuizesDropdown") {
      const id = input.value
      handleQuizId(id)
    }
  }
  return (
    <div className="w-full flex flex-col align-center">
      <label
        className="w-full flex justify-center text-lg text-center font-bold"
        htmlFor="Quizes"
      >
        Select a Quiz from the Dropdown menu :
      </label>
      <select
        id="QuizesDropdown"
        className="w-80 px-2 py-2 bg-gray-300 dark:bg-gray-950 self-center"
        onChange={onSelectOption}
        name="Quizes"
      >
        <option key="0" value={0}>
          ---- Please Select an Option ----
        </option>
        {quizes.map((quiz) => {
          return (
            <option key={quiz.id} value={quiz.id}>
              {quiz.title}
            </option>
          )
        })}
      </select>
    </div>
  )
}
export default SelectInput
