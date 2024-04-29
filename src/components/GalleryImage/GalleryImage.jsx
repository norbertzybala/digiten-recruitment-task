import useAxios from "../../hooks/useAxios.jsx";
import { ClipLoader } from "react-spinners";
import { useState } from "react";
import Error from "../DataVisulisation/Error.jsx";
import ImageCarousel from "./ImageCarousel.jsx";
import "./GalleryImage.css";

export default function GalleryImage() {
  const { response: galleryImages, loading, error } = useAxios(
    "https://api.unsplash.com/photos/?client_id=sH2liCvTUrU3DevFjrr_c-7pTWiMZ3tXIpWA7EAuB3M&per_page=20",
    false,
  );

  const [slideNumber, setSlideNumber] = useState(0);
  const [openImageModal, setOpenImageModal] = useState(false);
  const [offsetSliderLeft, setoffsetSliderLeft] = useState(0);

  const handleOpenModal = (index) => {
    setSlideNumber(index);
    setOpenImageModal(true);
    setoffsetSliderLeft(index * -216);
  };

  // Return error message if fetch data failed
  if (error) {
    return <Error title="Error!" message={error.message} />;
  }

  return (
    <section className="gallery-image">
      <h2 className="gallery-image__heading">Gallery</h2>
      <div className="gallery-image__container">
        {!loading ? (
          galleryImages.map((image, index) => {
            return (
              <div
                className="gallery-image__item"
                key={image.id}
                onClick={() => {
                  handleOpenModal(index);
                }}
              >
                <img src={image.urls.small} alt={image.alt_description} />
              </div>
            );
          })
        ) : (
          <ClipLoader color={"#333"} size={50} />
        )}
      </div>
      {openImageModal && (
        <ImageCarousel
          galleryImages={galleryImages}
          slideNumber={slideNumber}
          setSlideNumber={setSlideNumber}
          offsetSliderLeft={offsetSliderLeft}
          setoffsetSliderLeft={setoffsetSliderLeft}
          setOpenImageModal={setOpenImageModal}
        />
      )}
    </section>
  );
}
