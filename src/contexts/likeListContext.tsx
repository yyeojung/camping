import { getLikeList } from "@/firebase/likeList";
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth } from "./authContext";

interface LikeContextType {
  likedItems: Set<number>; // 좋아요한 아이템의 ID를 Set으로 관리
  toggleLike: (itemId: number) => void;
  isLiked: (itemId: number) => boolean;
}

const LikeContext = createContext<LikeContextType | undefined>(undefined);

export const LikeProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [likedItems, setLikedItems] = useState<Set<number>>(new Set());

  // 사용자 ID를 통해 좋아요 상태를 초기화합니다.
  useEffect(() => {
    const fetchLikedItems = async () => {
      // 유저의 좋아요 목록을 가져옵니다.
      if (user) {
        const likeList = await getLikeList(user.uid);
        const likedItemIds = likeList?.map((item) => item.contentId);
        setLikedItems(new Set(likedItemIds));
      }
    };

    void fetchLikedItems();
  }, []); // 빈 배열로 빈 효과만 초기화 시 호출

  const toggleLike = (itemId: number) => {
    setLikedItems((prev) => {
      const newLikedItems = new Set(prev);
      if (newLikedItems.has(itemId)) {
        newLikedItems.delete(itemId);
      } else {
        newLikedItems.add(itemId);
      }
      return newLikedItems;
    });
  };

  const isLiked = (itemId: number) => likedItems.has(itemId);

  return (
    <LikeContext.Provider value={{ likedItems, toggleLike, isLiked }}>
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
