"use client"

import ContactForm from "./components/ContactForm";
import { motion } from "framer-motion";

export default function ContactMe():JSX.Element{
    return(
        <section id="contact-me" className="min-h-[65vh] lg:h-[95vh] w-[85vw] 2xl:w-[70vw] flex items-center px-10">
            <div className="flex flex-col lg:flex-row items-center lg:justify-between w-full gap-4 md:gap-10">
                <div className="text-3xl lg:text-8xl md:mb-5 flex gap-2 lg:gap-4 lg:flex-col lg:justify-center lg:items-center">
                    <motion.div
                        whileInView={{ opacity: 1, x: 0 }}
                        initial={{ opacity: 0, x: -50 }}
                        viewport={{ once: true }}
                        transition={{
                            duration: 1,
                            delay: 0.25
                        }}
                    >
                        Send a
                    </motion.div>
                    <motion.div
                        whileInView={{ opacity: 1, x: 0 }}
                        initial={{ opacity: 0, x: -50 }}
                        viewport={{ once: true }}
                        transition={{
                            duration: 1,
                            delay: 0.5
                        }}
                    >
                        message.
                    </motion.div>
                </div>
                <motion.div
                    whileInView={{ opacity: 1 }}
                    initial={{ opacity: 0 }}
                    viewport={{ once: true }}
                    transition={{
                        duration: 1,
                        delay: 1.25
                    }}
                >
                    <ContactForm />
                </motion.div>
            </div>
        </section>
    )
}