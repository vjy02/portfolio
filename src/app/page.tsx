import Hero from "../components/main/Hero"
import Featured from "../components/main/Featured"

export default function Home() {
  return (
  <div className="flex flex-col">
    <Hero />
    <Featured />
  </div>
  )
}