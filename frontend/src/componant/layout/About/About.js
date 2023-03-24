import React from "react";
import "./About.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import YouTubeIcon from "@material-ui/icons/YouTube";
import InstagramIcon from "@material-ui/icons/Instagram";
// import LinkedinIcon from "@material-ui/icons/LinkedinIcon";
const About = () => {
  const visitInstagram = () => {
    window.location = "https://instagram.com/yuvraj042003/";
  };
//   const visitLinkedIn = () => {
//     window.location = "https://www.linkedin.com/in/yuvraj-singh-603b61209/";
// };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://res.cloudinary.com/dlch8tvdz/image/upload/v1676659444/tkotsd6lr6embaidcqgh.jpg"
              alt="Founder"
            />
            <Typography component="h2">Yuvraj Singh</Typography>
            <Typography>Upcomming Software Engineer</Typography>
            <Button onClick={visitInstagram} color="primary">
              Visit Instagram
            </Button>
            {/* <Button onClick={visitLinkedIn} color="primary">
              Visit linkedin
            </Button> */}
            <span>
              This is a Full Stack Web App which is made by @yuvraj042003. Currently, 
              Beta Version available Short time and Andriod and iOS will comming Soon. 
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Our Brands</Typography>
            <a href="https://www.youtube.com/channel/UCQv1LguZntEHRS_zwcAvgZg"
              target="blank"
            >
              <YouTubeIcon className="youtubeSvgIcon" />
            </a>

            <a href="https://www.instagram.com/yuvraj042003/" target="blank">
              <InstagramIcon className="instagramSvgIcon" />
            </a>

            {/* <a href="https://www.linkedin.com/in/yuvraj-singh-603b61209/" target="blank">
              <LinkedinIcon className="linkedinSVGIcon" />
            </a> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
