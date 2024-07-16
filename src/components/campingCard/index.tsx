import styled from "@emotion/styled";
import LikeBtn from "../likeBtn";
import { useEffect, useState } from "react";
import axios from "axios";

const CardWrap = styled.div`
  background: #f8f8f8;
  border-radius: 1.5rem;
  box-shadow: 0 1rem 2rem 0 rgba(0, 0, 0, 0.1);
`;
const CardInner = styled.div`
  background: #fff;
  border-radius: 1.5rem;
  overflow: hidden;
  box-shadow: 0 0.4rem 2rem 0 rgba(0, 0, 0, 0.1);
`;
const ImgBox = styled.div`
  position: relative;
  height: 18rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .like {
    position: absolute;
    right: 1.6rem;
    bottom: -1rem;
  }
`;
const CardInfo = styled.div`
  padding: 1.4rem 1.2rem 2.4rem 1.2rem;
  min-height: 14.8rem;

  li {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    min-height: 1.6rem;
    font-size: 1.4rem;
    strong {
      font-size: 1.8rem;
    }
  }
  li.address {
    margin-top: 2rem;
    color: #4a7b33;
  }
  li ~ li {
    margin-top: 1rem;
  }
`;

const IConWrap = styled.ul`
  display: flex;
  justify-content: space-between;
  padding: 1rem 1.2rem;

  li {
    flex: 1;
  }
  li ~ li {
    border-left: 0.1rem solid #a9a9a9;
  }
`;

const Loading = styled.div`
  font-size: 4rem;
`;

interface ICampingList {
  facltNm: string;
  lineIntro?: string;
  addr1: string;
  firstImageUrl?: string;
  themaEnvrnCl?: string;
  tel: string;
  contentId: number;
}

interface IApiResponse {
  response: {
    body: {
      items: {
        item: ICampingList[];
      };
    };
  };
}

interface IPropsList {
  className?: string;
}
export default function CampingCard({ className }: IPropsList) {
  const [list, setList] = useState<ICampingList[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const SERVICE_KEY = process.env.NEXT_PUBLIC_SERVICE_KEY;

  useEffect(() => {
    async function fetchData(): Promise<void> {
      setLoading(true);
      try {
        const response = await axios.get<IApiResponse>(
          `http://apis.data.go.kr/B551011/GoCamping/basedList?serviceKey=${SERVICE_KEY}&numOfRows=10&pageNo=1&MobileOS=AND&MobileApp=appName&_type=json`,
        );
        setList(response.data.response.body.items.item);
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    }
    void fetchData();
  }, [SERVICE_KEY]);

  if (loading) {
    return <Loading>대기 중..</Loading>;
  }

  if (!list) {
    return null;
  }

  return (
    <>
      {list.map((item: ICampingList) => (
        <CardWrap key={item.contentId} className={className}>
          <CardInner>
            <ImgBox>
              <LikeBtn className="like" />
              <img src={item.firstImageUrl} alt={item.facltNm} />
            </ImgBox>
            <CardInfo>
              <li>
                <strong>{item.facltNm}</strong>
              </li>
              <li>{item.lineIntro ? item.lineIntro : item.themaEnvrnCl}</li>
              <li className="address">{item.addr1}</li>
              <li>{item.tel}</li>
            </CardInfo>
          </CardInner>
          <IConWrap>
            <li>
              <i>icon</i>
            </li>
            <li>
              <i>icon</i>
            </li>
            <li>
              <i>icon</i>
            </li>
          </IConWrap>
        </CardWrap>
      ))}
    </>
  );
}
