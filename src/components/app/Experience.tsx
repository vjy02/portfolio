import { motion } from "framer-motion";
import ExperiencesTimeline from "./components/ExperiencesTimeline";

export default function Experience(): JSX.Element{
    
    return(
        <section className="min-h-[55vh] lg:h-fit lg:w-[95vw] flex flex-col justify-between items-center relative">
            {/*eslint-disable-next-line react/no-unescaped-entities*/}
            <h1 className="text-3xl md:text-5xl my-16 md:my-32">Where I have worked.</h1>
            <div className="absolute top-[70%]" id="experience"></div>
            <ExperiencesTimeline />
        </section>
    )
}