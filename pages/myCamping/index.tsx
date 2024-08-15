import SubContents from "@/commons/layout/subContents";
import SubTitle from "@/commons/layout/subTitle";
import NoData from "@/components/noData";
import styled from "@emotion/styled";

const Wrap = styled.div``;

export default function MyCamping() {
  return (
    <Wrap>
      <SubTitle>
        <h2>관심 캠핑장</h2>
      </SubTitle>
      <SubContents>
        <NoData>
          <p>준비 중입니다.</p>
        </NoData>
      </SubContents>
    </Wrap>
  );
}
