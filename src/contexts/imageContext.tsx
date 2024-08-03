import axios from "axios";
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export interface IImageList {
  serialnum: number;
  imageUrl: string;
}

interface IApiResponse {
  response: {
    body: {
      items: {
        item: IImageList[];
      };
    };
  };
}
interface ImageContextType {
  imageData: IImageList[];
  setImageData: (data: IImageList[]) => void;
  fetchImageData: (contentId: number) => Promise<void>;
  loading: boolean;
}

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export const ImageProvider = ({ children }: { children: ReactNode }) => {
  const [imageData, setImageData] = useState<IImageList[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const SERVICE_KEY = process.env.NEXT_PUBLIC_SERVICE_KEY;

  // 이미지 로컬 스토리지에 저장
  useEffect(() => {
    const storedImage = localStorage.getItem("imageData");
    if (storedImage) {
      const localImage: IImageList[] = JSON.parse(storedImage);
      setImageData(localImage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("imageData", JSON.stringify(imageData));
  }, [imageData]); // imageData가 변경될 때만 실행

  const fetchImageData = async (contentId: number) => {
    if (!contentId) return;
    setLoading(true);
    try {
      const response = await axios.get<IApiResponse>(
        `http://apis.data.go.kr/B551011/GoCamping/imageList?serviceKey=${SERVICE_KEY}&MobileOS=ETC&MobileApp=dayCamping&contentId=${contentId}&numOfRows=30&_type=json`,
      );
      setImageData(response.data.response?.body?.items.item || []);
      console.log(response.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <ImageContext.Provider
      value={{ loading, imageData, setImageData, fetchImageData }}
    >
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
