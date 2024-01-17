import { useEffect } from "react";

const useOutsideClick = (ref, cb, exception) => {
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        event.target.id !== exception
      ) {
        cb();
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [ref, cb]);
};

export default useOutsideClick;
