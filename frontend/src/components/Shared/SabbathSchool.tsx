// SabbathSchool.tsx
import React, { useEffect, useState } from "react";
import "./SabbathSchool.css";

export const SABBATH_SCHOOL_LESSON = {
  title: "This Week's Lesson",
  focus: "የፍቅር ምሥል",
  subtitle: "1ኛ እና 2ኛ ቆሮንቶስ",
  dateRange: "ነሃሴ 2 - ነሃሴ 8",
  quarter: "3ኛ ሩብ አመት 2026",
  note: "ደብዳቤ መጻፍ ብዙ ዘመናትን ያስቆጠረ ነገር ግን ያልቀረ ተግባር ነው። እኛ ፊደሎች የሚጻፉበትን መንገድ ብቻ ቀይረናል። አዎ፣ ወረቀት በማህበራዊ ሚዲያ ተተካ። ነገር ግን፣ በይዘታቸው፣ ኢሜይሎች እና ሌሎች የኤሌክትሮኒክ ፊደሎች መሠረታዊ በሆነ መንገድ አንድ አይነት ተግባር ያከናውናሉ፤ ይህም መረጃን፣ ስሜትን እና ሀሳቦችን በማለዋወጥ ሰዎችን ማገናኘት ነው።",
  verse: "1 Corinthians 13",
  theme: "The love of Christ in action",
  youtubeLink: "https://www.youtube.com/@LLUC/playlists",
  unavailableText: "YouTube link unavailable.",
};

