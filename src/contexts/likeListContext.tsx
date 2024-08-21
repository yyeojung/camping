import { createContext, type ReactNode, useContext, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "@/firebase/firebase";
import { type ICampingList } from "@/commons/type/commonType";

interface LikeContextType {
  like: boolean;
  setCampingItem: (item: ICampingList) => void;
  campingItem: ICampingList | null;
  addItem: () => Promise<void>;
}

const LikeContext = createContext<LikeContextType | undefined>(undefined);

export const LikeProvider = ({ children }: { children: ReactNode }) => {
  const [like, setLike] = useState<boolean>(false);
  const [campingItem, setCampingItem] = useState<ICampingList | null>(null);
  const user = auth.currentUser;

  const addItem = async () => {
    if (!campingItem || !user) return;

    try {
      await addDoc(collection(db, "likeList"), {
        userId: user?.uid,
        like: true,
        campingItem: {
          facltNm: campingItem.facltNm,
          lineIntro: campingItem.lineIntro,
          intro: campingItem.intro,
          addr1: campingItem.addr1,
          firstImageUrl: campingItem.firstImageUrl,
          themaEnvrnCl: campingItem.themaEnvrnCl,
          tel: campingItem.tel,
          contentId: campingItem.contentId,
          lctCl: campingItem.lctCl,
          induty: campingItem.induty,
          doNm: campingItem.doNm,
          sigunguNm: campingItem.sigunguNm,
          direction: campingItem.direction,
          brazierCl: campingItem.brazierCl,
          sbrsCl: campingItem.sbrsCl,
          sbrsEtc: campingItem.sbrsEtc,
          homepage: campingItem.homepage,
          animalCmgCl: campingItem.animalCmgCl,
          tooltip: campingItem.tooltip,
          mapX: campingItem.mapX,
          mapY: campingItem.mapY,
        },
      });
      setLike(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LikeContext.Provider
      value={{ like, addItem, campingItem, setCampingItem }}
    >
      {children}
    </LikeContext.Provider>
  );
};

export const useLikeList = () => {
  const context = useContext(LikeContext);
  if (context === undefined) {
    throw new Error("context가 없을 경우");
  }
  return context;
};
