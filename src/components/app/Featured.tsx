import { FeaturedCarousel } from "./custom-ui/FeaturedCarousel"

export default function Featured(): JSX.Element {
 return (
    <div id="featured" className="min-h-[55vh] lg:h-[100vh] flex justify-center items-center">
      <div className="flex flex-col items-center justify-between">
        <h1 className="text-3xl md:text-5xl mb-5 md:mb-16 font-bold">Featured Projects</h1>
        <FeaturedCarousel />
      </div>
    </div>
 );
}
