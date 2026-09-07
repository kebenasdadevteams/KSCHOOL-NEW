import React, { useEffect, useMemo, useState } from "react";
import api from "../../services/api";
import "./SermonArchive.css";

const CHANNELS = [
  {
    name: "ሆፕ ቻናል ኢትዮጵያ",
    url: "https://www.youtube.com/@hopechannelethiopiaofficial/playlists",
    embedList: "hopechannelethiopiaofficial",
  },
  {
    name: "አሜዚንግ ፋክትስ (Amazing Facts)",
    url: "https://www.youtube.com/@AmazingFacts/playlists",
    embedList: "AmazingFacts",
  },
  {
    name: "ኢት ኢዝ ሪተን (It Is Written)",
    url: "https://www.youtube.com/@itiswritten",
    embedList: "itiswritten",
  },
  {
    name: "ሎማ ሊንዳ ዩኒቨርሲቲ ቤተክርስቲያን",
    url: "https://www.youtube.com/@LLUC/playlists",
    embedList: "LLUC",
  },
  {
    name: "የትንቢት ቃል ሚኒስትሪ",
    url: "https://www.youtube.com/@YetnbitKalMinistry/playlists",
    embedList: "YetnbitKalMinistry",
  },
];

const PLAYLISTS = {
  live: [
    {
      title: "የቀጥታ አምልኮ አገልግሎት",
      speaker: "ሆፕ ቻናል ኢትዮጵያ",
      channelUrl: "https://www.youtube.com/@hopechannelethiopiaofficial/playlists",
      embedUrl: "https://www.youtube.com/embed?listType=user_uploads&list=hopechannelethiopiaofficial",
      duration: "ማጫወቻ ዝርዝር",
      badge: "ቀጥታ",
      category: "live",
    },
    {
      title: "የሳምንቱ አጋማሽ የጸሎት ፕሮግራም",
      speaker: "የትንቢት ቃል ሚኒስትሪ",
      channelUrl: "https://www.youtube.com/@YetnbitKalMinistry/playlists",
      embedUrl: "https://www.youtube.com/embed?listType=user_uploads&list=YetnbitKalMinistry",
      duration: "ማጫወቻ ዝርዝር",
      badge: "ቀጥታ",
      category: "live",
    },
    {
      title: "የወጣቶች የመነቃቃት ስብሰባ",
      speaker: "ሎማ ሊንዳ ዩኒቨርሲቲ ቤተክርስቲያን",
      channelUrl: "https://www.youtube.com/@LLUC/playlists",
      embedUrl: "https://www.youtube.com/embed?listType=user_uploads&list=LLUC",
      duration: "ማጫወቻ ዝርዝር",
      badge: "ቀጥታ",
      category: "live",
    },
  ],
  featured: [
    {
      title: "የጸጋ ኃይል",
      speaker: "ኢት ኢዝ ሪተን",
      channelUrl: "https://www.youtube.com/@itiswritten",
      embedUrl: "https://www.youtube.com/embed?listType=user_uploads&list=itiswritten",
      duration: "ማጫወቻ ዝርዝር",
      badge: "ተመራጭ",
      category: "featured",
    },
    {
      title: "ተስፋ በየወቅቱ",
      speaker: "አሜዚንግ ፋክትስ",
      channelUrl: "https://www.youtube.com/@AmazingFacts/playlists",
      embedUrl: "https://www.youtube.com/embed?listType=user_uploads&list=AmazingFacts",
      duration: "ማጫወቻ ዝርዝር",
      badge: "ተመራጭ",
      category: "featured",
    },
    {
      title: "በእምነት መመላለስ",
      speaker: "ሆፕ ቻናል ኢትዮጵያ",
      channelUrl: "https://www.youtube.com/@hopechannelethiopiaofficial/playlists",
      embedUrl: "https://www.youtube.com/embed?listType=user_uploads&list=hopechannelethiopiaofficial",
      duration: "ማጫወቻ ዝርዝር",
      badge: "ተመራጭ",
      category: "featured",
    },
  ],
  serious: [
    {
      title: "ትምህርቶች ከበረሃው",
      speaker: "ኢት ኢዝ ሪተን",
      channelUrl: "https://www.youtube.com/@itiswritten",
      embedUrl: "https://www.youtube.com/embed?listType=user_uploads&list=itiswritten",
      duration: "ማጫወቻ ዝርዝር",
      badge: "ጥልቅ ጥናት",
      category: "serious",
    },
    {
      title: "የንሥሐ ጥሪ",
      speaker: "አሜዚንግ ፋክትስ",
      channelUrl: "https://www.youtube.com/@AmazingFacts/playlists",
      embedUrl: "https://www.youtube.com/embed?listType=user_uploads&list=AmazingFacts",
      duration: "ማጫወቻ ዝርዝር",
      badge: "ትምህርት",
      category: "serious",
    },
    {
      title: "የአምልኮ መንፈስ",
      speaker: "ሎማ ሊንዳ ዩኒቨርሲቲ ቤተክርስቲያን",
      channelUrl: "https://www.youtube.com/@LLUC/playlists",
      embedUrl: "https://www.youtube.com/embed?listType=user_uploads&list=LLUC",
      duration: "ማጫወቻ ዝርዝር",
      badge: "ጥናት",
      category: "serious",
    },
  ],
  theme: [
    {
      title: "ተመሳሳይ ርዕስ፡ እምነት ከፍርሃት በላይ",
      speaker: "የትንቢት ቃል ሚኒስትሪ",
      channelUrl: "https://www.youtube.com/@YetnbitKalMinistry/playlists",
      embedUrl: "https://www.youtube.com/embed?listType=user_uploads&list=YetnbitKalMinistry",
      duration: "ማጫወቻ ዝርዝር",
      badge: "ተከታታይ",
      category: "theme",
    },
    {
      title: "ተመሳሳይ ርዕስ፡ የጸሎት ኃይል",
      speaker: "ሆፕ ቻናል ኢትዮጵያ",
      channelUrl: "https://www.youtube.com/@hopechannelethiopiaofficial/playlists",
      embedUrl: "https://www.youtube.com/embed?listType=user_uploads&list=hopechannelethiopiaofficial",
      duration: "ማጫወቻ ዝርዝር",
      badge: "ተከታታይ",
      category: "theme",
    },
    {
      title: "ተመሳሳይ ርዕስ፡ እረፍት በክርስቶስ",
      speaker: "አሜዚንግ ፋክትስ",
      channelUrl: "https://www.youtube.com/@AmazingFacts/playlists",
      embedUrl: "https://www.youtube.com/embed?listType=user_uploads&list=AmazingFacts",
      duration: "ማጫወቻ ዝርዝር",
      badge: "ተከታታይ",
      category: "theme",
    },
  ],
};

