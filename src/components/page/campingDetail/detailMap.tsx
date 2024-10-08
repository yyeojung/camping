import styled from "@emotion/styled";
import { useEffect } from "react";
import { FiMapPin } from "react-icons/fi";
import Link from "next/link";
import { useCampingData } from "@/hooks/useCampingData";

declare global {
  interface Window {
    kakao: any;
  }
}
const MapArea = styled.div`
  .road_map {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 2rem;

    strong {
      color: #666;
      font-size: 2rem;
    }

    a {
      background: #67794a;
      color: #fff;
      border-radius: 1rem;
      min-width: 11.4rem;
      display: flex;
      gap: 0.4rem;
      padding: 1rem 2rem;
    }
  }
`;
export default function DetailMap() {
  //   const { selectedCamping } = useSelected();
  const { selectedData } = useCampingData(); // 검색화면에서 넘겨주는게 아닌 쿼리에 맞는 데이터 가져오기
  const mapX = Number(selectedData?.mapX);
  const mapY = Number(selectedData?.mapY);
  const MAP_KEY = process.env.NEXT_PUBLIC_KAKAO_MAP_KEY;

  useEffect(() => {
    if (!selectedData) return;

    const kakaoMapScript = document.createElement("script");
    kakaoMapScript.async = false;
    kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${MAP_KEY}&autoload=false`;
    document.head.appendChild(kakaoMapScript);

    const onLoadKakaoAPI = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(mapY, mapX),
          level: 3,
        };

        const map = new window.kakao.maps.Map(container, options);

        // 지도에 마커 추가
        const markerPosition = new window.kakao.maps.LatLng(mapY, mapX);
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });

        marker.setMap(map);
      });
    };

    kakaoMapScript.addEventListener("load", onLoadKakaoAPI);
  }, [selectedData]);
  return (
    <MapArea>
      <div
        id="map"
        style={{ width: "100%", height: "40rem", marginTop: "4rem" }}
      />
      <div className="road_map">
        <strong>{selectedData?.addr1}</strong>
        <Link
          href={`https://map.kakao.com/link/to/${selectedData?.facltNm},${selectedData?.mapY},${selectedData?.mapX}`}
        >
          <a target="_blank">
            <FiMapPin />길 찾기
          </a>
        </Link>
      </div>
    </MapArea>
  );
}
