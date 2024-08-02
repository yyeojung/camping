import { createContext, type ReactNode, useContext, useState } from "react";

interface SearchContextType {
  region: string;
  setRegion: React.Dispatch<React.SetStateAction<string>>;
  subRegion: string | null;
  setSubRegion: React.Dispatch<React.SetStateAction<string | null>>;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [region, setRegion] = useState<string>("");
  const [subRegion, setSubRegion] = useState<string | null>(null);

  //   useEffect(() => {
  //     const storedRegion = localStorage.getItem("region");
  //     const storedSubRegion = localStorage.getItem("subRegion");

  //     if (storedRegion) {
  //       const localRegion: string = JSON.parse(storedRegion);
  //       setRegion(localRegion);
  //     }
  //     if (storedSubRegion) {
  //       const localSubRegion: string | null = JSON.parse(storedSubRegion);
  //       setSubRegion(localSubRegion);
  //     }
  //   }, []);

  //   useEffect(() => {
  //     localStorage.setItem("region", region);
  //   }, [region]);

  //   useEffect(() => {
  //     if (subRegion !== null) {
  //       localStorage.setItem("subRegion", subRegion);
  //     }
  //   }, [subRegion]);

  return (
    <SearchContext.Provider
      value={{ region, setRegion, subRegion, setSubRegion }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchState = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("context가 없을 경우r");
  }
  return context;
};
