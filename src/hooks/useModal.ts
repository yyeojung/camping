import { useState } from "react";

export function useModal() {
  const [isShowing, setIsShowing] = useState(false);

  const modalToggle = () => {
    setIsShowing((prev) => !prev);
  };

  return {
    isShowing,
    modalToggle,
  };
}
