import SelectInput from "./selectInput";
import IdInput from "./idInput";

interface HomePageInputsProps {
  handleQuizId: Function;
  quizIdMin: number;
  quizIdMax: number;
}
const HomePageInputs: React.FC<HomePageInputsProps> = ({
  handleQuizId,
  quizIdMin,
  quizIdMax,
}) => {
  return (
    <div className="w-full h-80 my-5 flex flex-col align-center justify-around">
      <SelectInput handleQuizId={handleQuizId} />
      <p className="w-full flex justify-center text-lg text-center font-bold">
        Or
      </p>
      <IdInput
        handleQuizId={handleQuizId}
        quizIdMin={quizIdMin}
        quizIdMax={quizIdMax}
      />
    </div>
  );
};
export default HomePageInputs;
