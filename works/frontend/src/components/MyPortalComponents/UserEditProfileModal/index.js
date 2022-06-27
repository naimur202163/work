import React, { useContext } from "react"
import styled from "styled-components"
import { GlobalContext } from "../../../context/GlobalContext"
import UserEditProfile from "../../../pages/UserEditProfile"
import { BackChatIcon } from "../../Icons"

const UserEditProfileModal = ({close}) => {
    const {showEditProfile} = useContext(GlobalContext)
   
    return (
        <UserEditProfileModalStyled>
        <div className={`wrapper ${showEditProfile && "ShowMyPortalPage"}`}>
            <div className="wrapper__header">
                <div onClick={close} className="backIcon">
                    <BackChatIcon width={25} />
                </div>
                <div className="button-save"><div>Save</div></div>
            </div>
            <UserEditProfile />
        </div>
        </UserEditProfileModalStyled>
    )
}

export default UserEditProfileModal

const UserEditProfileModalStyled = styled.div`
.wrapper {
    min-height: 100vh;
    height: 100vh;
    width: 100%;
    background-color: #1c1c1e;
    position: fixed;
    top: 0;
    left: 0;
    overflow-y: auto;
    z-index: 150;
    opacity: 0;
    transform: translateX(-100%);
    transition: all 1s ease;
    

    &__header {
      display: flex;
      align-items: center;
      padding: 1rem 5rem;
      border-bottom: 1px solid rgba(112, 112, 112, 0.4);

      .backIcon {
        margin-right: 1rem;
        cursor: pointer;
        display: flex;
        align-items: center;
      }

      .button-save{
        border: 2px solid #FFF;
        border-radius: 20px;
        padding: 0px 18px;
        font-family: 'Montserrat';
        font-size: 14px;
        margin-left : auto;
      }
    }
    &__content {
      height: 100vh;
    }
  }

  @media screen and (max-width: 600px) {
    .wrapper {
      &__header {
        padding: 0.8rem 2rem;
      }
    }
  }

  @media screen and (max-width: 480px) {
    .wrapper {
      &__header {
        padding: 0.5rem 1.5rem;

        .name {
          font-size: 1rem;
        }
      }
    }
  }
`