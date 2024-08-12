import styled from "@emotion/styled";
import { useImage } from "@/contexts/imageContext";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Modal } from "@/components/modal";
import { useState } from "react";
import { responsive } from "@/commons/styles/globalStyles";

const customStyle = {
  maxWidth: "140rem",
  padding: "4rem 12rem",
};

const mobileStyle = {
  maxWidth: "100%",
  width: "100%",
  height: "100%",
  padding: "7rem 0 4rem",
  borderRadius: "0",
};

const SlideWrap = styled.div`
  max-width: 88rem;
  width: 100%;
  margin-bottom: 2rem;

  .img_slide {
    height: 54rem;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .slick-slide div {
    outline: none;
  }

  .slick-track {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .slick-dots {
    bottom: -5.2rem;
    display: flex !important;

    li {
      display: block;
      width: 4rem;
      height: 3rem;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }

  .slick-prev,
  .slick-next {
    right: -6rem;
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    background: #d2cfcf;
    display: flex !important;
    align-items: center;
    justify-content: center;

    &::before {
      display: block;
      width: 2.6rem;
      height: 2.6rem;
      opacity: 1;
      content: "";
      background: url(/image/icon/icon_arrow.png) center/cover no-repeat;
    }
  }
  .slick-prev {
    left: -6rem;
    &::before {
      transform: rotate(180deg);
    }
  }

  @media ${responsive.mobile} {
    margin-bottom: 0;
    .slick-slide {
      height: calc(100vh - 14rem);
      display: flex;
      align-items: center;
    }
    .img_slide {
      height: 100%;
    }
  }
`;

const ImageNumber = styled.p`
  font-size: 1.8rem;
  position: absolute;
  bottom: 2rem;
`;
export interface IPropsModal {
  currentModal: string | null;
  hide: () => void;
}
export default function ImageDetailModal({ currentModal, hide }: IPropsModal) {
  const { imageData } = useImage();
  const [currentSlide, setCurrentSlide] = useState(0);

  const onAfterChange = (currentSlide: number) => {
    setCurrentSlide(currentSlide);
  };

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: onAfterChange,
  };
  return (
    <Modal
      currentModal={currentModal}
      hide={hide}
      customStyle={customStyle}
      mobileStyle={mobileStyle}
      type="modal"
    >
      <SlideWrap>
        <Slider {...settings}>
          {imageData?.map((image) => (
            <div className="img_slide" key={image.serialnum}>
              <img src={image.imageUrl} alt="캠핑장 이미지" />
            </div>
          ))}
        </Slider>
      </SlideWrap>
      <ImageNumber>
        {currentSlide + 1} / {imageData?.length}
      </ImageNumber>
    </Modal>
  );
}
