import DragScroll from "@/components/dragScroll/dragScroll";
import { useSelected } from "@/contexts/selectedContext";
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
  const { selectedCamping } = useSelected();

  // 부대시설, 업종 배열로 변경
  const arrSbrsCl = selectedCamping?.sbrsCl.split(",");
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
        {selectedCamping?.induty}
      </p>
      <p>
        <strong>홈페이지</strong>

        {selectedCamping?.homepage ? (
          <Link href={selectedCamping?.homepage}>
            <a target="_blank">{selectedCamping?.homepage}</a>
          </Link>
        ) : (
          "홈페이지 정보 없음"
        )}
      </p>
      <p>
        <strong>연락처</strong>
        {selectedCamping?.tel ? selectedCamping?.tel : "직접 문의"}
      </p>
      <p className="divider">
        <strong>화로대</strong>
        <span>
          {selectedCamping?.brazierCl
            ? selectedCamping?.brazierCl
            : "직접 문의"}
        </span>
        <i></i>
        <strong>반려동물 출입</strong>
        <span>
          {selectedCamping?.animalCmgCl
            ? selectedCamping?.animalCmgCl
            : "직접 문의"}
        </span>
      </p>
    </Info>
  );
}