const STORAGE_KEY = "k_school_sermon_recent";

export const SABBATH_SCHOOL_LESSON = {
  title: "የዚህ ሳምንት ትምህርት",
  focus: "የፍቅር ምሥልት",
  subtitle: "1ኛ እና 2ኛ ቆሮንቶስ",
  date: "የሩብ ዓመት ቀን፡ 3ኛው ሩብ ዓመት 2026",
  note: "ደብዳቤ መጻፍ ብዙ ዘመናትን ያስቆጠረ ነገር ግን ያልቀረ ተግባር ነው። እኛ ፊደሎች የሚጻፉበትን መንገድ ብቻ ቀይረናል። አዎ፣ ወረቀት በማህበራዊ ሚዲያ ተተካ። ነገር ግን፣ በይዘታቸው፣ ኢሜይሎች እና ሌሎች የኤሌክትሮኒክ ፊደሎች መሠረታዊ በሆነ መንገድ አንድ አይነት ተግባር ያከናውናሉ፤ ይህም መረጃን፣ ስሜትን እና ሀሳቦችን በማለዋወጥ ሰዎችን ማገናኘት ነው።",
  verse: "1ኛ ቆሮንቶስ 13",
  theme: "የክርስቶስ ፍቅር በተግባር",
  youtubeLink: "https://www.youtube.com/@LLUC/playlists",
  unavailableText: "የዩቲዩብ ሊንክ አይገኝም።",
};

export const SABBATH_QUARTERS = [
  {
    quarter: "3ኛው ሩብ ዓመት 2026",
    title: "1ኛ እና 2ኛ ቆሮንቶስ",
    summary: "ደብዳቤ መጻፍ ብዙ ዘመናትን ያስቆጠረ ነገር ግን ያልቀረ ተግባር ነው።",
    // tag: "የሰንበት ትምህርት",
  },
  {
    quarter: "2ኛው ሩብ ዓመት 2026",
    title: "ከእግዚአብሔር ጋር ያለው ግንኙነት",
    summary: "በመንፈሳዊ ዕድገት፣ በታማኝነት እና በዕለት ተዕለት ሕይወት ከእግዚአብሔር ጋር በቅርበት መመላለስ ላይ የተደረገ ጥናት።",
    tag: "ኢንቨርስ (InVerse)",
  },
  {
    quarter: "1ኛው ሩብ ዓመት 2026",
    title: "የተስፋ ኃይል",
    summary: "በትዕግሥት፣ በጽናት እና በክርስቶስ ጸጋ ለውጥ አምጪ ኃይል ላይ የተደረገ አስተንትኖ።",
    // tag: "የሰንበት ትምህርት",
  },
];

