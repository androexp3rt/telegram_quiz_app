type QuizResponse = {
  error: boolean
  status: number
  statusMessage: string
  message: string
  response: QuizResResponse
}

type QuizResResponse = {
  quizSolution: QuizSolution
}

type QuizSolution = {
  id: number
  user_id: number
  course_id: number
  title: string
  authors: number
  is_subscribed: boolean
  is_upvote: boolean
  is_favourite: boolean
  is_attempted: boolean
  questions_count: number
  quiz_records_count: number
  content_type: string
  questions: Question[]
  user: [Object]
  quiz_records: [Array]
  is_doubt: boolean
  is_doubt_shown: boolean
  is_doubt_share: boolean
}

type Question = {
  id: number
  quiz_id: number
  solution: string
  previous_year: string
  subject_topic_id: number
  quiz_question_type_id: number
  question: string
  quiz_question_group_id: number
  quiz_difficulty_level_id: number
  mark: string
  negative_mark: string
  bulk_import: boolean
  is_favourite: boolean
  difficult_level: DificultyLevel
  question_group: number
  topics: Topics
  choices: Choice[]
  is_skipped: boolean
}
type DificultyLevel = { id: number; name: String }
type Topics = {
  id: number
  sub_category_id: number
  name: string
  slug: string
  sort_order: number
  is_active: boolean
  created_at: Date
}
type Choice = {
  id: number
  quiz_question_id: number
  choice: string
  content2: string
  is_right_choice: boolean
  user_choices: boolean
  user_choices_get: Function
}
type QuizIdTitle = {
  id: number
  title: string
}
type TelegramUser = {
  auth_date: number
  id: number
  first_name: string
  last_name: string
  hash: string
  username: string
  isSubscriber: boolean
}
type SubscribeBtnProps = {
  width?: string
  padding?: string
  margin?: string
  ImgHeight?: number
}
declare global {
  interface Window {
    DOMPurify: typeof DOMPurify
  }
}
