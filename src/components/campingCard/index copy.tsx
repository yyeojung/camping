import styled from "@emotion/styled";
import LikeBtn from "../likeBtn";
import { useEffect, useState } from "react";
import axios from "axios";
import { LocationIcon } from "../locationIcon";
import Pagination from "../pagination";
import { responsive } from "@/commons/styles/globalStyles";
import { BsImage } from "react-icons/bs";

const Wrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 4rem 0;
  gap: 4rem 0rem;
  justify-content: space-between;

  .card {
    width: calc((100% - 12rem) / 4);
    @media ${responsive.tablet} {
      width: calc((100% - 4rem) / 3);
    }
    @media ${responsive.mobile} {
      width: 100%;
    }
  }
`;
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
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ccc;
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
    display: flex;
    min-height: 3.2rem;
    align-items: center;
    justify-content: center;
    text-align: center;
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
  lctCl?: string;
}

interface IApiResponse {
  response: {
    body: {
      items: {
        item: ICampingList[];
      };
      totalCount: number;
    };
  };
}

interface IPropsList {
  className?: string;
}

const PER_PAGE = 8; // 한 페이지에 보여줄 아이템 수

export default function CampingCard({ className }: IPropsList) {
  const [list, setList] = useState<ICampingList[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(0); // 현재 페이지 번호
  const [totalCount, setTotalCount] = useState<number>(0); // 전체 캠핑 아이템 수

  const SERVICE_KEY = process.env.NEXT_PUBLIC_SERVICE_KEY;

  // 데이터 불러오기
  useEffect(() => {
    async function fetchData(): Promise<void> {
      setLoading(true);
      try {
        const response = await axios.get<IApiResponse>(
          `http://apis.data.go.kr/B551011/GoCamping/basedList?serviceKey=${SERVICE_KEY}&numOfRows=${PER_PAGE}&pageNo=${currentPage + 1}&MobileOS=AND&MobileApp=appName&_type=json`,
        );
        setList(response.data.response.body.items.item);
        setTotalCount(response.data.response.body.totalCount);
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    }
    void fetchData();
  }, [SERVICE_KEY, currentPage]);

  if (loading) {
    return <Loading>대기 중..</Loading>;
  }

  if (!list) {
    return null;
  }

  const pageCount = Math.ceil(totalCount / PER_PAGE); // 전체 페이지 수 계산

  // 페이지네이션

  const handlePageChange = ({ selected }: { selected: number }): void => {
    setCurrentPage(selected);
    console.log(selected);
    // window.scrollTo(0, 320);
  };

  return (
    <div>
      <Wrap>
        {list.map((item: ICampingList) => {
          // 입지 구분 아이콘 리스트
          const icons = item.lctCl ? item.lctCl.split(",") : [];
          const iconList = icons
            .slice(0, 3)
            .concat(
              Array(3 - icons.length > 0 ? 3 - icons.length : 0).fill("없음"),
            );
          return (
            <CardWrap key={item.contentId} className={className}>
              <CardInner>
                <ImgBox>
                  <LikeBtn className="like" />
                  {item.firstImageUrl ? (
                    <img src={item.firstImageUrl} alt={item.facltNm} />
                  ) : (
                    <BsImage size="48" color="#6e6e6e" />
                  )}
                </ImgBox>
                <CardInfo>
                  <li>
                    <strong>{item.facltNm}</strong>
                  </li>
                  <li>
                    {item.lineIntro
                      ? item.lineIntro
                      : item.themaEnvrnCl
                        ? item.themaEnvrnCl
                        : "-"}
                  </li>
                  <li className="address">{item.addr1}</li>
                  <li>{item.tel ? item.tel : "-"}</li>
                </CardInfo>
              </CardInner>
              <IConWrap>
                {iconList.map((icon, index) => (
                  <li key={index}>
                    <LocationIcon type={icon} />
                  </li>
                ))}
              </IConWrap>
            </CardWrap>
          );
        })}
      </Wrap>
      {/* 페이지네이션 */}
      {pageCount > 0 && (
        <Pagination
          pageCount={pageCount}
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
      )}
    </div>
  );
}
