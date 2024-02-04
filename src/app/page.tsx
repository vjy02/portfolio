import Hero from "../components/main/Hero"
import Featured from "../components/main/Featured"
import ContactMe from "../components/main/ContactMe"

export default function Home() {
  return (
  <div className="flex flex-col">
    <Hero />
    <Featured />
    <ContactMe />
  </div>
  )
}