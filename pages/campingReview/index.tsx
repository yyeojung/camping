import SubContents from "@/commons/layout/subContents";
import SubTitle from "@/commons/layout/subTitle";
import NoData from "@/components/noData";
import styled from "@emotion/styled";

const Wrap = styled.div``;
export default function CampingReview() {
  return (
    <Wrap>
      <SubTitle>
        <h2>요즘 캠핑 후기</h2>
      </SubTitle>
      <SubContents>
        <NoData>
          <p>준비 중입니다.</p>
        </NoData>
      </SubContents>
    </Wrap>
  );
}
