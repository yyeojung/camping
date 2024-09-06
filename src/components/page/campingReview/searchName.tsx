import { useCampingData } from "@/hooks/useCampingData";
import { useEffect, useState } from "react";

export default function SearchName() {
  const [data] = useCampingData();
  const [facltNm, setFacltNm] = useState<Array<{
    contentId: string;
    facltNm: string;
  }> | null>(null); // 캠핑장 이름 배열
  const [searchInput, setSearchInput] = useState<string>(""); // 검색어 상태
  const [filteredFacltNm, setFilteredFacltNm] = useState<
    Array<{ contentId: string; facltNm: string }>
  >([]); // 필터링된 캠핑장 이름
  const [searchOpen, setSearchOpen] = useState<boolean>(false); // 검색 목록 오픈

  useEffect(() => {
    if (data) {
      const facltNmList = data.map((item) => ({
        contentId: item.contentId,
        facltNm: item.facltNm,
      }));
      setFacltNm(facltNmList);
    }
  }, [data]);

  // 캠핑장 이름 필터링
  useEffect(() => {
    if (facltNm) {
      const filtered = facltNm.filter((item) =>
        // 캠핑장 이름이 입력한 input을 포함하고 있는지 확인
        item.facltNm.toLowerCase().includes(searchInput.toLowerCase()),
      );
      setFilteredFacltNm(filtered);
    }
  }, [searchInput, facltNm]);

  const onSearchName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    setSearchOpen(true);
  };

  const onClickName = (name: string) => {
    setSearchInput(name);
    setSearchOpen(false);
  };
  return (
    <div>
      <input type="text" onChange={onSearchName} value={searchInput} />
      <ul>
        {searchOpen &&
          filteredFacltNm.map((item, index) => (
            <li key={item.contentId}>
              <button
                onClick={() => {
                  onClickName(item.facltNm);
                }}
              >
                {name}
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}