// All quarters data from the background file
export const SABBATH_QUARTERS = [
  {
    id: "corinthians",
    quarter: "3ኛ ሩብ አመት 2026",
    title: "1ኛ እና 2ኛ ቆሮንቶስ",
    summary: "ደብዳቤ መጻፍ ብዙ ዘመናትን ያስቆጠረ ነገር ግን ያልቀረ ተግባር ነው። እኛ ፊደሎች የሚጻፉበትን መንገድ ብቻ ቀይረናል።",
    tag: "Sabbath School",
    date: "ነሃሴ 2 - ነሃሴ 8",
  },
  {
    id: "relationship",
    quarter: "2ኛ ሩብ አመት 2026",
    title: "ከእግዚአብሔር ጋር ያለንን ግንኙነት ማሳደግ",
    summary: "እርስዎ በሰባተኛ ቀን አድቬንቲስት ቤተ ክርስቲያን አባል ሆነው ያደጉ ቢሆኑ ወይም ለእምነቱ አዲስ ቢሆኑ፤ ብዙ ወይም ጥቂት የመጽሐፍ ቅዱስ ጥናት መመሪያዎችን አንብበው ቢሆን እንዲሁም ዛሬ እራስዎን በመንፈሳዊ አቋም በየትኛውም ሁኔታ ውስጥ ቢያገኙም፣ ከእግዚአብሔር ጋር ትርጉም ባለው ግንኙነት ውስጥ ማደግ የሚለው ርዕስ ወሳኝ ነው።",
    tag: "InVerse",
    date: "ሰኔ - ሐምሌ 2026",
  },
  {
    id: "final-scenes",
    quarter: "2ኛ ሩብ አመት 2026",
    title: "የመጨረሻዎቹ ትዕይንቶች",
    summary: "መጽሐፍ ቅዱስ በ1ኛ ዮሐንስ 4፡8 ላይ እግዚአብሔር...",
    tag: "Sabbath School",
    date: "ሰኔ - ሐምሌ 2026",
  },
  {
    id: "reconciliation",
    quarter: "1ኛ ሩብ ዓመት 2026",
    title: "ሰማይ እና ምድርን ማስታረቅ በፊልጵስዩስ እና በቆላስይስ ስለ ኢየሱስ መማር",
    summary: "እርስዎ ስለ ሠሩት እጅግ ከባድ ስራ ያስቡ። ሥራውን በጣም ያከበደው ምን ነበር?",
    tag: "Sabbath School",
    date: "መጋቢት - ሚያዝያ 2026",
  },
  {
    id: "apologetics",
    quarter: "1ኛ ሩብ ዓመት 2026",
    title: "አፖሎጂቲክስ",
    summary: "ስለ እምነት እና ስለ መንፈሳዊነት ያሉ አመለካከቶች ዘወትር እየተለዋወጡ በሚገኙበት በዚህ ዘመን፣ ወጣቶች ብዙውን ጊዜ በእምነትና በጥርጣሬ መካከል ላይ ይቆማሉ።",
    tag: "InVerse",
    date: "መጋቢት - ሚያዝያ 2026",
  },
  {
    id: "joshua-faith",
    quarter: "መስከረም · ጥቅምት · ህዳር · ታህሳስ 2025",
    title: "ከኢያሱ መጽሐፍ የሚገኙ የእምነት ትምህርቶች",
    summary: "መጽሐፈ ኢያሱ ከሙሴ አመራር ወደ ኢያሱ የተሸጋገረበት ጊዜ ላይ ይጀምራል።",
    tag: "Sabbath School",
    date: "መስከረም - ታህሳስ 2025",
  },
  {
    id: "joshua-book",
    quarter: "4ኛ ሩብ አመት 2025",
    title: "መጽሐፈ ኢያሱ",
    summary: "የኢያሱና የትውልዱ ታሪክ ስለ ፍጻሜና ስለ አዲስ ጅማሮ ይተርካል።",
    tag: "Sabbath School",
    date: "መስከረም - ታህሳስ 2025",
  },
  {
    id: "exodus",
    quarter: "3ኛ ሩብ አመት 2025",
    title: "ዘፀአት",
    summary: "በዘፀአት መጽሐፍ ውስጥ የተገለጸው እግዚአብሔር፣ በራሱ ጊዜ ብርቱ በሆኑ እርምጃዎቹ ለሕዝቡ ነጻ መውጣትንና ድነትን ያመጣ አፍቃሪ አምላክ ነው።",
    tag: "Sabbath School",
    date: "ሰኔ - መስከረም 2025",
  },
  {
    id: "exodus-book",
    quarter: "ሰኔ · ሐምሌ · ነሐሴ · መስከረም 2017/18",
    title: "የዘጸአት መጽሐፍ",
    summary: "እግዚአብሔር ሥራውን ባለ መቋረጥ ሲሰራ ማየት ፈልጋችሁ ታውቃላችሁ? ይህ ፍላጎት መጽሐፍ ቅዱስን እና እግዚአብሔርን የሚያምኑ አማኞች የውስጥ መሻት ነው።",
    tag: "InVerse",
    date: "ሰኔ - መስከረም 2017/18",
  },
  {
    id: "prophecy-symbols",
    quarter: "ሚያዝያ · ግንቦት · ሰኔ 2017",
    title: "ፍንጮች፣ ምስሎች፣ ምሳሌዎች፡ የመጽሐፍ ቅዱስ ትንቢት ማጥኛ መንገድ",
    summary: "በዓይነቱ የመጀመሪያ በነበረው የባሕረ ሰላጤው ጦርነት (1983 ዓ.ም.) አንድ ታዋቂ የፕሮቴስታንት እምነት ጸሐፊ እና ሰባኪ፣ የራእይ መጽሐፍ ይህን ግጭት በትንቢት ለመናገሩ እርግጠኛ ነበሩ።",
    tag: "Sabbath School",
    date: "ሚያዝያ - ሰኔ 2017",
  },
  {
    id: "altar-return",
    quarter: "ሚያዝያ · ግንቦት · ሰኔ 2017",
    title: "ወደ መሰዊያው መመለሥ",
    summary: "የጀመረው ገና የሁለተኛ ደረጃ ትምህርቴን በጀመርኩበት ወቅት፣ የአስራ ስድስት አመት ልጅ እያለሁ ነው።",
    tag: "InVerse",
    date: "ሚያዝያ - ሰኔ 2017",
  },
  {
    id: "love-justice",
    quarter: "1ኛ ሩብ ዓመት 2025",
    title: "የእግዚአብሔር ፍቅር እና ፍትሕ",
    summary: "1 ዮሐ. 4:8 እና 16 እግዚአብሔር ፍቅር ነው ይላል። መላው መጽሐፍ ቅዱስ ይህን እውነታ ይመሰክራል።",
    tag: "Sabbath School",
    date: "መስከረም - ታህሳስ 2024",
  },
  {
    id: "john-gospel",
    quarter: "መስከረም · ጥቅምት · ህዳር · ታህሳስ 2024",
    title: "የዮሐንስ ወንጌል ዋና ዋና ሐሳቦች",
    summary: "በኢራን ዋና ከተማ ቴህራን በሚገኝ አንድ ሱቅ ውስጥ የፋርስ ምንጣፍ ይታያል።",
    tag: "InVerse",
    date: "መስከረም - ታህሳስ 2024",
  },
  {
    id: "mark-book",
    quarter: "ሰኔ · ሐምሌ · ነሐሴ · መስከረም 2016/17",
    title: "የማርቆስ መጽሐፍ",
    summary: "ከማርቆስ መጽሐፍ ጅማሮ አንስቶ አንባቢው ኢየሱስ መሲህ፣ የእግዚአብሔር ልጅ መሆኑን ያውቃል (ማርቆስ 1፡1)።",
    tag: "Sabbath School",
    date: "ሰኔ - መስከረም 2016/17",
  },
  {
    id: "great-controversy",
    quarter: "መጋቢት · ሚያዝያ · ግንቦት · ሰኔ 2016",
    title: "ታላቁ ተጋድሎ",
    summary: "\"የመጽሐፍ ቅዱስ መልእክት ዐበይት ጭብጥ ምንድን ነው?\" ተብለው ቢጠየቁ መልስዎ ምን ይሆናል?",
    tag: "Sabbath School",
    date: "መጋቢት - ሰኔ 2016",
  },
  {
    id: "psalms",
    quarter: "ጥር · የካቲት · መጋቢት 2024",
    title: "መጽሐፈ መዝሙረ ዳዊት",
    summary: "በመዝሙረ ዳዊት ውስጥ ያሉ መዝሙሮች ተወዳዳሪ የሌላቸው የመጽሐፍ ቅዱስ ጸሎቶችና መንፈሳዊ መዝሙሮች ናቸው።",
    tag: "Sabbath School",
    date: "ጥር - መጋቢት 2024",
  },
  {
    id: "mission",
    quarter: "ጥቅምት · ህዳር · ታህሳስ 2023",
    title: "የእግዚአብሔር ተልዕኮ የእኔ ተልዕኮ",
    summary: "ከዓመታት በፊት ከአድቬንቲስት መጽሄቶች መካከል አንዱ ላይ ስለ አንድ አሰቃቂ ረግረጋማ ስፍራ (አረንቋ) ታትሞ ነበር።",
    tag: "InVerse",
    date: "ጥቅምት - ታህሳስ 2023",
  },
  {
    id: "three-angels",
    quarter: "ሚያዝያ · ግንቦት · ሰኔ 2023",
    title: "የሶስቱ መላእክት መልእክት",
    summary: "የኮሙኒዝም መስራች ለነበረው ካርል ማርክስም 1844 ዓ.ም ወሳኝ ዓመት ነበር።",
    tag: "Sabbath School",
    date: "ሚያዝያ - ሰኔ 2023",
  },
  {
    id: "death-hope",
    quarter: "ጥቅምት · ህዳር · ታህሳስ 2022",
    title: "ስለ ሞት፣ ስለ መሞትና ስለ ወደፊቱ ተስፋ",
    summary: "እግዚአብሔር ሰብአዊ ፍጡርን የፈጠረው ከእርሱና ከፍጥረታቱ ጋር የፍቅር ግንኙነት በመመስረት እንዲደሰት ነው።",
    tag: "Sabbath School",
    date: "ጥቅምት - ታህሳስ 2022",
  },
  {
    id: "trial-christ",
    quarter: "ሐምሌ · ነሐሴ · መስከረም 2022",
    title: "በፈተና ውስጥ ከክርስቶስ ጋር",
    summary: "‹‹ሁሉ በእርሱ ሆነ፣ ከሆነውም አንዳች እንኳ ያለእርሱ አልሆነም›› (ዮሐ 1፡3)።",
    tag: "InVerse",
    date: "ሐምሌ - መስከረም 2022",
  },
  {
    id: "genesis",
    quarter: "ሚያዝያ · ግንቦት · ሰኔ 2022",
    title: "ዘፍጥረት",
    summary: "የኦሪት ዘፍጥረት መጽሐፍ፡ ፈጣሪያችን ስለሆነው የሱስ፣ ደጋፊያችን ስለሆነው የሱስ፣ አዳኛችን ስለሆነው የሱስ ይናገራል።",
    tag: "Sabbath School",
    date: "ሚያዝያ - ሰኔ 2022",
  },
  {
    id: "hebrews",
    quarter: "ጥር · የካቲት · መጋቢት 2022",
    title: "የዕብራውያን መልዕክት፡ በነዚህ የመጨረሻ ቀናት",
    summary: "ይህ የጎልማሶች ሰንበት ትምህርት የመጽሐፍ ቅዱስ ጥናት መምሪያ የሚዘጋጀው በሰባተኛ ቀን አድቬንቲስት ቤተ ክርስቲያን ዋና መስሪያ ቤት በሆነው በጀነራል ኮንፍረንስ ውስጥ ሆኖ።",
    tag: "Sabbath School",
    date: "ጥር - መጋቢት 2022",
  },
  {
    id: "rest-christ",
    quarter: "3ኛ ሩብ ዓመት 2021",
    title: "በክርስቶስ ማረፍ",
    summary: "አውሮፕላኑ ከባድ ውሽንፍር አዘል ዐውሎ ነፋስ ማቋረጥ እንዳለበት ካፕቴኑ ከማብረሪያ ክፍላቸው ሆነው እስካስታወቁበት ጊዜ ድረስ በረራው ያን ያህል አስደሳች አልነበረም።",
    tag: "Sabbath School",
    date: "ሐምሌ - መስከረም 2021",
  },
  {
    id: "education",
    quarter: "ጥቅምት · ህዳር · ታህሳስ 2020",
    title: "ትምህርት",
    summary: "\"የጥበብ መጀመሪያ እግዚአብሔርን መፍራት ነው የቅዱሱም እውቀት ማስተዋል ነው\" (ምሳሌ 9:10)።",
    tag: "InVerse",
    date: "ጥቅምት - ታህሳስ 2020",
  },
  {
    id: "mission-joy",
    quarter: "3ኛ ሩብ ዓመት 2020",
    title: "የእግዚአብሔርን ተልዕኮ በማካፈል የሚገኝ ደስታ",
    summary: "አንድ ሀሳብን መረዳታችን በሕይወታችን ውስጥ ትልቅ ለውጥ የሚያመጣባቸው ጊዜያት አሉ።",
    tag: "Sabbath School",
    date: "ሐምሌ - መስከረም 2020",
  },
  {
    id: "interpret-bible",
    quarter: "ሚያዝያ · ግንቦት · ሰኔ 2020",
    title: "መጽሐፍ ቅዱስን እንዴት እንተርጉም",
    summary: "እንደ ሰባተኛ ቀን አድቬንቲስቶች ፣ እኛ ፕሮቴስታንቶች ነን ፣ ይህም ማለት በሶላ እስኩታራ ፣ መጽሐፍ ቅዱስ ብቻ የእምነታችን እና የትምህርታችን መሰረታዊ ስልጣን መሠረት እናምናለን ማለት ነው።",
    tag: "InVerse",
    date: "ሚያዝያ - ሰኔ 2020",
  },
  {
    id: "daniel",
    quarter: "1ኛ ሩብ ዓመት 2020",
    title: "ትንቢተ ዳንኤል",
    summary: "19ኛው ክፍለ ዘመን እያለፈ በ 20ኛው ክፍለ ዘመን ሲተካ በምዕራቡ አለም ተስፈኝነት ሰፈነ።",
    tag: "Sabbath School",
    date: "ጥር - መጋቢት 2020",
  },
];

