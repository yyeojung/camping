import { useSelected } from "@/contexts/selectedContext";
import { useEffect } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

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
    <div
      id="map"
      style={{ width: "100%", height: "40rem", marginTop: "4rem" }}
    />
  );
}