const toEmbedUrl = (youtubeUrl) => {
  if (!youtubeUrl) return "";

  try {
    const url = new URL(youtubeUrl);
    const videoId = url.searchParams.get("v");
    const listId = url.searchParams.get("list");

    if (videoId) return `https://www.youtube.com/embed/${videoId}`;
    if (listId) return `https://www.youtube.com/embed/videoseries?list=${listId}`;
    if (url.hostname.includes("youtu.be")) {
      const path = url.pathname.replace("/", "");
      return `https://www.youtube.com/embed/${path}`;
    }
    if (url.hostname === "www.youtube.com" || url.hostname === "youtube.com") {
      return youtubeUrl;
    }
    return "";
  } catch (error) {
    return "";
  }
};

const buildArchiveList = (items = []) => {
  const groups = { live: [], featured: [], serious: [], theme: [] };

  if (!Array.isArray(items)) {
    return groups;
  }

  items.forEach((item) => {
    const category = item.category || "featured";
    const normalized = {
      id: item.id,
      title: item.title,
      speaker: item.speaker,
      description: item.description,
      channelUrl: item.channel_url || item.youtube_url,
      embedUrl: toEmbedUrl(item.youtube_url),
      duration: item.duration || "ማጫወቻ ዝርዝር",
      badge: item.badge || "ተመራጭ",
      category,
      youtubeUrl: item.youtube_url,
      isFeatured: Boolean(item.is_featured),
      isArchived: Boolean(item.is_archived),
      sortOrder: Number(item.sort_order || 0),
    };

    if (!normalized.embedUrl) {
      return;
    }

    if (groups[category]) {
      groups[category].push(normalized);
    } else {
      groups.featured.push(normalized);
    }
  });

  Object.keys(groups).forEach((key) => {
    groups[key].sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
  });

  return groups;
};

