import NoData from "@/components/noData";
import styled from "@emotion/styled";

const Wrap = styled.div`
  display: flex;
  align-items: center;
  height: calc(100vh - 8rem);
`;
export default function CampingReview() {
  return (
    <Wrap>
      <NoData>
        <p>준비 중입니다.</p>
      </NoData>
    </Wrap>
  );
}
