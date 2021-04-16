import { useEffect, useState } from "react";
const Progress = () => {
  const [state, setState] = useState(0);
  const handleScroll = (event) => {
    const path = event.path || (event.composedPath && event.composedPath());
    // 30 is the missed size by the browser
    setState(
      Math.round(
        (path[1].scrollY / (document.body.scrollHeight - document.documentElement.clientHeight)) *
          100
      )
    );
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div
      className="fixed top-0 left-0 bg-red h-1 z-50 transition-all duration-50 ease-out"
      style={{ width: `${state}%` }}
    />
  );
};
export default Progress;
