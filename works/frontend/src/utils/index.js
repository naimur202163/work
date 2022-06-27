import axios from "axios";
import api from "../services/api";
import { toast } from "react-toastify";
import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import config from "../config/config";

export const timeSince = (timestamp) => {
  const seconds = Math.floor((new Date() - new Date(timestamp)) / 1000);

  let interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return interval + " years";
  }

  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months";
  }

  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days";
  }

  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours";
  }

  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes";
  }

  return Math.floor(seconds) + " seconds";
};

export const upload = async (resourceType, file) => {
  const API_URL = `${config.REACT_APP_BACKEND_URL}`;
  let url = config.REACT_APP_CLOUDFRONT_URL + "/" + `${file.name}`;
  let publicId = "";
  let toastId = toast(`Please Wait, Upload in Progress...`, {
    hideProgressBar: true,
    closeOnClick: false,
  });
  const formData = new FormData();
  formData.append("upload_preset", "isutra");
  formData.append("cloud_name", "isutra");
  formData.append("file", file);
  const response = await axios.post(
    `${API_URL}fileoperation/fileUpload`,
    formData,
    {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        if (percent < 100) {
          toast.update(toastId, {
            render: `Please Wait, Upload in Progress... ${percent}%`,
            hideProgressBar: true,
            closeOnClick: false,
          });
        }
        if (percent == 100) {
          toast.update(toastId, {
            render: `Please Wait, Upload in Progress... ${percent}%`,
            hideProgressBar: true,
            closeOnClick: false,
          });
        }
      },
    }
  );

  publicId = "0";

  if (response && response.data) {
    toast.dismiss(toastId);
    return {
      url,
    };
  }
  return {
    url,
    publicId,
    // duration,
  };
};

export const authenticate = async (endpoint, data) => {
  const backendUrl = config.REACT_APP_BACKEND_URL;

  try {
    const tokenRes = await axios.post(`${backendUrl}auth/${endpoint}`, data);

    const config = {
      headers: { Authorization: `Bearer ${tokenRes.data.data}` },
    };

    const userRes = await axios.get(`${backendUrl}auth/me`, config);
    const user = { ...userRes.data.data, token: tokenRes.data.data };
    api.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${tokenRes.data.data}`;
    localStorage.setItem("user", JSON.stringify(user));
    return user;
  } catch (err) {
    if (
      err.response.data &&
      err.response.data.message === "The email is already taken"
    ) {
      toast.error("This email is already taken. Please try another one");
    }
  }
};

// userrole auth without needing to refresh token
export const whoisme = async () => {
  const backendUrl = config.REACT_APP_BACKEND_URL;
  const token = JSON.parse(localStorage.getItem("user"));
  try {
    const config = {
      headers: { Authorization: `Bearer ${token.token}` },
    };

    const userRes = await axios.get(`${backendUrl}auth/me`, config);
    const userlocalstorage = JSON.parse(localStorage.getItem("user"));
    const user = {
      ...userlocalstorage,
      ...userRes.data.data,
    };

    localStorage.setItem("user", JSON.stringify(user));

    return user;
  } catch (err) {}
};

export const removeChannelLocalSt = (channelId) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const updated = {
    ...user,
    channels: user.channels.filter((channel) => channel.id !== channelId),
  };

  localStorage.setItem("user", JSON.stringify(updated));
};

export const addChannelLocalSt = (channel) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const updated = {
    ...user,
    channels: [channel, ...user.channels],
  };

  localStorage.setItem("user", JSON.stringify(updated));
};

// export const getCategories = (category) => {
//   const user = JSON.parse(localStorage.getItem("video"));

//   const updated = {
//     ...user,
//     channels: [category, ...video.VideoCategory],
//   };
//   localStorage.setItem("video", JSON.stringify(updated));
// };

// video overlay image path by userrole
export const getImgPath = (video) => {
  const loggedInUserRole = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).userrole
    : 0;
  if (
    !video ||
    !video.VideoAccessOverlay ||
    loggedInUserRole === 2 ||
    loggedInUserRole === 1
  ) {
    return "";
  }
  return loggedInUserRole > 0
    ? video.VideoAccessOverlay.imgPathMember
    : video.VideoAccessOverlay.imgPathFreeLoader;
};

export const ScrollToTop = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
};

export function secondsToHms(d) {
  d = Number(d);
  var h = Math.floor(d / 3600);
  var m = Math.floor((d % 3600) / 60);
  var s = Math.floor((d % 3600) % 60);

  var hDisplay = h > 0 ? h + (h === 1 ? " hour, " : " hours, ") : "";
  var mDisplay = m > 0 ? m + (m === 1 ? " minute, " : " minutes, ") : "";
  var sDisplay = s > 0 ? s + (s === 1 ? " second" : " seconds") : "";
  return hDisplay + mDisplay + sDisplay;
}
