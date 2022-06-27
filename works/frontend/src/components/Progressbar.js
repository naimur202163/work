import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { LinearProgress, Box, Typography } from "@material-ui/core";

const Wrapper = styled.div`
  margin-top: 20px;
  .bar {
    height: 14px;
  }
`;
const Header = styled.div`
h4 {
  padding: 3em 0 0 0;
  font-size: 1.3rem;
}
p {
  width: 90%;
  font-size: 0.8rem;
}
`;

const Progressbar = ({ videos }) => {
  const [percentage, setPercentage] = useState(null);
  const [packageSize, setPackageSize] = useState(null);
  const [remaining, setRemaining] = useState(null);
  const [showProgressBar, setShowProgressBar] = useState(false);
  // const videos = useSelector((state) => ({ videos: state.profile }))

  const convertMegaBytes = (megaBytes) => {
    if (megaBytes === 0) {
      return "0";
    }
    const sizeInBytes = megaBytes * Math.pow(1024, 2);
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];

    const i = parseInt(Math.floor(Math.log(sizeInBytes) / Math.log(1024)));

    if (i === 0) {
      return sizeInBytes + " " + sizes[i];
    }

    return (sizeInBytes / Math.pow(1024, i)).toFixed(2) + " " + sizes[i];
  };

  useEffect(() => {
    if (
      (videos.usedFileSize || videos.usedFileSize === 0) &&
      videos.totalFileSize
    ) {
      let videoSizeTotal = (videos.usedFileSize * 100) / videos.totalFileSize;
      setShowProgressBar(true);
      setPercentage(+videoSizeTotal.toFixed(2));
      setPackageSize(convertMegaBytes(videos.totalFileSize));
      setRemaining(convertMegaBytes(videos.usedFileSize));
    }
  }, [videos.usedFileSize, videos.totalFileSize]);


  useEffect(() => {
    if (percentage >= 100) {
      toast.error(
        "Your Video Storage Utilization is over 100%! Please upgrade to a larger video package OR remove content from your channel."
      );
    }
  }, [percentage])

  return (
    <>
      {showProgressBar ? (
        <>
          <Header>
            <h4>STORAGE UTILIZATION </h4>
            <p>({remaining}/{packageSize})</p>
          </Header>
          <Wrapper>
            <Box display="flex" alignItems="center">
              <Box width="100%" mr={1}>
                <LinearProgress
                  className={"bar"}
                  variant="determinate"
                  value={percentage >= 100 ? 100 : percentage}
                  color="secondary"
                />
              </Box>
              <Box minWidth={35}>
                <Typography variant="body2">{`${percentage >= 100 ? 100 : percentage
                  }%`}</Typography>
              </Box>
            </Box>
          </Wrapper>
        </>
      ) : null}
    </>
  );
};

const mapStateToProps = (state) => ({ videos: state.profile });

export default connect(mapStateToProps)(Progressbar);
