import { useSelected } from "@/contexts/selectedContext";
import styled from "@emotion/styled";
import { useEffect } from "react";
import { FiMapPin } from "react-icons/fi";
import Link from "next/link";

declare global {
  interface Window {
    kakao: any;
  }
}
const MapArea = styled.div`
  .road_map {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;

    strong {
      color: #666;
      font-size: 2rem;
    }

    a {
      gap: 0.4rem;
      padding: 1rem 2rem;
    }
  }
`;
export default function DetailMap() {
  const { selectedCamping } = useSelected();
  const mapX = Number(selectedCamping?.mapX);
  const mapY = Number(selectedCamping?.mapY);
  const MAP_KEY = process.env.NEXT_PUBLIC_KAKAO_MAP_KEY;

  useEffect(() => {
    if (!selectedCamping) return;

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
  }, [selectedCamping]);
  return (
    <MapArea>
      <div
        id="map"
        style={{ width: "100%", height: "40rem", marginTop: "4rem" }}
      />
      <div className="road_map">
        <strong>{selectedCamping?.addr1}</strong>
        <Link
          href={`https://map.kakao.com/link/to/${selectedCamping?.facltNm},${selectedCamping?.mapY},${selectedCamping?.mapX}`}
        >
          <a>
            <FiMapPin />길 찾기
          </a>
        </Link>
      </div>
    </MapArea>
  );
}