const SermonArchive = () => {
  const [activeTab, setActiveTab] = useState("live");
  const [archiveItems, setArchiveItems] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [recentVideos, setRecentVideos] = useState([]);

  const groupedArchive = useMemo(() => buildArchiveList(archiveItems), [archiveItems]);
  const availableTabs = useMemo(() => {
    const tabs = ["live", "featured", "serious", "theme"]
      .filter((key) => (groupedArchive[key] || []).length > 0)
      .map((key) => ({
        key,
        label:
          key === "live"
            ? "ቀጥታ"
            : key === "featured"
              ? "ተመራጭ ስብከቶች"
              : key === "serious"
                ? "ጥልቅ ስብከቶች"
                : "ተመሳሳይ ርዕስ",
      }));

    return tabs;
  }, [groupedArchive]);

  const tabs = useMemo(
    () => [
      ...availableTabs,
      // { key: "sabbath-school", label: "የሰንበት ትምህርት" },
    ],
    [availableTabs]
  );

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      if (Array.isArray(saved)) {
        setRecentVideos(saved);
      }
    } catch (error) {
      console.error("Could not load recent sermons", error);
    }
  }, []);

  useEffect(() => {
    const loadArchive = async () => {
      try {
        const response = await api.get("/public/youtube-archive");
        const items = Array.isArray(response.data?.data) ? response.data.data : [];
        setArchiveItems(items);
      } catch (error) {
        console.error("Could not load archive from API, using fallback data", error);
        setArchiveItems([]);
      }
    };

    loadArchive();
  }, []);

  useEffect(() => {
    if (activeTab === "sabbath-school") {
      return;
    }

    const currentPlaylist = groupedArchive[activeTab] || groupedArchive.featured || [];
    setSelectedVideo((prev) => {
      if (prev && currentPlaylist.some((video) => video.title === prev.title && video.speaker === prev.speaker)) {
        return prev;
      }
      return currentPlaylist[0] || null;
    });
  }, [activeTab, groupedArchive]);

  const updateRecentVideos = (video) => {
    setRecentVideos((prev) => {
      const cleaned = [video, ...prev.filter((item) => item.title !== video.title || item.speaker !== video.speaker)].slice(0, 4);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cleaned));
      return cleaned;
    });
  };

  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
    updateRecentVideos(video);
  };

  const currentPlaylist = activeTab === "sabbath-school" ? [] : groupedArchive[activeTab] || groupedArchive.featured || [];
  const hasArchiveItems = tabs.some((tab) => tab.key !== "sabbath-school") && (Object.values(groupedArchive).some((items) => items.length > 0));

  return (
    <section className="sermon-archive" id="sermons">
      <div className="sermon-shell">
        <div className="sermon-header-wrap">
          <div>
            <p className="sermon-kicker">ቪዲዮ አርካይቭ</p>
            <h2 className="sermon-title">ስብከቶች፣ የቀጥታ አምልኮ እና የመልእክት ማጫወቻ ዝርዝሮች</h2>
          </div>
          <div className="sermon-badge">የዩቲዩብ አርካይቭ</div>
        </div>

        {hasArchiveItems && (
          <div className="source-links" aria-label="Sermon source channels">
            {CHANNELS.map((channel) => (
              <a key={channel.name} href={channel.url} target="_blank" rel="noreferrer" className="source-link">
                {channel.name}
              </a>
            ))}
          </div>
        )}

        {hasArchiveItems && (
          <div className="playlist-tabs" aria-label="Sermon playlist tabs">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                className={`playlist-tab ${activeTab === tab.key ? "active" : ""}`}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}

        {!hasArchiveItems ? (
          <div className="empty-state-archive">
            <h3> እስካሁን ምንም የስብከት አርካይቭ አልተጨመረም።</h3>
            <p>አስተዳዳሪው የዩቲዩብ አርካይቭ ንጥሎችን ወደ ዳታቤዝ ሲያክላቸው፣ እዚህ በራስ-ሰር ይታያሉ።</p>
          </div>
        ) : (
        <div className="sermon-layout">
          <div className="sermon-main-panel">
            {/* Sabbath School section is temporarily hidden for future development.
            {activeTab === "sabbath-school" ? (
              <div className="sabbath-school-panel">
                 <div className="sabbath-header">
                  <span className="sabbath-tag">የሰንበት ትምህርት</span>
                  <span className="sabbath-date">{SABBATH_SCHOOL_LESSON.date}</span>
                </div> 

                <div className="sabbath-main-header">
                 <div>
                    <p className="sabbath-kicker">የሰንበት ትምህርት</p>
                    <h3>{SABBATH_SCHOOL_LESSON.title}</h3>
                  </div> 
                  <a
                    className="sabbath-action"
                    href={SABBATH_SCHOOL_LESSON.youtubeLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    ትምህርቱን ክፈት
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
                    <h4>የሩብ ዓመቱን ትምህርቶች ይመልከቱ</h4>
                    <span>ያለፉት ሩብ ዓመታት ትምህርቶች</span>
                  </div>

                  <div className="sabbath-lessons-grid">
                    {SABBATH_QUARTERS.map((lesson) => (
                      <div key={lesson.quarter} className="quarter-card">
                        <span className="quarter-tag">{lesson.tag}</span>
                        <h5>{lesson.quarter}</h5>
                        <p>{lesson.title}</p>
                        <small>{lesson.summary}</small>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : ( */}
            {(
              <>
                {selectedVideo && (
                  <>
                    <div className="video-frame-wrap">
                      <iframe
                        className="video-frame"
                        src={selectedVideo.embedUrl}
                        title={selectedVideo.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    </div>

                    <div className="video-meta">
                      <div className="video-meta-top">
                        <span className="video-badge">{selectedVideo.badge}</span>
                        <span className="video-length">{selectedVideo.duration}</span>
                      </div>
                      <h3>{selectedVideo.title}</h3>
                      <p>
                        {selectedVideo.speaker} • የ{selectedVideo.category.toUpperCase()} መልእክት
                      </p>
                    </div>
                  </>
                )}

                <div className="playlist-stack">
                  {currentPlaylist.map((video) => (
                    <button
                      key={`${video.title}-${video.speaker}`}
                      type="button"
                      className={`playlist-item ${selectedVideo?.title === video.title && selectedVideo?.speaker === video.speaker ? "selected" : ""}`}
                      onClick={() => handleVideoSelect(video)}
                    >
                      <div className="playlist-thumb playlist-placeholder">
                        <span>{video.speaker}</span>
                      </div>
                      <div className="playlist-copy">
                        <span className="playlist-badge">{video.badge}</span>
                        <h4>{video.title}</h4>
                        <p>{video.speaker}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <aside className="recent-panel">
            <div className="recent-header">
              <h3>በቅርቡ የታዩ</h3>
              <span>{recentVideos.length}</span>
            </div>

            <div className="recent-list">
              {recentVideos.length ? (
                recentVideos.map((video) => (
                  <button
                    key={`${video.title}-${video.speaker}`}
                    type="button"
                    className="recent-item"
                    onClick={() => handleVideoSelect(video)}
                  >
                    <div className="recent-thumb recent-placeholder">
                      <span>{video.speaker.slice(0, 2).toUpperCase()}</span>
                    </div>
                    <div className="recent-copy">
                      <span>{video.badge}</span>
                      <strong>{video.title}</strong>
                      <small>{video.speaker}</small>
                    </div>
                  </button>
                ))
              ) : (
                <p className="empty-state">እስካሁን ምንም ስብከት አልታየም። የቅርብ ጊዜ ዝርዝርዎን ለመጀመር መልእክት ይምረጡ።</p>
              )}
            </div>
          </aside>
        </div>
        )}
      </div>
    </section>
  );
};

export default SermonArchive;