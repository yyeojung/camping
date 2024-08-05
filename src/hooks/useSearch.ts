import { useEffect, useState } from "react";
import { useRouter } from "next/router";
// import { useSearchState } from "@/contexts/searchContext";

export function useSearch() {
  //  뒤로가기 재로딩 이슈 전역 저장
  const [region, setRegion] = useState<string>("");
  const [subRegion, setSubRegion] = useState<string | null>(null);
  //   const { region, setRegion, subRegion, setSubRegion } = useSearchState();
  const router = useRouter();
  //   const [showAlert, setShowAlert] = useState<boolean>(false);
  const { query } = router;

  useEffect(() => {
    // 검색화면 첫진입에서 검색버튼 눌러도 검색 다시 진행되게 추가
    if (query.region) {
      setRegion(query.region as string);
    }
    if (query.subRegion) {
      setSubRegion(query.subRegion as string | null);
    }
  }, [query]);

  const onChangeSearch = (region: string, subRegion: string | null) => {
    setRegion(region);
    setSubRegion(subRegion);
  };

  const onClickSearch = async (): Promise<void> => {
    if ((region !== null && subRegion !== null) || region === "전체") {
      await router
        .push({
          pathname: "/campingList",
          query: { region, subRegion },
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      //   setShowAlert(true);
      await router.push({
        pathname: router.pathname,
        query: { ...router.query, modal: "searchAlert" },
      });
    }
  };

  const onCloseSearchAlret = () => {
    // setShowAlert(false); // 모달 닫기
    router.back();
  };
  return {
    // showAlert,
    region,
    subRegion,
    onCloseSearchAlret,
    onChangeSearch,
    onClickSearch,
  };
}
