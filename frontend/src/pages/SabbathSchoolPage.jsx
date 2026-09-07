import React from "react";
import { SABBATH_SCHOOL_LESSON, SABBATH_QUARTERS } from "../components/Shared/SermonArchive";

const SabbathSchoolPage = () => {
  return (
    <main className="page-shell sabbath-school-page">
      <section className="page-section sabbath-page-card">
        <div className="sabbath-header">
          <span className="sabbath-tag">Sabbath School</span>
          <span className="sabbath-date">{SABBATH_SCHOOL_LESSON.date}</span>
        </div>

        <div className="sabbath-main-header">
          <div>
            <p className="sabbath-kicker">የሰንበት ትምህርት</p>
            <h1>{SABBATH_SCHOOL_LESSON.title}</h1>
          </div>
          <a
            className="sabbath-action"
            href={SABBATH_SCHOOL_LESSON.youtubeLink}
            target="_blank"
            rel="noreferrer"
          >
            Open lesson
          </a>
        </div>

        <p className="sabbath-focus">{SABBATH_SCHOOL_LESSON.focus}</p>
        <p className="sabbath-subtitle">{SABBATH_SCHOOL_LESSON.subtitle}</p>

        <div className="sabbath-video-box">
          <div className="video-unavailable">{SABBATH_SCHOOL_LESSON.unavailableText}</div>
        </div>

        <div className="sabbath-content">
          <p className="sabbath-verse">{SABBATH_SCHOOL_LESSON.verse}</p>
          <p className="sabbath-theme">{SABBATH_SCHOOL_LESSON.theme}</p>
          <p>{SABBATH_SCHOOL_LESSON.note}</p>
        </div>

        <div className="sabbath-lessons-section">
          <div className="sabbath-lessons-header">
            <h2>Explore quarterly lessons</h2>
            <span>Lessons of previous quarters</span>
          </div>

          <div className="sabbath-lessons-grid">
            {SABBATH_QUARTERS.map((lesson) => (
              <div key={lesson.quarter} className="quarter-card">
                <span className="quarter-tag">{lesson.tag}</span>
                <h3>{lesson.quarter}</h3>
                <p>{lesson.title}</p>
                <small>{lesson.summary}</small>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default SabbathSchoolPage;
