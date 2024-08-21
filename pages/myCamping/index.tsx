import SubContents from "@/commons/layout/subContents";
import SubTitle from "@/commons/layout/subTitle";
import LikeCampingList from "@/components/myCamping/likeCampingList";
import NoData from "@/components/noData";
import { useAuth } from "@/contexts/authContext";
import styled from "@emotion/styled";

const Wrap = styled.div``;

export default function MyCamping() {
  const { user } = useAuth();

  return (
    <>
      {user ? (
        <Wrap>
          <SubTitle>
            <h2>관심 캠핑장</h2>
          </SubTitle>
          <SubContents>
            <LikeCampingList />
          </SubContents>
        </Wrap>
      ) : (
        <Wrap>
          <SubTitle>
            <h2>관심 캠핑장</h2>
          </SubTitle>
          <SubContents>
            <NoData>
              <p>로그인 후 이용이 가능합니다.</p>
            </NoData>
          </SubContents>
        </Wrap>
      )}
    </>
  );
}
