import ContactForm from "./custom-ui/ContactForm"

export default function ContactMe():JSX.Element{
    return(
        <div id="contact-me" className="min-h-[65vh] lg:h-[100vh] w-[85vw] 2xl:w-[70vw] flex items-center">
            <div className="flex flex-col lg:flex-row items-center lg:justify-between w-full gap-10">
                <div className="text-3xl lg:text-8xl md:mb-5 flex gap-2 lg:gap-4 lg:flex-col lg:justify-center lg:items-center font-bold">
                    <div>Contact</div>
                    <div>Me</div>
                </div>
                <ContactForm />
            </div>
        </div>
    )
}