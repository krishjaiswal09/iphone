import React, { useState, useEffect } from "react";
import mockup from "../assets/apple-iphone-x-medium.png";
import wallpaper from "../assets/wallpaper.jpg";

const features = [
  {
    id: 1,
    title: "Feature No. 1",
    heading: "TEXT HEADING DISPLAY",
    description: [
      "Lorem ipsum dolor: sit amet consectetur adipiscing elit, sed do eiusmod.",
      "Ut enim minim: veniam quis nostrud exercitation ullamco laboris nisi ut aliquip.",
      "Sed ut perspiciatis: unde omnis iste natus error sit voluptatem accusantium doloremque.",
      "Excepteur sint occaecat: cupidatat non proident sunt in culpa qui officia deserunt mollit.",
    ],
  },
  {
    id: 2,
    title: "Feature No. 2",
    heading: "SECOND FEATURE",
    description: [
      "Lorem ipsum dolor: sit amet consectetur adipiscing elit, sed do eiusmod.",
      "Ut enim minim: veniam quis nostrud exercitation ullamco laboris nisi ut aliquip.",
      "Sed ut perspiciatis: unde omnis iste natus error sit voluptatem accusantium doloremque.",
      "Excepteur sint occaecat: cupidatat non proident sunt in culpa qui officia deserunt mollit.",
    ],
  },
  {
    id: 3,
    title: "Feature No. 3",
    heading: "THIRD FEATURE",
    description: [
      "Lorem ipsum dolor: sit amet consectetur adipiscing elit, sed do eiusmod.",
      "Ut enim minim: veniam quis nostrud exercitation ullamco laboris nisi ut aliquip.",
      "Sed ut perspiciatis: unde omnis iste natus error sit voluptatem accusantium doloremque.",
      "Excepteur sint occaecat: cupidatat non proident sunt in culpa qui officia deserunt mollit.",
    ],
  },
  {
    id: 4,
    title: "Feature No. 4",
    heading: "FOURTH FEATURE",
    description: [
      "Lorem ipsum dolor: sit amet consectetur adipiscing elit, sed do eiusmod.",
      "Ut enim minim: veniam quis nostrud exercitation ullamco laboris nisi ut aliquip.",
      "Sed ut perspiciatis: unde omnis iste natus error sit voluptatem accusantium doloremque.",
      "Excepteur sint occaecat: cupidatat non proident sunt in culpa qui officia deserunt mollit.",
    ],
  },
  {
    id: 5,
    title: "Feature No. 5",
    heading: "FIFTH FEATURE",
    description: [
      "Lorem ipsum dolor: sit amet consectetur adipiscing elit, sed do eiusmod.",
      "Ut enim minim: veniam quis nostrud exercitation ullamco laboris nisi ut aliquip.",
      "Sed ut perspiciatis: unde omnis iste natus error sit voluptatem accusantium doloremque.",
      "Excepteur sint occaecat: cupidatat non proident sunt in culpa qui officia deserunt mollit.",
    ],
  },
];

// Shared styles
const blueIndicator = "h-9 w-0.5 bg-blue-600 rounded";
const navButton =
  "text-black text-2xl font-bold hover:text-blue-600 transition-colors";
const phoneContainer = "relative w-[420px] aspect-[9/19.5]";
const phoneScreen =
  "absolute inset-[6%] rounded-[30px] bg-cover bg-center z-10 flex flex-col justify-center items-center text-center text-white transition-all duration-500";

function FeatureContent({ feature }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(false);
    const timer = setTimeout(() => setShow(true), 50);
    return () => clearTimeout(timer);
  }, [feature.id]);

  return (
    <div
      className={`transform transition-all duration-700 ease-in-out ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <h3 className="text-blue-600 font-semibold">{feature.title} -</h3>
      <h2 className="text-2xl font-bold mt-2">{feature.heading}</h2>
      <ul className="mt-4 text-gray-600 space-y-2 max-w-md list-disc ml-5">
        {feature.description.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function UI() {
  const [activeFeature, setActiveFeature] = useState(1);
  const [isScrolling, setIsScrolling] = useState(false);

  const changeFeature = (direction) => {
    setActiveFeature((prev) =>
      direction === "next"
        ? prev === features.length
          ? 1
          : prev + 1
        : prev === 1
        ? features.length
        : prev - 1
    );
  };

  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();

      if (isScrolling) return;

      setIsScrolling(true);
      changeFeature(e.deltaY > 0 ? "next" : "prev");

      setTimeout(() => setIsScrolling(false), 800);
    };

    document.addEventListener("wheel", handleWheel, { passive: false });
    return () => document.removeEventListener("wheel", handleWheel);
  }, [isScrolling]);

  const currentFeature = features[activeFeature - 1];

  return (
    <div className="flex justify-between items-center min-h-screen px-24 gap-20">
      {/* LEFT SECTION */}
      <section className="w-[37.5%] flex flex-col justify-center text-md">
        <FeatureContent feature={currentFeature} key={currentFeature.id} />

        {/* Navigation Controls */}
        <nav className="flex items-center gap-6 mt-10">
          <button
            onClick={() => changeFeature("prev")}
            className={navButton}
            aria-label="Previous feature"
          >
            ←
          </button>
          <div className={blueIndicator} />
          <button
            onClick={() => changeFeature("next")}
            className={navButton}
            aria-label="Next feature"
          >
            →
          </button>
        </nav>
      </section>

      {/* CENTER PHONE MOCKUP */}
      <section className={phoneContainer}>
        <div
          className={phoneScreen}
          style={{ backgroundImage: `url(${wallpaper})` }}
        >
          <h1 className="text-2xl font-bold drop-shadow-md">
            {currentFeature.heading}
          </h1>
        </div>
        <img
          className="absolute inset-0 w-full h-full object-contain z-20 pointer-events-none"
          src={mockup}
          alt="iPhone X mockup"
        />
      </section>

      {/* RIGHT FEATURE LIST */}
      <aside className="w-[37.5%] flex flex-col justify-center transform -translate-y-14 translate-x-20">
        <h2 className="text-lg font-bold mb-6">Feature Showcase</h2>
        <ul className="space-y-6 ml-5">
          {features.map((feature) => {
            const isActive = activeFeature === feature.id;
            return (
              <li
                key={feature.id}
                onClick={() => setActiveFeature(feature.id)}
                className="flex items-center cursor-pointer select-none group ml-5"
              >
                {/* Active Indicator */}
                <div className="w-3 flex -ml-5 -translate-x-5">
                  {isActive && <span className={blueIndicator} />}
                </div>

                {/* Feature Text */}
                <span
                  className={`transition-colors group-hover:text-gray-600 ${
                    isActive ? "text-gray-600 font-semibold" : "text-gray-500"
                  }`}
                >
                  Feature {feature.id} : {feature.heading}
                </span>
              </li>
            );
          })}
        </ul>
      </aside>
    </div>
  );
}

export default UI;
