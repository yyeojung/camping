import { useImage } from "@/contexts/imageContext";
import { useIsMobile } from "@/hooks/useMediaQuery";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { FaCampground } from "react-icons/fa";

const ImgWrap = styled.div`
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
  border-radius: 2rem;
  overflow: hidden;
  min-height: 30rem;
  position: relative;

  div {
    flex: 1;
  }

  .img {
    position: relative;
    cursor: pointer;

    &:hover::before {
      position: absolute;
      display: block;
      content: "";
      width: 100%;
      height: 100%;
      clear: both;
      background: rgba(0, 0, 0, 0.2);
    }
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .left {
    position: relative;
    padding-top: 50%;

    .img {
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .right {
    display: flex;
    gap: 1rem;

    div {
      display: flex;
      gap: 1rem;
      flex-direction: column;
    }
  }

  .all_view {
    height: 3.4rem;
    padding: 1rem 2rem;
    position: absolute;
    right: 2rem;
    bottom: 2rem;
    color: #000;
    font-size: 1.4rem;
    background: #fff;

    &:hover {
      background: #e0e0e0;
    }
  }

  &.empty_wrap {
    padding-top: 50%;

    .empty {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #ccc;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      color: #555;
      gap: 1rem;
    }
  }
`;

const NoDataIcon = styled(FaCampground)`
  width: 10rem;
  height: 10rem;
  fill: #949494;
`;

interface IPropsImageDetail {
  onClick?: () => void;
}

export default function ImageDetail({ onClick }: IPropsImageDetail) {
  const { loading, imageData, fetchImageData } = useImage();
  const router = useRouter();
  const contentId = Number(router.query.contentId);
  const isMobile = useIsMobile();
  // const [loading, setLoading] = useState<boolean>(true);

  // const SERVICE_KEY = process.env.NEXT_PUBLIC_SERVICE_KEY;

  useEffect(() => {
    if (fetchImageData && contentId) {
      void fetchImageData(contentId);
    }
  }, [contentId]);
  // imageContext로 이동
  // useEffct(() => {
  //   setLoading(true);
  //   async function fetchData(): Promise<void> {
  //     if (!contentId) return;

  //     try {
  //       const response = await axios.get<IApiResponse>(
  //         `http://apis.data.go.kr/B551011/GoCamping/imageList?serviceKey=${SERVICE_KEY}&MobileOS=ETC&MobileApp=dayCamping&contentId=${contentId}&numOfRows=30&_type=json`,
  //       );
  //       setImageData(response.data.response?.body?.items.item);
  //     } catch (e) {
  //       console.error(e);e
  //     }
  //   }
  //   void fetchData();
  // }, [contentId, SERVICE_KEY, setImageData]);

  const campingImage = imageData ? imageData.slice(1, 6) : []; // 1번 이미지는 정보 이미지 같아서 우선 제외
  const campingImageLength = campingImage.length;
  return (
    <>
      {/* 이미지가 없거나 로딩중일 때 */}
      {campingImageLength === 0 ?? loading ? (
        <ImgWrap className="empty_wrap">
          <div className="empty">
            <NoDataIcon />
            <p>캠핑장 이미지가 없습니다.</p>
          </div>
        </ImgWrap>
      ) : //   이미지 5개 안되거나 모바일 사이즈일떄
      campingImageLength < 5 || isMobile ? (
        <ImgWrap>
          <div onClick={onClick} className="img">
            <img src={campingImage[0]?.imageUrl} alt="캠핑이미지" />
          </div>
          <button onClick={onClick} className="all_view">
            전체 사진 보기
          </button>
        </ImgWrap>
      ) : (
        //  이미지 5개 될 떄
        <ImgWrap className="pc">
          <div className="left">
            <div onClick={onClick} className="img">
              <img src={campingImage[0]?.imageUrl} alt="캠핑이미지" />
            </div>
          </div>
          <div className="right">
            <div>
              <div onClick={onClick} className="img">
                <img src={campingImage[1]?.imageUrl} alt="캠핑이미지" />
              </div>
              <div onClick={onClick} className="img">
                <img src={campingImage[2]?.imageUrl} alt="캠핑이미지" />
              </div>
            </div>
            <div>
              <div onClick={onClick} className="img">
                <img src={campingImage[3]?.imageUrl} alt="캠핑이미지" />
              </div>
              <div onClick={onClick} className="img">
                <img src={campingImage[4]?.imageUrl} alt="캠핑이미지" />
              </div>
            </div>
          </div>
          <button onClick={onClick} className="all_view">
            전체 사진 보기
          </button>
        </ImgWrap>
      )}
    </>
  );
}
