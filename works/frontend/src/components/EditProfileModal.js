import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import styled, { keyframes } from "styled-components";
import Button from "../styles/Button";
import { CloseIcon } from "./Icons";
import useInput from "../hooks/useInput";
import { motion } from "framer-motion";
import { upload } from "../utils";
import {
  updateUser,
  updateProfile,
  updateCoverPhoto,
  updateAvatar,
  getBadgesByUserrole,
  updateUserSettingById,
  whoismeaction,
} from "../actions";
import { useSelector, useDispatch } from "react-redux";
import DisplaySettingForm from "./EditProfileComponents/DisplaySettingForm";
import avatar_placeholder from "../assets/avtar_placeholder.png"
import { Box, Grid } from "@material-ui/core";
import PasswordStrengthBar from "react-password-strength-bar";

// badge animation
const BadgeContainerVariants = {
  hidden: {
    opacity: 0,
    y: "-5rem",
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      duration: 0.5,
    },
  },
};

const openModal = keyframes`
	from {
		opacity: 0; 
	}
	to {
		opacity: 1;
	}
`;

const Wrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  z-index: 900;
  background: rgba(0, 0, 0, 0.7);
  animation: ${openModal} 0.5s ease-in-out;

  .buttons-setting-box {
    width: 100%;
    margin-left: auto;
  }

  .settings-button {
    font-weight: 500;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
    margin-left: 1rem;
  }

  .edit-profile {
    width: 600px;
    border-radius: 4px;
    background: ${(props) => props.theme.grey};
    margin: 2rem auto;
    box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.4), 0px 0px 4px rgba(0, 0, 0, 0.25);
    position: relative;
    .cover-upload-container {
      height: 12rem;
      position: relative;
      overflow: hidden;
      margin-bottom: 2rem;
      .img {
        background-size: cover;
        background-position: center;
        object-fit: cover;
        width: 100%;
        height: 4rem;
      }
      .overlay {
        height: 3rem;
        width: 3rem;
        position: absolute;
        bottom: 0.5rem;
        cursor: pointer;
        right: 0.5rem;
        z-index: 1;
        border-radius: 50%;
        color: #fff;
        font-size: 1rem;
        background-color: #181818;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
        border: 1px solid #cc0000;
        opacity: 0;
      }
      &:hover .overlay {
        opacity: 1;
      }
    }
  }

  .button-back {
    margin-left: 0.5rem;
    background-color: #fff;
    color: ${(props) => props.theme.red};
  }
  .edit-profile img {
    object-fit: cover;
  }
  .user-infoBox {
    position: absolute;
    left: 20px;
    z-index: 3;
    top: 14rem;
    cursor: pointer;
    display: flex;
    align-items: center;

    h3 {
      font-size: 1.5rem;
      text-transform: capitalize;
      background: -webkit-linear-gradient(#ff4883, #fdb769);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-weight: 500;
      letter-spacing: 0.02rem;
      text-shadow: 2px 2px 10px rgba(255, 255, 255, 0.3);
      cursor: pointer;
    }
  }
  .avatar-upload-icon {
    .badgeAvatar {
      height: 4.5rem;
      width: 4.5rem;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;

      .avatar-image {
        height: 3.5rem;
        width: auto;
      }

      .png-img {
        width: 5rem !important;
        height: auto;
        margin-right: 8px;
      }

      .custom-image {
        height: 100%;
        width: 100%;
        object-fit: cover;
        border-radius: 50%;
        background-size: cover;
        background-position: center;
      }
    }
    .overlay {
      position: absolute;
      left: 3rem;
      bottom: 1rem;
      height: 1.3rem;
      width: 1.3rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      color: #fff;
      font-size: 0.68rem;
      background-color: #181818;
      opacity: 0;
      transition: all 0.2s ease;
      border: 1px solid #cc0000;
    }
    &:hover {
      .overlay {
        opacity: 1;
      }
    }
  }
  div.modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    border-bottom: 1px solid ${(props) => props.theme.darkGrey};
  }
  h3 {
    display: flex;
    align-items: center;
  }
  form {
    padding: 1rem;
  }
  input {
    width: 100%;
    background: ${(props) => props.theme.black};
    border: 1px solid ${(props) => props.theme.black};
    margin-bottom: 1rem;
    padding: 0.5rem 1rem;
    border-radius: 3px;
    color: ${(props) => props.theme.primaryColor};
  }
  svg {
    fill: ${(props) => props.theme.red};
    height: 22px;
    width: 22px;
    margin-right: 1rem;
    position: relative;
    top: -1px;
  }

  .tagline-input {
    width: 100%;
    background: ${(props) => props.theme.black};
    border: 1px solid ${(props) => props.theme.black};
    padding: 0.6rem 1rem;
    border-radius: 3px;
    color: ${(props) => props.theme.primaryColor};
    margin-bottom: 0rem !important;
    height: 7rem;
    margin-top: 0 !important;
  }
  .reset-header {
    color: #a6a6a6;
    margin-left: 0.5rem;
  }
  .password-strengthBar {
    top: -10px;
  }
  textarea {
    width: 100%;
    background: ${(props) => props.theme.black};
    border: 1px solid ${(props) => props.theme.black};
    padding: 0.6rem 1rem;
    border-radius: 3px;
    color: ${(props) => props.theme.primaryColor};
    margin-bottom: 0rem !important;
    height: 12rem;
    margin-top: 1rem;
  }
  .error {
    font-size: 0.8rem;
    color: ${(props) => props.theme.red};
  }
  @media screen and (max-width: 600px) {
    .edit-profile {
      width: 90%;
      margin: 4rem auto;
    }
  }
  @media screen and (max-width: 400px) {
    background: rgba(0, 0, 0, 0.9);
  }
