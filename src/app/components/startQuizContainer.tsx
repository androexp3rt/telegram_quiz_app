import { useRouter } from "next/navigation";
import SubscribeBtnBox from "./subscribeBtn";

interface StartQuizProps {
  quizId: number;
  quizIdMin: number;
  quizIdMax: number;
  isSubscriber: boolean;
}
const StartQuizContainer: React.FC<StartQuizProps> = ({
  quizId,
  quizIdMin,
  quizIdMax,
  isSubscriber,
}) => {
  const router = useRouter();
  function startQuiz() {
    router.push(`/${quizId}`);
  }
  if (quizIdMin <= quizId && quizId <= quizIdMax) {
    if (isSubscriber) {
      return (
        <div className="w-full h-24 flex flex-col align-center justify-center">
          <p className="w-full text-center my-2">
            Your Quiz is ready. Please click start Button to start
          </p>
          <button
            className="bg-green-500 self-center rounded-full px-4 py-2"
            onClick={startQuiz}
          >
            Start
          </button>
        </div>
      );
    } else {
      return (
        <div className="w-full h-24 flex flex-col align-center justify-center">
          <p className="w-full text-center my-2">
            To enroll the quiz, please subscribe to our channel first.
          </p>
          <SubscribeBtnBox />
        </div>
      );
    }
  } else if (quizId === 0) {
    return (
      <p className="w-full text-red-600 text-center">
        Quiz ID not selected/entered
      </p>
    );
  } else {
    return <p className="w-full text-red-600 text-center">Invalid Quiz ID</p>;
  }
};
export default StartQuizContainer;
