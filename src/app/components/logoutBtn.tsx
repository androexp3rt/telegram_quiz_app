"use client"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function LogoutBtn() {
  const router = useRouter()
  const handleLogout = () => {
    sessionStorage.clear()
    router.push("/login")
  }
  const content = (
    <button className="bg-blue-400 px-5 py-1 rounded-xl" onClick={handleLogout}>
      <Image
        className="w-8 h-8"
        src="/logout2.png"
        alt="Logout"
        width={30}
        height={30}
      />
    </button>
  )
  return content
}
