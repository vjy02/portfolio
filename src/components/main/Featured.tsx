import {FeaturedProjects} from "../FeaturedProjects"

export default function Featured(): JSX.Element {
 return (
    <div className="h-[40vh] lg:h-[92.5vh] flex flex-col items-center justify-around">
      <h1 className="text-3xl md:text-5xl">Featured Projects</h1>
      <FeaturedProjects />
    </div>
 );
}
