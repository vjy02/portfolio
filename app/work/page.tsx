import { JobExperienceCard } from "@/components/JobExperienceCard";
import { JOB_EXPERIENCES } from "@/data/constants";

export default function Page() {
  return (
    <section className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold mb-2">corporate life</h1>
      <div className="flex flex-col gap-10">
        {JOB_EXPERIENCES.map((jobData) => (
          <JobExperienceCard
            key={jobData.company + jobData.date}
            {...jobData}
          />
        ))}
      </div>
      <a className="text-sm mx-auto mt-8">and more to come...</a>
    </section>
  );
}
