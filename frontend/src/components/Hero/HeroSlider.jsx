import React, { useState, useEffect, useRef } from "react";
import api from "../../services/api";
import "./HeroSlider.css";
import { useLanguage } from "../../contexts/LanguageContext";
import kebenaChurch from "../../assets/kebena_church.jpg";
import jesusWalking from "../../assets/jesus_walking.jpg";
import openBible from "../../assets/open_bible.jpg";

const slides = [
  {
    image: kebenaChurch,
    title: {
      en: "Welcome to the Kebena Seventh Day Adventist church, where Christ is Preached",
      am: "እንኳን ወደ ቀበና ሰባተኛ ቀን አድቬንቲስት ቤተክርስቲያን በደህና መጡ",
      or: "Gara Waldaa Adventistii Guyyaa Torbaffaa Qabbannaattiitti Iddo yesus lallabamutti Baga Nagaan Dhuftan",
    },
    subtitle: {
      en: "Come worship with us and experience the kindness and love of God our savior. ",
      am: `"...ነገር ግን የመድኃኒታችን የእግዚአብሔር ቸርነትና ሰውን መውደዱ በተገለጠ ጊዜ፥ እንደ ምሕረቱ መጠን ለአዲስ ልደት 
      በሚሆነው መታጠብና በመንፈስ ቅዱስ በመታደስ አዳነን እንጂ፥ እኛ ስላደረግነው በጽድቅ ስለ ነበረው ሥራ አይደለም፤" ቲቶ 3:4-5`,
      or: "Kottaa nu waliin waaqeffadhaa, jaalalaaf garramummaa waaqayyo fayyisaa keenyaas dhandhamadhaa",
    },
    btnPrimary: { en: "Join Us", am: "ይቀላቀሉን", or: "Nu Daawwadhaa" },
  },
  {
    image: jesusWalking,
    title: {
      en: "Growing Together in Faith",
      am: "በእምነትና በህብረት ማደግ",
      or: "Amantiidhaan Waliin Guddachuu",
    },
    subtitle: {
      en: "A community devoted to God's word",
      am: "ህይወትዎ የሚለወጥበት በተከታታይ የሚማሩት ሲጨርሱም የምስክር ወረቀት የሚቀበሉበት ትምህርት እንደተዘጋጀ ያውቃሉ?",
      or: "Hawaasa Sagalee Waaqaatiif of kenne",
    },
    btnPrimary: { en: "Join Us", am: "ይቀላቀሉን", or: "Nu Daawwadhaa" },
  },
  {
    image: openBible,
    title: {
      en: "Experience God's Love",
      am: "የእግዚአብሔርን ፍቅር ይለማመዱ",
      or: "Jaalala Waaqayyoo Dhandhamadhaa",
    },
    subtitle: {
      en: "Everyone is welcome here",
      am: "ሁሉም እዚህ እንኳን ደህና መጡ",
      or: "Namni hundumtuu asitti Afeeeramaadha",
    },
    btnPrimary: { en: "Join Us", am: "ይቀላቀሉን", or: "Nu Daawwadhaa" },
  },
];

