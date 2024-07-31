import styled from "@emotion/styled";
import { useImage } from "@/contexts/imageContext";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Modal } from "@/components/modal";

const customStyle = {
  maxWidth: "calc(100% - 8rem)",
  padding: "4rem 14rem",
};

const mobileStyle = {
  maxWidth: "100%",
  width: "100%",
  height: "100%",
  borderRadius: "0",
};

const SlideWrap = styled.div`
  width: 100%;
  margin-bottom: 4rem;

  .img_slide {
    height: 60rem;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
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
`;
interface IPropsModal {
  isShowing: boolean;
  hide: () => void;
}
export default function ImageDetailModal({ isShowing, hide }: IPropsModal) {
  const { imageData } = useImage();
  console.log(imageData);

  const settings = {
    // customPaging: function(i) {
    //   return (
    //     <a>
    //       <img src={} />
    //     </a>
    //   );
    // },
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Modal
      isShowing={isShowing}
      hide={hide}
      customStyle={customStyle}
      mobileStyle={mobileStyle}
    >
      <SlideWrap>
        <Slider {...settings}>
          {/* <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>14</div>
          <div>51</div> */}
          {imageData.map((image) => (
            <div className="img_slide" key={image.serialNum}>
              <img src={image.imageUrl} alt="" />
            </div>
          ))}
        </Slider>
      </SlideWrap>
    </Modal>
  );
}
