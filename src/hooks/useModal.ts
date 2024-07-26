import { useState } from "react";

export function useModal() {
  const [isShowing, setIsShowing] = useState(false);

  const modalToggle = () => {
    setIsShowing(!isShowing);
  };

  return {
    isShowing,
    modalToggle,
  };
}
