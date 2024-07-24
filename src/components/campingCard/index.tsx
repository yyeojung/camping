import styled from "@emotion/styled";
import LikeBtn from "../likeBtn";
import { LocationIcon } from "../locationIcon";
import { BsImage } from "react-icons/bs";

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

interface IPropsCampingList {
  list: ICampingList[];
  className?: string;
}

export default function CampingCard({ list, className }: IPropsCampingList) {
  return (
    <>
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
    </>
  );
}
