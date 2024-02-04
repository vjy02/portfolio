import ContactForm from "./custom-ui/ContactForm"

export default function ContactMe():JSX.Element{
    return(
        <div className="min-h-[65vh] lg:h-[100vh] w-[80vw] flex justify-center items-center">
            <div className="flex flex-col md:flex-row items-center md:justify-between md:w-[80%]">
                <div className="text-3xl md:text-8xl mb-5 flex gap-2 md:gap-4 md:flex-col md:justify-center md:items-center">
                    <div>Contact</div>
                    <div>Me</div>
                </div>
                <ContactForm />
            </div>
        </div>
    )
}