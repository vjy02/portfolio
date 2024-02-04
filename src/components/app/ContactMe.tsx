import ContactForm from "./custom-ui/ContactForm"

export default function ContactMe():JSX.Element{
    return(
        <div className="min-h-[65vh] lg:h-[100vh] w-[80vw] 2xl:w-[70vw] flex items-center">
            <div className="flex flex-col md:flex-row items-center md:justify-between w-full">
                <div className="text-3xl md:text-8xl mb-5 flex gap-2 md:gap-4 md:flex-col md:justify-center md:items-center">
                    <div>Contact</div>
                    <div>Me</div>
                </div>
                <ContactForm />
            </div>
        </div>
    )
}