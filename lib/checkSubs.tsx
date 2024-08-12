import axios from "axios"
type Params = {
  userId: number
}
export default async function checkSubs({ userId }: Params) {
  const BASE_URL = `https://api.telegram.org/bot${process.env.token}`
  const params = {
    chat_id: -1001716853101,
    user_id: userId,
  }
  try {
    const result = await axios.get("/getChatMember", {
      baseURL: BASE_URL,
      params,
    })
    return result.data.ok
  } catch (e) {
    return false
  }
}
