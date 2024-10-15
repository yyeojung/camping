import SubContents from "@/commons/layout/subContents";
import { commonBtnStyle } from "@/commons/styles/common";
import { responsive } from "@/commons/styles/globalStyles";
import { type IReviewType } from "@/commons/type/commonType";
import Button from "@/components/button";
import Loading from "@/components/Loading";
import { Modal } from "@/components/modal";
import ReviewForm from "@/components/reviewForm/reviewForm";
import { useAuth } from "@/contexts/authContext";
import { getReview, removeReview } from "@/firebase/review";
import { useModal } from "@/hooks/useModal";
import styled from "@emotion/styled";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiOutlineLink } from "react-icons/ai";
const Wrap = styled.div`
  margin-top: 8rem;

  .top_btn {
    display: flex;
    justify-content: space-between;

    .gray {
      color: #8d8c8c;
      border-color: #8d8c8c;
      background: #fff;
    }

    .edit {
      ${commonBtnStyle}
    }

    .user_btn {
      display: flex;
      gap: 1rem;
    }
  }
  .form {
    margin-top: 1rem;
  }
`;
const TitleWrap = styled.div`
  position: relative;

  .title {
    max-width: calc(100% - 23rem);

    @media ${responsive.mobile} {
      max-width: none;
      padding-top: 1.6rem;
    }
  }

  .info {
    margin-top: 0.8rem;

    span {
      color: #898989;
      font-size: 1.4rem;

      &:not(:first-of-type)::before {
        display: inline-block;
        clear: both;
        content: "";
        width: 0.1rem;
        height: 1.2rem;
        background: #ccc;
        margin: 0 0.6rem;
        vertical-align: middle;
      }
    }
  }

  .campsite {
    position: absolute;
    top: 0;
    right: 0;
    border-radius: 0.8rem;
    padding: 0.8rem 1rem;
    background: #dae3ca;
    display: flex;
    align-items: center;
    gap: 0.4rem;

    p {
      max-width: 18rem;
      word-break: break-all;
    }

    svg {
      fill: #545151;
      width: 2rem;
      height: 2.4rem;
    }

    @media ${responsive.mobile} {
      top: -2rem;
      max-width: none;
    }
  }
`;
const Contents = styled.div`
  margin-top: 3rem;
  min-height: 40rem;

  ul {
    li img {
      width: 100%;
    }
    margin-bottom: 1rem;
  }

  p {
    line-height: 1.5;
  }
`;
export default function index() {
  const [loading, setLoading] = useState<boolean>(false);
  const [selectReview, setSelectReview] = useState<IReviewType[]>([]);
  const router = useRouter();
  const docId = router.query.id as string; // docId는 string이라고 명시
  const { user } = useAuth();
  const { currentModal, openModal, closeModal } = useModal();

  const fetchItem = async () => {
    setLoading(true);
    if (!docId) {
      setLoading(false);
      return;
    }

    const items = await getReview();
    const filterItem = items.filter((item) => item.docId === docId);
    setSelectReview(filterItem);

    setLoading(false);
  };

  useEffect(() => {
    void fetchItem();
  }, [docId]);

  // 게시글 삭제
  const onClickRemovePost = () => {
    if (!docId) return;
    openModal("deleteReview");
  };

  const onConfirmCheck = async () => {
    // 컨펌 확인일 때 삭제
    await removeReview(docId);
    void router.push("/campingReview");
    document.body.style.overflow = "auto";
  };

  return (
    <>
      {loading ? (
        <SubContents>
          <Loading />
        </SubContents>
      ) : (
        <>
          {selectReview.map((item, index) => (
            <Wrap key={index}>
              <div className="top_btn">
                <Link href="/campingReview" passHref>
                  <a>
                    <Button className="gray">목록</Button>
                  </a>
                </Link>
                {user?.uid === item.userId && ( // 글 작성 유저만 수정, 삭제 버튼
                  <div className="user_btn">
                    <Button className="gray" onClick={onClickRemovePost}>
                      삭제
                    </Button>
                    <Link href={`/reviewRegister/${item.docId}`} passHref>
                      <a className="edit">수정</a>
                    </Link>
                  </div>
                )}
              </div>
              <ReviewForm className="form">
                <TitleWrap>
                  <div className="title">
                    <strong>{item.title}</strong>
                    <p className="info">
                      <span>{item.writer}</span>
                      <span>{item.createdAt}</span>
                    </p>
                  </div>
                  <Link
                    href={`/campingDetail?contentId=${item.contentId}`}
                    passHref
                  >
                    <a className="campsite">
                      <AiOutlineLink />
                      <p>{item.facltNm}</p>
                    </a>
                  </Link>
                </TitleWrap>
                <Contents>
                  {item.images && (
                    <ul>
                      {item.images?.map((img, index) => (
                        <li key={index}>
                          <img src={img} alt={item.facltNm} />
                        </li>
                      ))}
                    </ul>
                  )}
                  <p>{item.contents}</p>
                </Contents>
              </ReviewForm>

              {/* 게시글 삭제 alert */}
              {currentModal === "deleteReview" && (
                <Modal
                  type="confirm"
                  currentModal={currentModal}
                  confirmBtn1="취소"
                  confirmBtn2="확인"
                  hide={closeModal}
                  onConfirmCheck={onConfirmCheck}
                  message="삭제하시겠습니까?"
                />
              )}
            </Wrap>
          ))}
        </>
      )}
    </>
  );
}
