"use client"
import Heading from "./components/heading"
import InputsStartContainer from "./components/inputsStartContainer/inputsStartContainer"
import ErrorBoundary from "./components/ErrorBoundary"
import Navbar from "./components/Navbar"

export default function Home() {
  return (
    <ErrorBoundary>
      <main className="min-h-screen">
        <Navbar back={false} />
        <section className="p-5">
          <Heading />
          <InputsStartContainer />
        </section>
      </main>
    </ErrorBoundary>
  )
}
