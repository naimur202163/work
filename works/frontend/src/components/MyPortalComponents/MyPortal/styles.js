import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100vw;
  height: auto;
  overflow-x: hidden;
  flex-direction: column;
  padding-bottom: 5rem;
`;

export const BannerContainer = styled.div`
  display: flex;
  width: 100%;
  height: 20vh;
  background-color: #2c2c2e;
  justify-content: end;
  align-items: center;
  justify-content: space-evenly;
  align-items: end;
  flex-direction: column;
  justify-content: end;
  @media (max-width: 640px) {
    height: 100px;
  }
  > .editBtn {
    position: fixed;
    left: 13px;
    button {
      margin-bottom: 13px;
      font-size: 10px;
      color: #f2f2f7;
      font-family: montserrat;
    }
  }
`;
export const ShareBtn = styled.div`
  height: 26px;
  width: 76px;
  font-size: 10px;
  background-color: #f2f2f7;
  border-radius: 30px 0px 0px 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
  color: #f9903d !important;
  cursor: pointer;
  @media (max-width: 640px) {
    height: 26px;
    width: 76px;
    font-size: 10px;
  }
  p {
    font-size: 10px;
    font-family: "Montserrat";
    font-weight: bold;
    letter-spacing: 1.64px;
    line-height: 13px;
  }
`;

export const CoopBtn = styled.div`
  height: 38px;
  width: 126px;
  font-size: 10px;
  background-color: #f9903d;
  border-radius: 30px 0px 0px 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: -19px;
  font-weight: 500;
  letter-spacing: 0.1em;
  cursor: pointer;
  @media (max-width: 640px) {
    height: 38px;
    width: 126px;
    font-size: 10px;
  }
  p {
    font-size: 10px;
    font-family: "Montserrat";
    font-weight: bold;
    letter-spacing: 1.64px;
    line-height: 13px;
  }
`;

export const ConnectBtn = styled.div`
  height: 42px;
  width: 140px;
  font-size: 10px;
  background: transparent
    linear-gradient(
      130deg,
      var(--profile-icon-bg) 14%,
      #f88946 23%,
      #f8795f 37%,
      #f75e87 55%,
      #f75b8c 57%
    )
    0% 0% no-repeat padding-box;
  background: transparent
    linear-gradient(
      130deg,
      #f9903d 14%,
      #f88946 23%,
      #f8795f 37%,
      #f75e87 55%,
      #f75b8c 57%
    )
    0% 0% no-repeat padding-box;
  border-radius: 30px 0px 0px 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: -19px;
  font-weight: 500;
  letter-spacing: 0.1em;
  cursor: pointer;
  @media (max-width: 640px) {
    height: 38px;
    width: 126px;
    font-size: 10px;
  }
  p {
    font-size: 12px;
    text-transform: uppercase;
    font-family: "Montserrat";
    font-weight: 600;
    letter-spacing: 2px;
    line-height: 13px;
  }
`;

export const AvtarContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 158px;
  width: 190px;
  position: relative;
  bottom: 60px;
  flex-direction: column;
  align-items: center;
  > .avatar {
    cursor: pointer;
    height: 100px;
    width: 100px;
    border-radius: 50%;
    position: relative;
    margin-bottom: 0.5rem;

    .imageBadge {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;

      .badge {
        height: 5rem;
        width: auto;
      }
    }

    .imageAvatar {
      position: absolute;
      top: 0;
      left: 0;
      border-radius: 50%;
      background-size: cover;
      background-position: center;
      object-fit: cover;
      height: 100%;
      width: 100%;
    }
  }
  @media (max-width: 640px) {
    > .avatar {
      height: 75px;
      width: 75px;
    }
  }
  > .userrole {
    height: 16px;
    color: #f2f2f7;
    line-height: 8px;
    padding: 0 .8rem;
    font-size: 10px;

    font-family: brother-1816, sans-serif;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-weight: 500;
    background: transparent
      linear-gradient(
        130deg,
        var(--profile-icon-bg) 14%,
        #f88946 23%,
        #f8795f 37%,
        #f75e87 55%,
        #f75b8c 57%
      )
      0% 0% no-repeat padding-box;
    background: transparent
      linear-gradient(
        130deg,
        #f9903d 14%,
        #f88946 23%,
        #f8795f 37%,
        #f75e87 55%,
        #f75b8c 57%
      )
      0% 0% no-repeat padding-box;
    border-radius: 3px;
  }
`;

export const AvtarItem = styled.div`
  height: 100px;
  width: 100px;
  background-color: #f9903d;
  border-radius: 50%;
`;
