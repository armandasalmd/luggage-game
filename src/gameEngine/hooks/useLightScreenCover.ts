import { useEffect } from "react";

export function useLightScreenCover() {
  useEffect(() => {
    const coverElem: any = document.querySelector("#screen-cover");

    if (coverElem) {
      coverElem.style.display = "block";
      coverElem.classList.add("screenCoverDarkMode");
    }
    return () => {
      if (coverElem) {
        coverElem.style.display = "none";
        coverElem.classList.remove("screenCoverDarkMode");
      }
    }
  }, []);
}