import SubContents from "@/commons/layout/subContents";
import SubTitle from "@/commons/layout/subTitle";
import NoData from "@/components/noData";
import styled from "@emotion/styled";

const Wrap = styled.div``;
export default function ReviewReview() {
  //   const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //     e.preventDefault();
  //   };
  return (
    <Wrap>
      <SubTitle>
        <h2>요즘 캠핑 후기 등록</h2>
      </SubTitle>
      <SubContents>
        {/* <div>
          <p>후기 등록!!!</p>
          <form onClick={onSubmit}>
            <SearchName />
            <p>
              제목
              <input type="text" />
            </p>
            <p>내용</p>
            <textarea name="" id=""></textarea>
            <p>이미지</p>
            <input type="file" />
          </form>
        </div> */}
        <NoData>
          <p>등록된 후기가 없습니다.</p>
        </NoData>
      </SubContents>
    </Wrap>
  );
}
