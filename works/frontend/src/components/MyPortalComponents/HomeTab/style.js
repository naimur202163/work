import styled from "styled-components";

export const HomeBanner = styled.div`
  margin: 0px;
  padding: 0px;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  > .homeBanner {
    width: 100% !important;
    background-repeat: no-repeat;
    height: 250px;
    background-size: cover;
    object-fit: cover;
  }
  > h2 {
    font-size: 10px;
    line-height: 13px;
    color: #f2f2f7;
  }
  > p {
    font-size: 13px;
    color: #e5e5ea;
    font-weight: 500;
    font-family: fangsong;
  }
`;
export const MarketingBannerSection = styled.section`
  width: 100%;
`;
export const TaglineAndBioSection = styled.div`
  min-width: 600px;
  width: 60%;
  margin: 2rem auto 4rem auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  h2 {
    font-size: 1rem;
    color: #f2f2f7;
    font-family: ${(props) => props.theme.montserrat};
  }

  > .bio {
    padding: 13px;
    color: #939497;
  }

  @media screen and (max-width: 600px) {
    min-width: 90%;
    width: 90%;
    margin: 1rem auto 2rem auto;

    h2 {
      font-size: 0.9rem;
    }

    > .bio {
      font-size: 0.8rem;
    }
  }
`;

export const TabHomeComponent = styled.div`
  width: 100%;
  padding: 1rem 0;
  font-family: ${(props) => props.theme.montserrat};
`;

export const FeaturedSeriesSection = styled.div`
  width: 100%;
  padding: 2rem;
  border-bottom: 1px solid rgba(242, 242, 247, 0.2);

  .sectionTitle {
    font-family: brother-1816, sans-serif;
    font-size: 1.5rem;
    font-weight: 400;
    line-height: 1;
    text-transform: uppercase;
    margin-bottom: 2rem;
  }

  .loading,
  .error {
    font-family: brother-1816, sans-serif;
    font-size: 0.8rem;
    font-weight: 300;
    line-height: 1;
    text-transform: uppercase;
    margin-bottom: 1rem;
  }

  .row {
    .slider {
      .slick-slide {
        padding: 0 10px;
      }

      .slick-track {
        margin-left: 0;
      }
    }
  }

  @media screen and (max-width: 480px) {
    padding: 2rem 1rem;

    .sectionTitle {
      font-size: 1rem;
    }
  }
`;

export const FeaturedClipsSection = styled.div`
  width: 100%;
  padding: 2rem;
  border-bottom: 1px solid rgba(242, 242, 247, 0.2);

  .sectionTitle {
    font-family: brother-1816, sans-serif;
    font-size: 1.5rem;
    font-weight: 400;
    line-height: 1;
    text-transform: uppercase;
    margin-bottom: 2rem;
  }

  .loading,
  .error {
    font-family: brother-1816, sans-serif;
    font-size: 1rem;
    font-weight: 500;
    line-height: 1;
    text-transform: uppercase;
    margin-bottom: 1rem;
  }

  .row {
    width: 100%;
  }

  @media screen and (max-width: 480px) {
    padding: 2rem 1rem;

    .sectionTitle {
      font-size: 1rem;
    }
  }
`;
