import styled from "@emotion/styled";
import { FaCampground } from "react-icons/fa";

const Wrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  color: #525252;
`;

const NoDataIcon = styled(FaCampground)`
  width: 10rem;
  height: 10rem;
  fill: #ccc;
`;
export default function NoData() {
  return (
    <Wrap>
      <NoDataIcon />
      <p>해당하는 지역에 캠핑장이 없습니다. </p>
    </Wrap>
  );
}