interface SabbathSchoolProps {
  className?: string;
}

const SabbathSchool: React.FC<SabbathSchoolProps> = ({ className = "" }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTag, setFilterTag] = useState<string>("All");
  const [filteredQuarters, setFilteredQuarters] = useState(SABBATH_QUARTERS);

  const tags = ["All", "Sabbath School", "InVerse"];

  useEffect(() => {
    let filtered = SABBATH_QUARTERS;

    if (filterTag !== "All") {
      filtered = filtered.filter((q) => q.tag === filterTag);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (q) =>
          q.title.toLowerCase().includes(query) ||
          q.summary.toLowerCase().includes(query) ||
          q.quarter.toLowerCase().includes(query)
      );
    }

    setFilteredQuarters(filtered);
  }, [searchQuery, filterTag]);

  return (
    <section className={`sabbath-school-page ${className}`} id="sabbath-school">
      <div className="sabbath-school-shell">
        {/* Current Lesson Section */}
        <div className="current-lesson-section">
          <div className="lesson-header-wrap">
            <div className="lesson-header-left">
              <span className="sabbath-page-kicker">የሰንበት ትምህርት</span>
              <h1 className="lesson-page-title">{SABBATH_SCHOOL_LESSON.title}</h1>
            </div>
            <a
              className="lesson-action-btn"
              href={SABBATH_SCHOOL_LESSON.youtubeLink}
              target="_blank"
              rel="noreferrer"
            >
              ትምህርቱን ክፈት
            </a>
          </div>

          <div className="lesson-meta-grid">
            <div className="lesson-meta-item">
              <span className="meta-label">የሳምንቱ ትምህርት</span>
              <span className="meta-value focus-value">{SABBATH_SCHOOL_LESSON.focus}</span>
            </div>
            <div className="lesson-meta-item">
              <span className="meta-label">መጽሐፍ</span>
              <span className="meta-value">{SABBATH_SCHOOL_LESSON.subtitle}</span>
            </div>
            <div className="lesson-meta-item">
              <span className="meta-label">ቀን</span>
              <span className="meta-value">{SABBATH_SCHOOL_LESSON.dateRange}</span>
            </div>
            <div className="lesson-meta-item">
              <span className="meta-label">ሩብ አመት</span>
              <span className="meta-value">{SABBATH_SCHOOL_LESSON.quarter}</span>
            </div>
          </div>

          <div className="lesson-video-section">
            <div className="video-placeholder-box">
              <div className="video-unavailable-message">
                <span className="unavailable-icon">📺</span>
                <p>{SABBATH_SCHOOL_LESSON.unavailableText}</p>
              </div>
            </div>
          </div>

          <div className="lesson-content-box">
            <div className="lesson-verse-theme">
              <span className="verse-tag">{SABBATH_SCHOOL_LESSON.verse}</span>
              <span className="theme-tag">{SABBATH_SCHOOL_LESSON.theme}</span>
            </div>
            <p className="lesson-note">{SABBATH_SCHOOL_LESSON.note}</p>
          </div>
        </div>

        {/* All Quarters Section */}
        <div className="quarters-section">
          <div className="quarters-header">
            <div>
              <h2>Explore Quarterly Lessons</h2>
              <p className="quarters-subtitle">Lessons of previous quarters</p>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="search-filter-bar">
            <div className="search-wrapper">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                className="search-input"
                placeholder="Search lessons..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="filter-tabs">
              {tags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  className={`filter-tab ${filterTag === tag ? "active" : ""}`}
                  onClick={() => setFilterTag(tag)}
                >
                  {tag === "All" ? "ሁሉም (All)" : tag}
                </button>
              ))}
            </div>
          </div>

          {/* Quarters Grid */}
          <div className="quarters-grid">
            {filteredQuarters.length > 0 ? (
              filteredQuarters.map((lesson) => (
                <div key={lesson.id} className="quarter-card">
                  <div className="quarter-card-top">
                    <span className="quarter-tag">{lesson.tag}</span>
                    <span className="quarter-date-badge">{lesson.date}</span>
                  </div>
                  <h3 className="quarter-title">{lesson.title}</h3>
                  <p className="quarter-summary">{lesson.summary}</p>
                  <div className="quarter-card-bottom">
                    <span className="quarter-label">{lesson.quarter}</span>
                    <button
                      type="button"
                      className="quarter-view-btn"
                      onClick={() => {
                        // Scroll to current lesson or navigate
                        document.querySelector(".current-lesson-section")?.scrollIntoView({
                          behavior: "smooth",
                        });
                      }}
                    >
                      View Lesson
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-results">
                <p>No lessons found matching your search.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SabbathSchool;