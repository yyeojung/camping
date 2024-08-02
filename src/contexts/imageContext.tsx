import { createContext, type ReactNode, useContext, useState } from "react";

export interface IImageList {
  serialnum: number;
  imageUrl: string;
}

interface ImageContextType {
  imageData: IImageList[];
  setImageData: (data: IImageList[]) => void;
}

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export const ImageProvider = ({ children }: { children: ReactNode }) => {
  const [imageData, setImageData] = useState<IImageList[]>([]);

  //   useEffect(() => {
  //     const storedImage = localStorage.getItem("imageData");
  //     if (storedImage) {
  //       const localImage: IImageList[] = JSON.parse(storedImage);
  //       setImageData(localImage);
  //     }
  //   });

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
