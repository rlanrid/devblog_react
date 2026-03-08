import { useEffect } from "react";

export const useLockBodyScroll = ({ active, onClose, breakpoint = 980 }) => {
  useEffect(() => {
    const getScrollbarWidth = () =>
      window.innerWidth - document.documentElement.clientWidth;

    const scrollBarWidth = getScrollbarWidth();

    if (active) {
      if (scrollBarWidth > 0) {
        document.body.style.paddingRight = `${scrollBarWidth}px`;
      }
      document.body.classList.add("is-locked");
    } else {
      document.body.style.paddingRight = "";
      document.body.classList.remove("is-locked");
    }

    const handleResize = () => {
      if (window.innerWidth >= breakpoint && active) {
        if (typeof onClose === "function") {
          onClose();
        }
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.body.style.paddingRight = "";
      document.body.classList.remove("is-locked");
    };
  }, [active, onClose, breakpoint]);
};

