import { RefObject, useEffect, useState } from "react";

export default function useOnScreen(ref: RefObject<HTMLElement>) {
    const [isIntersecting, setIntersecting] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setIntersecting(entry.isIntersecting),
            {
                threshold: 0.4, // Adjusted to trigger when 70% of the element is visible
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        // Cleanup function to disconnect the observer when the component unmounts or the ref changes
        return () => {
            observer.disconnect();
        };
    }, [ref]); // Removed 'observer' from the dependency array

    return isIntersecting;
}
