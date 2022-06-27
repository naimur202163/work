import React, { useEffect, useRef } from "react";
import Channel from "./Channel";
import { getProfile } from "../actions";
import { useDispatch, useSelector } from "react-redux";

const YourVideos = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state);
  const { profile } = useSelector((state) => state);
  const tempFunction = useRef()
  const imgFunction = () => {
    if (!profile) {
      dispatch(getProfile(user.id));
    }
  }
  tempFunction.current = imgFunction
  useEffect(() => {
    tempFunction.current()

  }, [profile]);

  return <Channel profile={profile} loggedInUserId={user.id} />;
};

export default YourVideos;
