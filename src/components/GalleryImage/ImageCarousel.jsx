import { ChevronLeft, ChevronRight, CloseX } from "../../icons/icons.jsx";
import { useSwipeable } from "react-swipeable";
import "./Imagecarousel.css";

export default function ImageCarousel({galleryImages, slideNumber, setSlideNumber, offsetSliderLeft, setoffsetSliderLeft, setOpenImageModal,}) {

  // Options for swipe
  const handlers = useSwipeable({
    onSwipedRight: () => {
      handlePrevSlide();
    },
    onSwipedLeft: () => {
      handleNextSlide();
    },
    trackTouch: true,
    trackMouse: true,
    swipeDuration: 1000,
    delta: 50,
  });

  const handleCloseModal = () => {
    setOpenImageModal(false);
  };

  // Handle previous image
  const handlePrevSlide = () => {
    if (slideNumber === 0) {
      setSlideNumber(galleryImages.length - 1);
      setoffsetSliderLeft((galleryImages.length - 1) * -216);
    } else {
      setSlideNumber((prevState) => prevState - 1);
      setoffsetSliderLeft((prevState) => prevState + 216);
    }
  };

  // Handle next image
  const handleNextSlide = () => {
    if (slideNumber === galleryImages.length - 1) {
      setSlideNumber(0);
      setoffsetSliderLeft(0);
    } else {
      setSlideNumber((prevState) => prevState + 1);
      setoffsetSliderLeft((prevState) => prevState - 216);
    }
  };

  return (
    <div className="image-modal-container" {...handlers}>
      <span
        className="image-modal-container__close-icon"
        onClick={handleCloseModal}
      >
        <CloseX />
      </span>
      <span
        className="image-modal-container__arrow-left-icon"
        onClick={handlePrevSlide}
      >
        <ChevronLeft />
      </span>
      <span
        className="image-modal-container__arrow-right-icon"
        onClick={handleNextSlide}
      >
        <ChevronRight />
      </span>
      <div
        className="image-modal-container__images"
        style={{ left: `${offsetSliderLeft}px` }}
      >
        {galleryImages.map((image, index) => {
          return (
            <img
              className={index === slideNumber ? "active" : undefined}
              key={image.id}
              src={image.urls.regular}
              alt={image.alt_description}
            />
          );
        })}
      </div>
    </div>
  );
}
