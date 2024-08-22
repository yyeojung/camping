import SubContents from "@/commons/layout/subContents";
import SubTitle from "@/commons/layout/subTitle";
import { responsive } from "@/commons/styles/globalStyles";
import LikeCampingList from "@/components/myCamping/likeCampingList";
import NoData from "@/components/noData";
import { useAuth } from "@/contexts/authContext";
import styled from "@emotion/styled";

const Wrap = styled.div`
  .card_wrap {
    width: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    min-height: 60rem;
    padding-top: 4rem;
    gap: 4rem;
  }
  .card {
    width: calc((100% - 12rem) / 4);
    @media ${responsive.tablet} {
      width: calc((100% - 4rem) / 2);
    }
    @media ${responsive.mobile} {
      width: 100%;
    }
  }
`;

export default function MyCamping() {
  const { user } = useAuth();

  return (
    <Wrap>
      <SubTitle>
        <h2>관심 캠핑장</h2>
      </SubTitle>
      <SubContents>
        {user ? (
          <div className="card_wrap">
            <LikeCampingList />

            {/* {pageCount > 0 && (
              <Pagination
                totalItems={totalCount}
                onClick={onClickPage}
                currentPage={currentPage}
                pageCount={5}
                itemCountPerPage={PER_PAGE}
              />
            )} */}
          </div>
        ) : (
          <NoData>
            <p>로그인 후 이용이 가능합니다.</p>
          </NoData>
        )}
      </SubContents>
    </Wrap>
  );
}
