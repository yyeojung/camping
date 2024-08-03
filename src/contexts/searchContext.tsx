import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface SearchContextType {
  region: string;
  subRegion: string | null;
  setRegion: (region: string) => void;
  setSubRegion: (subRegion: string | null) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchData, setSearchData] = useState<{
    region: string;
    subRegion: string | null;
  }>({ region: "", subRegion: null });

  useEffect(() => {
    const storedSearchData = localStorage.getItem("searchData");
    if (storedSearchData) {
      const localSearchData: { region: string; subRegion: string | null } =
        JSON.parse(storedSearchData);
      setSearchData(localSearchData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("searchData", JSON.stringify(searchData));
  }, [searchData]);

  const setRegion = (region: string) => {
    setSearchData((prev) => ({ ...prev, region }));
  };

  const setSubRegion = (subRegion: string | null) => {
    setSearchData((prev) => ({ ...prev, subRegion }));
  };
  return (
    <SearchContext.Provider value={{ ...searchData, setRegion, setSubRegion }}>
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
