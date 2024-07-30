import styled from "@emotion/styled";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

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
    font-size: 1.4rem;

    &:hover {
      background: #e0e0e0;
    }
  }
`;

interface IImageList {
  serialNum: number;
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

interface IPropsImageDetail {
  onClick?: () => void;
}

export default function ImageDetail({ onClick }: IPropsImageDetail) {
  const [imageUrl, setImageUrl] = useState<IImageList[]>([]);
  const router = useRouter();
  const contentId = Number(router.query.contentId);

  const SERVICE_KEY = process.env.NEXT_PUBLIC_SERVICE_KEY;

  useEffect(() => {
    async function fetchData(): Promise<void> {
      if (!contentId) return;

      try {
        const response = await axios.get<IApiResponse>(
          `http://apis.data.go.kr/B551011/GoCamping/imageList?serviceKey=${SERVICE_KEY}&MobileOS=ETC&MobileApp=dayCamping&contentId=${contentId}&_type=json`,
        );
        setImageUrl(response.data.response?.body?.items.item);
      } catch (e) {
        console.error(e);
      }
    }
    void fetchData();
  }, [contentId, SERVICE_KEY]);

  const campingImage = imageUrl.slice(1, 6); // 1번 이미지는 정보 이미지 같아서 우선 제외
  return (
    <>
      <ImgWrap onClick={onClick}>
        <div className="left">
          <div className="img">
            <img src={campingImage[0]?.imageUrl} alt="캠핑이미지" />
          </div>
        </div>
        <div className="right">
          <div>
            <div className="img">
              <img src={campingImage[1]?.imageUrl} alt="캠핑이미지" />
            </div>
            <div className="img">
              <img src={campingImage[2]?.imageUrl} alt="캠핑이미지" />
            </div>
          </div>
          <div>
            <div className="img">
              <img src={campingImage[3]?.imageUrl} alt="캠핑이미지" />
            </div>
            <div className="img">
              <img src={campingImage[4]?.imageUrl} alt="캠핑이미지" />
            </div>
          </div>
        </div>
        <button className="all_view">전체 사진 보기</button>
      </ImgWrap>
    </>
  );
}
