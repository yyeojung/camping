import { createContext, type ReactNode, useContext, useState } from "react";

interface ICampingList {
  facltNm: string;
  lineIntro?: string;
  intro: string;
  addr1: string;
  induty: string;
  firstImageUrl?: string;
  themaEnvrnCl?: string;
  tel: string;
  contentId: number;
  lctCl?: string;
  doNm: string;
  sigunguNm: string;
  direction: string;
  brazierCl: string;
  sbrsCl: string;
  sbrsEtc: string;
  homepage: string;
  animalCmgCl: string;
  tooltip: string;
  mapX: string;
  mapY: string;
}

interface CampingContextType {
  campingData: ICampingList[];
  setCampingData: (item: ICampingList[]) => void;
}

const CampingContext = createContext<CampingContextType | undefined>(undefined);

export const CampingProvider = ({ children }: { children: ReactNode }) => {
  const [campingData, setCampingData] = useState<ICampingList[]>([]);

  return (
    <CampingContext.Provider value={{ campingData, setCampingData }}>
      {children}
    </CampingContext.Provider>
  );
};

export const useCamping = () => {
  const context = useContext(CampingContext);
  if (!context) {
    throw new Error("context가 없을 경우");
  }
  return context;
};
