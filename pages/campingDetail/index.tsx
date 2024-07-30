import ImageDetail from "@/components/campingDetail/imageDetail";
import LikeBtn from "@/components/likeBtn";
import ImageDetailModal from "@/components/modal/imageDetailModal";
import { useModal } from "@/hooks/useModal";
import styled from "@emotion/styled";
import { FaRegCopy, FaLink } from "react-icons/fa6";

const Section = styled.section`
  padding-bottom: 4rem;
  border-bottom: 0.1rem solid #cacaca;

  &:not(:first-of-type) {
    padding: 4rem 0;
  }
`;
const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2.4rem;
  ul li {
    display: flex;
    align-items: center;

    strong {
      font-size: 2.4rem;
    }
  }
  li ~ li {
    margin-top: 0.6rem;
  }

  .icon_wrap {
    display: flex;
    gap: 0.8rem;

    button {
      border: 0.1rem solid #cacaca;
      &:hover {
        box-shadow: 0.2rem 0.2rem 0.8rem 0.2rem rgba(0, 0, 0, 0.1);
      }
    }
    .like {
      box-shadow: none;
    }
    .link {
      width: 3.6rem;
      height: 3.6rem;
      border-radius: 50%;

      svg {
        fill: #545151;
        width: 2rem;
        height: 2.4rem;
      }
    }
  }
`;
const Info = styled.div`
  .tag {
    display: flex;
    gap: 0.6rem;

    li {
      margin: 2rem 0;
      padding: 0.5rem 1rem;
      background: #dae3ca;
      border-radius: 0.8rem;
    }
  }

  p {
    strong {
      display: inline-block;
      width: 7rem;
    }

    &.divider {
      display: flex;
      align-items: center;

      span {
        width: 0.1rem;
        height: 1.4rem;
        margin: 0 0.6rem;
        background: #222;
      }
    }
  }
  p ~ p {
    margin-top: 1rem;
  }
`;
export default function CampingDetail() {
  const { isShowing, modalToggle } = useModal();
  const onClickImage = () => {
    modalToggle();
  };
  return (
    <>
      <Section>
        <Title>
          <ul>
            <li>
              <strong>(주) 아웃오브파크</strong>
            </li>
            <li>
              <button>
                <span>주소주소주소</span>
                <FaRegCopy style={{ marginLeft: ".4rem" }} />
              </button>
            </li>
          </ul>
          <div className="icon_wrap">
            <button className="link">
              <FaLink />
            </button>
            <LikeBtn className="like" />
          </div>
        </Title>
        <ImageDetail onClick={onClickImage} />
        {isShowing && (
          <ImageDetailModal isShowing={isShowing} hide={modalToggle} />
        )}
        <Info>
          <ul className="tag">
            <li>수영장</li>
            <li>수영장</li>
            <li>수영장</li>
          </ul>
          <p>
            <strong>업종</strong>카라반, 일반 야영장,,
          </p>
          <p>
            <strong>홈페이지</strong>http:ssss
          </p>
          <p>
            <strong>연락처</strong>1588-1896
          </p>
          <p className="divider">
            화로대 개별
            <span></span>
            반려동물 출입 불가능
          </p>
        </Info>
      </Section>
      <Section>
        <p>
          아웃오브파트는 강원도 춘천시 남면에 자리했다. 서울양양고속도로
          강촌IC에서 엘리시안강촌 방면으로 30분가량 달리면 도착한다. 이곳은
          북한강 변의 수려한 풍광을 배경으로 캐러밴 40대가 들어찼다.
          고급스러움이 돋보이는 유럽피안 캐러밴과 에어스트림 캐러밴이다. 모든
          캐러밴은 각기 다른 주제로 꾸몄다. 이 덕분에 욕실에 중점을 둔 객실이나
          침실에 초점을 맞춘 객실 등 취향에 따라 선택하는 재미가 있다. 외부에는
          어닝 아래 테이블, 의자, 노천욕탕, 바비큐 시설을 마련했다. 캠핑장의
          강점 중 하나는 부대시설이다. 카페, 수영장, 찜질방, 스파, 중앙 무대,
          분수, 노래방 등 고급스러움으로 치장한 시설이 차고 넘친다.
        </p>
      </Section>
      <Section>
        <strong>오시는 길</strong>
        <p>지도</p>
        <p>오는 길 설명</p>
      </Section>
      <Section>
        <strong>오시는 길</strong>
        <p>준비중</p>
      </Section>
    </>
  );
}
