import { type ICampingList } from "@/commons/type/commonType";
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface SelectedContextType {
  selectedCamping: ICampingList | null;
  setSelectedCamping: (item: ICampingList) => void;
}

const SelectedContext = createContext<SelectedContextType | undefined>(
  undefined,
);

export const SelectedProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCamping, setSelectedCamping] = useState<ICampingList | null>(
    null,
  );
  useEffect(() => {
    const storedCamping = localStorage.getItem("selectedCamping");
    if (storedCamping) {
      const localCamping: ICampingList | null = JSON.parse(storedCamping);
      setSelectedCamping(localCamping);
    }
  }, []);

  useEffect(() => {
    if (selectedCamping) {
      localStorage.setItem("selectedCamping", JSON.stringify(selectedCamping));
    }
  }, [selectedCamping]);

  return (
    <SelectedContext.Provider value={{ selectedCamping, setSelectedCamping }}>
      {children}
    </SelectedContext.Provider>
  );
};

export const useSelected = () => {
  const context = useContext(SelectedContext);
  if (context === undefined) {
    throw new Error("context가 없을 경우");
  }
  return context;
};
