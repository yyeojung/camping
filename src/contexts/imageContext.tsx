import { createContext, type ReactNode, useContext, useState } from "react";

export interface IImageList {
  serialNum: number;
  imageUrl: string;
}

interface ImageContextType {
  imageData: IImageList[];
  setImageData: (data: IImageList[]) => void;
}

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export const ImageProvider = ({ children }: { children: ReactNode }) => {
  const [imageData, setImageData] = useState<IImageList[]>([]);

  return (
    <ImageContext.Provider value={{ imageData, setImageData }}>
      {children}
    </ImageContext.Provider>
  );
};

export const useImage = () => {
  const context = useContext(ImageContext);
  if (context === undefined) {
    throw new Error("context가 없을 경우");
  }
  return context;
};
