import { useEffect, useRef } from "react";

export function useIntersectionObserver({
  hasNextPage = false,
  isFetchingNextPage = false,
  fetchNextPage = () => {},
}) {
  const intersectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersectionObserver, { threshold: 0.1 });

    function handleIntersectionObserver(entries: IntersectionObserverEntry[]) {
      const [entry] = entries;
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    }

    if (intersectionRef.current) {
      observer.observe(intersectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return intersectionRef;
}
