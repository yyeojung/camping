import styled from "@emotion/styled";

const Wrap = styled.div``;

export default function DetailReview() {
  return (
    <Wrap>
      <button>글쓰기</button>
      <p>사진</p>
      <p>제목</p>
      <p>후기</p>
      <p>작성자/날짜</p>
      <div style={{ background: "red", width: "fit-content" }}>
        <button>삭제</button>
        <button>수정</button>
      </div>
    </Wrap>
  );
}
