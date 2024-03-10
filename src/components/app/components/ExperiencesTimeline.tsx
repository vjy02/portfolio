import { useTheme } from "next-themes";
import React, { useEffect } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import Image from "next/image";
import { motion } from "framer-motion"; 
import { useInView } from 'react-intersection-observer';

export default function ExperiencesTimeline() {
    const experiencesData = [
        {
            title: "Software Engineer Intern",
            location: "Commonwealth Bank",
            date: "Nov. 2023 - Feb. 2024",
            icon: <Image src="/logo/cba.jpg" className="rounded-full" alt={""} width="100" height="100"/>,
            description: "I worked as an intern where I was able to develop a web version of an automated testing framework that relied on a legacy Java version. I was able to devise a CBA standard interface design and functionality leveraging custom made components, internal libraries and external libraries such as Tailwind CSS and MUI."
        },
        {
            title: "IT Intern",
            location: "University of Melbourne",
            date: "Aug. 2023 - Nov. 2023",
            icon: <Image src="/logo/unimelb.png" className="rounded-full" alt={""} width="100" height="100"/>,
            description: "Working at Melbourne Connect, I had the privilege of helping our team accelerate several of our business processes. I was able to develop automated website update workflows, data collection/organising from external API's and most notably develop a CRM gathering over 20,000+ unique client records from these endeavours."
        },
        {
          title: "IT Intern",
          location: "Major Transport Infrastructure Authority",
          date: "Jan. 2023 - Jul. 2023",
          icon: <Image src="/logo/mtia.jpg" className="rounded-full" alt={""} width="100" height="100"/>,
          description: "Working closely with Victoria's Big Build, I played a pivotal role in consolidating and analysing the huge amounts of data we possessed. Employing SQL queries to automate business workflows, develop Python scripts to efficiently extract metadata from our database and utilsing DAX and design principles in aiding the development of our PowerBI reporting needs."
        },
    ]
    
    const { theme } = useTheme();

    return (
       <VerticalTimeline lineColor="" animate={true} className="relative">
         {experiencesData.map((item, index) => {
           // eslint-disable-next-line react-hooks/rules-of-hooks
           const [ref, inView] = useInView({
             triggerOnce: true, // Change to false if you want the animation to trigger again whenever it comes into view
           });
   
           return (
            <div ref={ref} key={index} className={`vertical-timeline-element ${index === 0 ? "absolute -top-9" : "absolute -top-9"}`}>
                 <VerticalTimelineElement
                   visible={inView}
                   contentStyle={{
                    background: theme === "light" ? "" : "rgba(255, 255, 255, 0.05)",
                    boxShadow: "none",
                    border: "1px solid rgba(0, 0, 0, 0.1)",
                    textAlign: "left",
                    padding: "1.3rem 2rem",
                   }}
                   contentArrowStyle={{
                    display: "none",
                   }}
                   date={item.date}
                   icon={item.icon}
                   iconStyle={{
                    background: theme === "light" ? "rgba(255, 255, 255, 0.678)" : "rgba(255, 255, 255, 0.15)",
                    fontSize: "1.5rem",
                   }}
                 >
                   <h3 className="font-semibold capitalize text-xl">{item.title}</h3>
                   <p className="font-normal !mt-0">{item.location}</p>
                   <p className="!mt-1 !font-normal text-gray-700 dark:text-white/75 whitespace-pre-line">
                    {item.description}
                   </p>
                 </VerticalTimelineElement>
                </div>
           );
         })}
       </VerticalTimeline>
    );
   }