import { useState } from "react";
import { useRouter } from "next/router";

export function useSearch() {
  const [region, setRegion] = useState<string>("");
  const [subRegion, setSubRegion] = useState<string | null>(null);
  const router = useRouter();

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
      alert("지역을 선택해주세요!");
    }
  };

  return { region, subRegion, onChangeSearch, onClickSearch };
}
