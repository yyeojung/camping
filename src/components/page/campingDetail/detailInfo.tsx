import DragScroll from "@/components/dragScroll/dragScroll";
import { useCampingData } from "@/hooks/useCampingData";
import styled from "@emotion/styled";
import Link from "next/link";

const Info = styled.div`
  .tag {
    display: flex;
    gap: 0.6rem;

    div {
      margin-bottom: 2rem;
      padding: 0.5rem 1rem;
      background: #dae3ca;
      border-radius: 0.8rem;
    }
  }

  p {
    display: flex;

    strong {
      display: inline-block;
      min-width: 6.4rem;
      margin-right: 0.8rem;
    }
    a {
      max-width: calc(100% - 7.2rem);
      word-break: break-all;
    }

    &.divider {
      display: flex;
      align-items: center;

      span {
        min-width: 3.2rem;
      }
      i {
        width: 0.1rem;
        height: 1.4rem;
        margin: 0 1.2rem;
        background: #222;
      }
    }
  }
  p ~ p {
    margin-top: 1rem;
  }
`;
export default function DetailInfo() {
  //   const { selectedCamping } = useSelected();
  const { selectedData } = useCampingData(); // 검색화면에서 넘겨주는게 아닌 쿼리에 맞는 데이터 가져오기

  // 부대시설, 업종 배열로 변경
  const arrSbrsCl = selectedData?.sbrsCl.split(",");
  return (
    <Info>
      {arrSbrsCl && arrSbrsCl?.length > 1 ? (
        <DragScroll className="tag">
          {arrSbrsCl?.map((item: string, index: number) => (
            <div key={index}>{item}</div>
          ))}
        </DragScroll>
      ) : null}
      <p>
        <strong>업종</strong>
        {selectedData?.induty}
      </p>
      <p>
        <strong>홈페이지</strong>

        {selectedData?.homepage ? (
          <Link href={selectedData?.homepage} passHref>
            <a target="_blank">{selectedData?.homepage}</a>
          </Link>
        ) : (
          "홈페이지 정보 없음"
        )}
      </p>
      <p>
        <strong>연락처</strong>
        {selectedData?.tel ? selectedData?.tel : "직접 문의"}
      </p>
      <p className="divider">
        <strong>화로대</strong>
        <span>
          {selectedData?.brazierCl ? selectedData?.brazierCl : "직접 문의"}
        </span>
        <i></i>
        <strong>반려동물 출입</strong>
        <span>
          {selectedData?.animalCmgCl ? selectedData?.animalCmgCl : "직접 문의"}
        </span>
      </p>
    </Info>
  );
}
