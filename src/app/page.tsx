import Hero from "../components/app/Hero"
import Featured from "../components/app/Featured"
import ContactMe from "../components/app/ContactMe"

export default function Home() {

  return (
  <div className="flex flex-col items-center gap-16 p-10">
    <Hero />
    <Featured />
    <ContactMe />
  </div>
  )
}