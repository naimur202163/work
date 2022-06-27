import React, { useContext, useState } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import MomentCard from "./MomentCard";
import EditMomentForm from "../../UploadMomentComponents/EditMomentForm";
import { GlobalContext } from "../../../context/GlobalContext";

const SLIDERSETTINGS = {
  arrows: false,
  infinite: false,
  slidesToShow: 5,
  slidesToScroll: 1,
  autoplay: false,
  speed: 1000,
  autoplaySpeed: 5000,
  adaptiveHeight: true,
  responsive: [
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
  ],
};

const Moments = ({ moments }) => {
  const { showEditMomentModel, setShowEditMomentModel } =
    useContext(GlobalContext);
  const [selectedMoment, setSelectedMoment] = useState(null);

  return (
    <>
      <MomentsStyled>
        <div className="sectionTitle">Moments</div>

        <Slider className="slider" {...SLIDERSETTINGS}>
          {moments &&
            moments.length > 0 &&
            moments.map((item, i) => (
              <div key={i} className="slider__item">
                <MomentCard
                  setSelectedMoment={setSelectedMoment}
                  moment={item}
                />
              </div>
            ))}
        </Slider>
      </MomentsStyled>

      {selectedMoment && showEditMomentModel && (
        <EditMomentForm selectedMoment={selectedMoment} close={() => setShowEditMomentModel(false)} />
      )}
    </>
  );
};

export default Moments;

const MomentsStyled = styled.section`
  width: 100%;
  margin: 0 auto;
  padding: 2rem 5rem;
  border-bottom: 1px solid rgba(242, 242, 247, 0.2);

  .sectionTitle {
    font-family: brother-1816, sans-serif;
    font-size: 1.7rem;
    font-weight: 500;
    line-height: 1;
    text-transform: uppercase;
    margin-bottom: 1rem;
  }

  .slider {
    cursor: pointer;

    .slick-slide {
      padding: 0 0.5rem;
    }

    .slick-track {
      margin-left: 0;
    }
  }

  @media screen and (max-width: 480px) {
    padding: 2rem 1rem;

    .sectionTitle {
      font-size: 1.5rem;
      margin-bottom: 1.5rem;
    }

    .slider {
      .slick-slide {
        padding: 0 0.2rem;
      }
    }
  }
`;
