import { useMediaQuery } from "react-responsive";

export const useIsMobile = () => {
  return useMediaQuery({ query: "(max-width: 767px)" });
};
export const useIsTablet = () => {
  return useMediaQuery({ query: "(min-width: 768px) and (max-width: 1024px)" });
};
