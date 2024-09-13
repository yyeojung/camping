import { type ICampingData } from "@/commons/type/commonType";
import { realtimeDb } from "@/firebase/firebase";
import { get, ref } from "firebase/database";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const useCampingData = (): {
  database: ICampingData[] | null;
  loading: boolean;
  selectedData: ICampingData | null;
} => {
  const [database, setDatabase] = useState<ICampingData[] | null>(null);
  const [selectedData, setSelectedData] = useState<ICampingData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const dataRef = ref(realtimeDb, "response/body/items/item"); // 내 realtimeDatabase 경로로 접근을 제공
        const snapshot = await get(dataRef); // 참조된 경로의 데이터를 읽어오는 함수

        setLoading(false);
        // snapshot이 존재하는지 확인하는 메서드
        if (snapshot.exists()) {
          const campingData = snapshot.val() as ICampingData[]; // 데이터의 실제 값을 가져오는 메서드
          setDatabase(campingData);

          if (router.query.contentId) {
            const filterData = campingData?.filter(
              (item) => item.contentId === router.query.contentId,
            );
            setSelectedData(filterData[0]);
          } else {
            setSelectedData(null);
          }
        } else {
          setDatabase(null);
          setSelectedData(null);
          console.log("no data");
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };

    void fetchData();
  }, [router.query.contentId]);

  return {
    database,
    loading,
    selectedData,
  };
};