const toEmbedUrl = (youtubeUrl) => {
  if (!youtubeUrl) return "";

  try {
    const url = new URL(youtubeUrl);
    if (!/(^|\.)youtube\.com$/.test(url.hostname) && !url.hostname.endsWith("youtu.be")) {
      return "";
    }
    const videoId = url.searchParams.get("v");
    const listId = url.searchParams.get("list");

    if (videoId) return `https://www.youtube.com/embed/${videoId}`;
    if (listId) return `https://www.youtube.com/embed/videoseries?list=${listId}`;
    if (url.hostname.includes("youtu.be")) {
      const path = url.pathname.replace("/", "");
      return `https://www.youtube.com/embed/${path}`;
    }
    return youtubeUrl;
  } catch (error) {
    return "";
  }
};

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [liveStream, setLiveStream] = useState(null);
  const [isMiniPlayer, setIsMiniPlayer] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const heroRef = useRef(null);
  const { language } = useLanguage();

  useEffect(() => {
    const loadLiveStream = async () => {
      try {
        const response = await api.get("/public/youtube-archive");
        const archiveItems = Array.isArray(response.data?.data) ? response.data.data : [];
        const activeLive = archiveItems.find((item) => {
          const source = item.youtube_url || item.youtubeUrl || item.embedUrl;
          return String(item.category).toLowerCase() === "live"
            && item.is_archived !== true
            && item.is_archived !== 1
            && toEmbedUrl(source);
        });
        setLiveStream(activeLive || null);
      } catch (error) {
        console.error("Unable to load live hero stream", error);
        setLiveStream(null);
      }
    };

    loadLiveStream();
    const refreshTimer = setInterval(loadLiveStream, 15000);
    return () => clearInterval(refreshTimer);
  }, []);

  useEffect(() => {
    if (!liveStream || !heroRef.current) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setIsMiniPlayer(!entry.isIntersecting),
      { threshold: 0.15 }
    );
    observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, [liveStream]);

  useEffect(() => {
    const liveUrl = liveStream
      ? toEmbedUrl(liveStream.youtube_url || liveStream.youtubeUrl || liveStream.embedUrl)
      : "";
    if (liveUrl) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [liveStream]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const liveEmbedSource = liveStream
    ? toEmbedUrl(liveStream.youtube_url || liveStream.youtubeUrl || liveStream.embedUrl)
    : "";

  if (liveStream && liveEmbedSource) {
    const liveEmbedUrl = new URL(liveEmbedSource);
    liveEmbedUrl.searchParams.set("autoplay", "1");
    liveEmbedUrl.searchParams.set("mute", soundEnabled ? "0" : "1");
    liveEmbedUrl.searchParams.set("controls", "1");
    liveEmbedUrl.searchParams.set("playsinline", "1");
    liveEmbedUrl.searchParams.set("rel", "0");

    return (
      <div ref={heroRef} className="hero-slider hero-live-mode">
        <div className={`hero-live-video-wrap ${isMiniPlayer ? "is-mini" : ""}`}>
          <iframe
            className="hero-live-video"
            src={liveEmbedUrl.toString()}
            title={liveStream.title || "Live sermon"}
            allow="autoplay; encrypted-media; picture-in-picture; web-share"
            allowFullScreen
          />
          <div className="hero-live-controls" aria-label="Live video controls">
            <button
              type="button"
              className="hero-live-sound"
              onClick={() => setSoundEnabled((enabled) => !enabled)}
            >
              {soundEnabled ? "Mute" : "Enable sound"}
            </button>
            {isMiniPlayer && <span className="hero-live-mini-label">Live now</span>}
          </div>
        </div>

        <div className="hero-overlay"></div>

        <div className="hero-content hero-live-content">
          <div className="hero-text hero-live-text">
            <span className="hero-live-tag">Live</span>
            <h1 className="hero-title">{liveStream.title || "Live Worship Service"}</h1>
            <p className="hero-subtitle">{liveStream.speaker || "Kebena Church"}</p>
            <div className="hero-buttons">
              <a
                href="https://t.me/+c0aL2WBX7L5iNWI0"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="btn-hero-primary">Join Us</button>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="hero-slider">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`hero-slide ${index === currentSlide ? "active" : ""}`}
        >
          <img
            src={slide.image}
            alt={slide.title[language]}
            className="hero-image"
          />
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">{slide.title[language]}</h1>
              <p className="hero-subtitle">{slide.subtitle[language]}</p>
              <div className="hero-buttons">
                <a
                  href="https://t.me/+c0aL2WBX7L5iNWI0"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {" "}
                  <button className="btn-hero-primary">
                    {slide.btnPrimary[language]}
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={prevSlide}
        className="hero-nav-btn hero-prev"
        aria-label="Previous slide"
      >
        ‹
      </button>
      <button
        onClick={nextSlide}
        className="hero-nav-btn hero-next"
        aria-label="Next slide"
      >
        ›
      </button>

      <div className="hero-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`hero-dot ${index === currentSlide ? "active" : ""}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      <div className="scroll-indicator">
        <div className="scroll-arrow">↓</div>
        <span>Scroll to explore</span>
      </div>
    </div>
  );
};

export default HeroSlider;
