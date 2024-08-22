import axios from "axios"
type Params = {
  userId: number
}
export default async function checkSubs({ userId }: Params) {
  const BASE_URL = `https://api.telegram.org/bot${process.env.NEXT_PUBLIC_TOKEN}`
  const params = {
    chat_id: -1002199305321, //test dev channel
    user_id: userId,
  }
  try {
    const result = await axios.get("/getChatMember", {
      baseURL: BASE_URL,
      params,
    })
    if ( result.data.result.status === "member" || result.data.result.status === "administrator" )  {
      return true
    } else {
      return false
    }
  } catch (e) {
    return false
  }
}
