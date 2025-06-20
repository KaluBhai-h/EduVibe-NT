import React, { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "../styles/ChapterLectures.css";
import mlogo from "../assets/ntmlogo.jpg";

const ChapterLectures9 = () => {
  const { classId, subject, chapterIndex } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) navigate("/login");
  }, [navigate]);

  const chapterLectures = {
    Science: {
      0: [
        { 
         name: "Lecture 1",
         m3u8Url: "YOUR_M3U8_LINK",
         notesUrl: "" 
        },
        {
      name: "Lecture 2",
      m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/4357724/174532620129898296383/174532620129898296383_8296383.m3u8",
      notesUrl: ""
      },
        {
          name: "Lecture 3",
          notesUrl: "",
          m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/4359011/174542283188648296383/174542283188648296383_8296383.m3u8"
        },
        {
          name: "Lecture 4",
          m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/4363242/174584458672078296383/174584458672078296383_8296383.m3u8"
        },
        {
          name: "L 5",
          m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/4364523/174592976773988296383/174592976773988296383_8296383.m3u8"
        },
        {
          name: "L 6",
          m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/4366027/174602777136308296383/174602777136308296383_8296383.m3u8"
        },
        {
          name: "Que practice + doubt solving",
          m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/4372218/174645099842398296383/174645099842398296383_8296383.m3u8",
          notesUrl: ""
        },
      ],
      1: [
{'name': 'L1', 'm3u8Url': 'https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/4373763/174653575278717555169/174653575278717555169_7555169.m3u8'},
{'name': 'L2', 'm3u8Url': 'https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/4375004/174663371989087555169/174663371989087555169_7555169.m3u8'},
{'name': 'L3', 'm3u8Url': 'https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/4379021/174705453261387555169/174705453261387555169_7555169.m3u8'},
{'name': 'L4', 'm3u8Url': 'https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/4380507/174714048756637555169/174714048756637555169_7555169.m3u8'},
{'name': 'L5 (Doubt Solving)', 'm3u8Url': 'https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/4381981/174723737820747555169/174723737820747555169_7555169.m3u8'},
{'name': 'Fundamental Unit of Life L1', 'm3u8Url': 'https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/4385663/174765778737748296383/174765778737748296383_8296383.m3u8'},
{'name': 'L2', 'm3u8Url': 'https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/4388166/174784311082348296383/174784311082348296383_8296383.m3u8'},
{'name': 'L3', 'm3u8Url': 'https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/4392729/174826422289318296383/174826422289318296383_8296383.m3u8'},
{'name': 'L4', 'm3u8Url': 'https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/4393920/174834967737708296383/174834967737708296383_8296383.m3u8'},
{'name': 'L5', 'm3u8Url': 'https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/4395109/174844706284808296383/174844706284808296383_8296383.m3u8'},
],
    },
    SST: {
      0: [
      {
        name: "Lecture 1"
      },
      {
        name: "Lecture 2",
        m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/4358823/174541217023577880624/174541217023577880624_7880624.m3u8"
      },
      {
        name: "Lecture 3",
        m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/4359911/174549813759727880624/174549813759727880624_7880624.m3u8"
      },
        {
          name: "L 4",
          m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/4364774/174594113722007880624/174594113722007880624_7880624.m3u8"
        },
        {
          name: "L 5",
          m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/4365809/174601655378227880624/174601655378227880624_7880624.m3u8"
        },
        {
          name: "L 6",
          m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/4366987/174610309713617880624/174610309713617880624_7880624.m3u8"
        },
        {
          name: "L 7",
          m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/4372289/174645974230447880624/174645974230447880624_7880624.m3u8",
          notesUrl: ""
        },
        {
          name: "L 8",
          m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/4373916/174654612513167880624/174654612513167880624_7880624.m3u8",
          notesUrl: ""
        },
        {
          name: "Doubt solving + L 9",
          m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/4374872/174662189759057880624/174662189759057880624_7880624.m3u8",
          notesUrl: ""
        },
      ],
    },
    // Add 
    Maths: {
      0: [
      {
        name: "Lecture 1",
      },
      {
        name: "Lecture 2",
        m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/4360152/174550928629871097666/174550928629871097666_1097666.m3u8"
      },
      {
        name: "Lecture 3",
        m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/4361156/174558576440391097666/174558576440391097666_1097666.m3u8"
      },
        {
          name: "Lecture 4",
          m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/4362008/174567183539581097666/174567183539581097666_1097666.m3u8"
        },
          {
            name: "L 5",
            m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/4367149/174611361544421097666/174611361544421097666_1097666.m3u8"
          },
        {
          name: "L 6",
          m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/4368222/174619110643541097666/174619110643541097666_1097666.m3u8",
          notesUrl: ""
        },
        {
          name: "L 7",
          m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/4370049/174627933537761097666/174627933537761097666_1097666.m3u8",
          notesUrl: ""
        },
      ],
      1:[
{'name': 'Polynomials L1', 'm3u8Url': 'https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/4377207/174679563175571097666/174679563175571097666_1097666.m3u8'},
{'name': 'Polynomials L2', 'm3u8Url': 'https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/4377938/174688306660241097666/174688306660241097666_1097666.m3u8'},
{'name': 'Polynomials L3', 'm3u8Url': 'https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/4383998/174739970880251097666/174739970880251097666_1097666.m3u8'},
{'name': 'Polynomials L4', 'm3u8Url': 'https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/4384765/174748733028261097666/174748733028261097666_1097666.m3u8'},
{'name': 'Polynomials L5', 'm3u8Url': 'https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/4384986/174757357814051097666/174757357814051097666_1097666.m3u8'},
{'name': 'Polynomials L6', 'm3u8Url': 'https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/4389346/174793035190161097666/174793035190161097666_1097666.m3u8'},
{'name': 'Polynomials L7', 'm3u8Url': 'https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/4390842/174800460375161097666/174800460375161097666_1097666.m3u8'},
{'name': 'Polynomials L8', 'm3u8Url': 'https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/4391472/174809232290121097666/174809232290121097666_1097666.m3u8'},
{'name': 'Coordinate Geometry L1', 'm3u8Url': 'https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/4396260/174853287832481261798/174853287832481261798_1261798.m3u8'},
{'name': 'Coordinate Geometry L2', 'm3u8Url': 'https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/4397075/174860816936171261798/174860816936171261798_1261798.m3u8'},
],
    },
  };

  return (
    <div className="chapter-lectures-container">
      <img src={mlogo} alt="Logo" className="big-logo" />
      <h2>{subject} - Chapter {parseInt(chapterIndex) + 1}</h2>
      <div className="lecture-boxes">
        {chapterLectures[subject]?.[chapterIndex]?.map((lecture, index) => (
          <Link
            key={index}
            to={`/video/9/${subject}/${chapterIndex}`}
            state={{
              chapterName: lecture.name,
              m3u8Url: lecture.m3u8Url,
              notesUrl: lecture.notesUrl,
            }}
            className="lecture-box"
          >
            {lecture.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ChapterLectures9;