`;

const ChooseAvatarContainer = styled.div`
  width: 600px;
  height: 85vh;
  border-radius: 4px;
  overflow: auto;
  background: ${(props) => props.theme.grey};
  margin: 2rem auto;
  box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.4), 0px 0px 4px rgba(0, 0, 0, 0.25);
  @media screen and (max-width: 600px) {
    width: 90%;
    margin: 4rem auto;
  }
  @media screen and (max-width: 400px) {
    background: rgba(0, 0, 0, 0.9);
  }
  .modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    border-bottom: 1px solid ${(props) => props.theme.darkGrey};
  }
  .badges {
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
  }
  .badgeBox {
    height: 10rem;
    width: 8rem;
    flex-basis: 20%;
    -ms-flex: auto;
    position: relative;
    padding: 10px;
    box-sizing: border-box;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .box {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      cursor: pointer;
    }
  }

  .text_Active {
    color: ${(props) => props.theme.red};
  }
  @media (max-width: 1333px) {
    .badgeBox {
      flex-basis: 33.33%;
    }
  }
  @media (max-width: 1073px) {
    .badgeBox {
      flex-basis: 33.33%;
    }
  }
  @media (max-width: 815px) {
    .badgeBox {
      flex-basis: 50%;
    }
  }
  .badgeBox--img {
    height: 5.5rem;
    width: 5.5rem;
    border-radius: 50%;
    box-shadow: 2px 2px 7px rgba(#999, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.5rem;
    padding: 0.5rem;
  }

  .png-img {
    width: 5rem !important;
    height: auto;
    transform: translateX(-0.1rem);
  }

  .badgeBox--img_Active {
    border: 1px solid ${(props) => props.theme.red};
  }

  .badgeBox--upload {
    height: 4rem;
    width: 4rem;
    border-radius: 50%;
    background: #fff;
    box-shadow: 2px 2px 7px rgba(#999, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.5rem;
    i {
      font-size: 2rem;
      color: #cc0000;
    }
  }

  .Active {
    border: 2px solid ${(props) => props.theme.red};
  }
  span {
    font-size: 0.7rem;
    color: ${(props) => props.theme.secondaryColor};
  }
  img {
    height: 3.5rem;
    width: auto;
  }
  .modal-header {
    span {
      font-size: 1.5rem;
      color: #fff;
    }
  }
`;

const EditProfileModal = ({ closeModal }) => {
  const profile = useSelector((state) => state.profile);
  const userSettingByUserId = useSelector((state) => state.userSettingByUserId);
  const user = useSelector((state) => state.user);
  const badgesUserrole = useSelector((state) => state.badgesUserrole);
  const dispatch = useDispatch();
  const updateUserSetting = useSelector((state) => state.updateUserSetting);
  // user settings states
  const [country, setCountry] = useState(userSettingByUserId?.country);
  const [state, setState] = useState(userSettingByUserId?.state);
  const [city, setCity] = useState(userSettingByUserId?.city);
  const [outOfThisWorld, setOutOfThisWorld] = useState(
    userSettingByUserId?.outOfThisWorld
  );
  const [passwordStrengthScore, setPasswordStrengthScore] = useState(0);


  const firstname = useInput(profile?.firstname);
  const lastname = useInput(profile?.lastname);
  const email = useInput(profile?.email);
  const password = useInput("");
  const confirmPassword = useInput("");
  const channelDesc = useInput(profile?.channelDescription || "");
  const tagline = useInput(profile?.tagline);

  const [openAvatar, setOpenAvatar] = useState(false);
  const [badgeSelected, setBadgeSelected] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [openPublicDisplaySetting, setOpenPublicDisplaySetting] = useState(
    false

  );
  // new add
  const tempFunction = useRef()
  const imgFunction = () => {
    if (user.userrole === 0) dispatch(getBadgesByUserrole("free"));
    if (user.userrole === 1) dispatch(getBadgesByUserrole("basic"));
    if (user.userrole === 2) dispatch(getBadgesByUserrole("premium"));
  }
  tempFunction.current = imgFunction
  useEffect(() => {
    if (user && user.userrole) {
      tempFunction.current()
    }
  }, [user]);

  const handleCoverUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const res = await upload("image", file);
      await dispatch(updateCoverPhoto({ ...res }));
      dispatch(whoismeaction());
    }
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const res = await upload("image", file);
      res['avatar'] = res.url
      await dispatch(updateAvatar({ ...res }));
      await dispatch(updateUser({ ...res }))
      chooseBadgeHandler();
    }
  };


  const passwordRegEx = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')


  const validatePassword = (password, confirmPassword) => {
    if (password.length <= 7) {
      return "Password must be at least 8 characters long, contain at least 1 Number, 1 Upper case letter & 1 Special character.";
    }
    if (passwordStrengthScore < 2 || !passwordRegEx.test(password)) {
      return "Password must be at least 8 characters long, contain at least 1 Number, 1 Upper case letter & 1 Special character.";
    }
    if (password !== confirmPassword) {
      return "Password does not match.";
    }

    return null;
  }

  const handleEditProfile = () => {
    if (user.userrole === 2) {
      if (!tagline.value) {
        return toast.error("tagline should not be empty");
      }

      if (tagline.value.length > 400) {
        return toast.error("Tagline shouldn't be greater than 400 characters");
      }

      if (tagline.value.length < 5) {
        return toast.error("Tagline should be minimum of 5 character long");
      }
    }

    if (!email.value) {
      return toast.error("Email can't be empty.");
    }

    if (!firstname.value.trim()) {
      return toast.error("firstname should not be empty");
    }

    if (!lastname.value.trim()) {
      return toast.error("lastname should not be empty");
    }
    if (!!password.value) {
      const error = validatePassword(password.value, confirmPassword.value)
      if (!!error) {
        return toast.error(error);
      }
    }

    let updateObj = {
      channelDescription: channelDesc.value,
      firstname: firstname.value,
      lastname: lastname.value,
      email: email.value,
      tagline: tagline.value,
    }
    if (avatarUrl) {
      updateObj.avatar = avatarUrl
    }
    if (!!password.value) {
      updateObj.password = password.value
    }

    dispatch(
      updateProfile(updateObj)
    );

    updateUserSettingsHandler(false);
    toast.error("Profile updated!");
    closeModal();
  };

  const chooseBadgeHandler = () => {
    if (avatarUrl) {
      dispatch(
        updateProfile({
          channelDescription: channelDesc.value,
          firstname: firstname.value,
          lastname: lastname.value,
          avatar: avatarUrl,
          tagline: tagline.value,
          email: email.value,
        })
      );
    } else {
      dispatch(
        updateProfile({
          channelDescription: channelDesc.value,
          firstname: firstname.value,
          lastname: lastname.value,
          tagline: tagline.value,
          email: email.value,
        })
      );
    }

    updateUserSettingsHandler(false);
    toast.error("Profile updated!");
    setAvatarUrl(null);
    setBadgeSelected(null);
    setOpenAvatar(false);
    closeModal();
  };

  const isPngOrJpg = () => {
    const image =
      !user.avatar ? user.badge : user.avatar;

    if (image && (image.includes(".png") || image.includes(".svg"))) {
      return (
        <img
          className={`${image.includes(".png") ? "png-img" : "avatar-image"}`}
          src={image}
          alt="badge"
        />
      );
    } else {
      return <img
        className="custom-image"
        src={image ? image : avatar_placeholder}
        alt="badge" />;
    }
  };

  const updateUserSettingsHandler = (isShowToastMessage = true) => {
    const data = {
      country,
      state,
      city,
      outOfThisWorld,
    };
    dispatch(updateUserSettingById(userSettingByUserId?.id, data));
    isShowToastMessage && toast.error("Your Public Display settings have been updated!");
    closeModal();
    setOpenPublicDisplaySetting(false);
  };


  const onChangeScore = (score) => {
    setPasswordStrengthScore(score);
  };

  return (
    <Wrapper>
      {openAvatar && (
        <ChooseAvatarContainer>
          <div className="modal-header">
            <h3>
              <CloseIcon onClick={() => closeModal()} />
              <span>Choose Avatar</span>
            </h3>
            <div className="buttons">
              <Button className="button-choose" onClick={chooseBadgeHandler}>
                Choose
              </Button>
              <Button
                className="button-back"
                onClick={() => {
                  setOpenAvatar(false);
                }}
              >
                Back
              </Button>
            </div>
          </div>

          <motion.div
            variants={BadgeContainerVariants}
            initial="hidden"
            animate="visible"
            className="badges"
          >
            {badgesUserrole && badgesUserrole.length > 0 && (
              <>
                {badgesUserrole.map((badge) => (
                  <div
                    key={badge.id}
                    className="badgeBox"
                    onClick={() => {
                      setBadgeSelected(badge.id);
                      setAvatarUrl(badge.imgPath);
                    }}
                  >
                    <div
                      className={`badgeBox--img ${badgeSelected === badge.id && "badgeBox--img_Active"
                        }`}
                    >
                      <img
                        className={
                          badge.imgPath.includes(".png") ? "png-img" : null
                        }
                        src={badge.imgPath}
                        alt={badge.name}
                      />
                    </div>
                    <span
                      className={badgeSelected === badge.id && "text_Active"}
                    >
                      {badge.name.length > 15
                        ? badge.name.substring(0, 15) + "..."
                        : badge.name}
                    </span>
                  </div>
                ))}

                {user && user.userrole === 2 && (
                  <div className="badgeBox">
                    <label htmlFor="avatar-upload">
                      <div className="box">
                        <div className={`badgeBox--upload`}>
                          <i className="fas fa-upload" />
                        </div>
                        <span>Upload Custom</span>
                      </div>
                    </label>
                    <input
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarUpload}
                      style={{ display: "none" }}
                    />
                  </div>
                )}
              </>
            )}
          </motion.div>
        </ChooseAvatarContainer>
      )}

      {!openAvatar && (
        <div className="edit-profile">
          <div className="modal-header">
            <h3>
              <CloseIcon onClick={() => closeModal()} />
              <span>Edit Profile</span>
            </h3>
            <Button onClick={handleEditProfile}>Save</Button>
          </div>

          <div className="cover-upload-container">
            <label htmlFor="cover-upload">
              <img
                className="pointer"
                width="100%"
                height="200px"
                src={profile.cover}
                alt="cover"
              />

              <div className="overlay">
                <i className="fas fa-upload" />
              </div>
            </label>
            <input
              id="cover-upload"
              type="file"
              accept="image/*"
              onChange={handleCoverUpload}
              style={{ display: "none" }}
            />
          </div>

          <div className="user-infoBox">
            <div
              onClick={() => setOpenAvatar(true)}
              className="avatar-upload-icon"
            >
              <div className="badgeAvatar">{isPngOrJpg()}</div>
              <div className="overlay">
                <i className="fas fa-upload" />
              </div>
            </div>

            <h3 className="user-username">{user.username}</h3>
          </div>

          {user?.userrole === 2 ? (
            <div className="buttons buttons-setting-box">
              <Button
                onClick={() => {
                  if (openPublicDisplaySetting) {
                    updateUserSettingsHandler();
                  } else {
                    setOpenPublicDisplaySetting(true);
                  }
                }}
                className="button-choose settings-button"
              >
                {updateUserSetting && updateUserSetting.loading ? (
                  "Loading"
                ) : (
                  <>
                    {openPublicDisplaySetting ? "Update" : "Edit"} Public
                    Display Settings
                  </>
                )}
              </Button>
              {openPublicDisplaySetting ? (
                <Button
                  className="button-back"
                  onClick={() => {
                    setOpenPublicDisplaySetting(false);
                  }}
                >
                  Back
                </Button>
              ) : null}
            </div>
          ) : null}

          {openPublicDisplaySetting ? (
            <DisplaySettingForm
              country={country}
              setCountry={setCountry}
              state={state}
              setState={setState}
              city={city}
              setCity={setCity}
              outOfThisWorld={outOfThisWorld}
              setOutOfThisWorld={setOutOfThisWorld}
            />
          ) : (
            <form>
              <input
                type="text"
                placeholder="firstname"
                value={firstname.value}
                onChange={firstname.onChange}
              />
              <input
                type="text"
                placeholder="lastname"
                value={lastname.value}
                onChange={lastname.onChange}
              />
              <input
                type="email"
                placeholder="update email address"
                value={email.value}
                onChange={email.onChange}
              />
              <Box>
                <h3 className="reset-header">Reset Password</h3>
                <Grid
                  container
                  spacing={1}
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                  alignContent="stretch"
                  wrap="nowrap"

                >
                  <Grid item xs={12} sm={6}>
                    <input
                      type={"password"}
                      placeholder="Password"
                      value={password.value}
                      onChange={password.onChange}
                    />

                    <PasswordStrengthBar
                      password={password.value}
                      onChangeScore={onChangeScore}
                      className="password-strengthBar"
                    />

                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <input
                      type={"password"}
                      placeholder="Confirm Password"
                      value={confirmPassword.value}
                      onChange={confirmPassword.onChange}
                    />
                  </Grid>

                </Grid>
              </Box>



              {user.userrole === 2 && (
                <>
                  <textarea
                    className="tagline-input"
                    type="text"
                    placeholder="add short tagline"
                    value={tagline.value}
                    onChange={tagline.onChange}
                  />
                  <span className="error">
                    {tagline.value && tagline.value.length > 400
                      ? "Tagline shouldn't be greater than 400 characters"
                      : null}
                    {tagline.value && tagline.value.length < 5
                      ? "Tagline should be minimum of 5 character long"
                      : null}
                  </span>
                </>
              )}
              <textarea
                type="text"
                placeholder="Tell viewers about your channel"
                value={channelDesc.value}
                onChange={channelDesc.onChange}
              />
            </form>
          )}
        </div>
      )}
    </Wrapper>
  );
};

export default EditProfileModal;
