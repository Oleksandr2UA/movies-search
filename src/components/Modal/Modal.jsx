import { Loader } from "../Loader/Loader";
import { useState, useEffect } from "react";
import { Range } from "react-range";
import Switch from "react-switch";
import "../Modal/Modal.css";

const localStorageKeys = {
  opacity: "bg-opacity",
  theme: "isNight-theme",
};
const initOpacity = 0.6;
const initTheme = false;

// READ LOCAL STORAGE
function readLocalStorageOpacity() {
  const savedOpacity = localStorage.getItem(localStorageKeys.opacity);
  if (savedOpacity !== null) return [JSON.parse(savedOpacity)];
  return [initOpacity];
}
function readLocalStorageTheme() {
  const savedTheme = localStorage.getItem(localStorageKeys.theme);
  if (savedTheme !== null) return JSON.parse(savedTheme);
  return initTheme;
}

// Modal component
export const Modal = ({ closeModal, src }) => {
  const [values, setValues] = useState(() => readLocalStorageOpacity());
  const [isNight, setIsNight] = useState(() => readLocalStorageTheme());
  const [isLoading, setIsLoading] = useState(true);

  // WHEN MODAL IS OPENED
  useEffect(() => {
    // Forbid scrolling when the modal is open
    document.body.classList.add("no-scroll");

    const onCloseModalByEsc = (event) => {
      if (event.code === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", onCloseModalByEsc);

    return () => {
      // Enable scroll when the modal is closed
      document.body.classList.remove("no-scroll");
      window.removeEventListener("keydown", onCloseModalByEsc);
    };
  }, [closeModal]);

  const onCloseModal = () => {
    closeModal();
  };
  const onLoadingPlayer = () => {
    console.log("Loaded");
    setIsLoading(false);
  };
  function onOpacityChange(values) {
    console.log(values);
    setValues(values);
  }

  useEffect(() => {
    localStorage.setItem(localStorageKeys.opacity, JSON.stringify(values[0]));
  }, [values]);
  useEffect(() => {
    localStorage.setItem(localStorageKeys.theme, JSON.stringify(isNight));
  }, [isNight]);

  // STYLES DEPENDING ON THEME
  const backgroundColor = isNight ? "black" : "white";
  const textColor = isNight ? "rgba(255, 255, 250, 0.4)" : "black";
  const rangeCircleColor = isNight ? "rgba(255, 255, 250, 0.7)" : "black";

  // Formula to invert value
  const invertValue = (value, inputMin, inputMax, outputMin, outputMax) => {
    return (
      outputMin +
      ((inputMax - value) * (outputMax - outputMin)) / (inputMax - inputMin)
    );
  };
  const rangeBgColor = isNight
    ? `rgba(162, 162, 162, ${invertValue(values[0], 0.3, 1, 0.3, 0.7)})`
    : `rgba(0, 0, 0, ${values[0]})`;

  return (
    <>
      <div
        className="overlay"
        onClick={onCloseModal}
        style={{ backgroundColor: `rgba(0, 0, 0, ${values[0]})` }}
      />
      <div className="modalWindow" style={{ backgroundColor }}>
        <div style={{ visibility: isLoading ? "visible" : "hidden" }}>
          <Loader isNight={isNight} height="50" width="50" />
        </div>

        <iframe
          width="860"
          height="415"
          onLoad={onLoadingPlayer}
          src={src}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <div className="settings" style={{ color: textColor }}>
          {/* Opacity Control */}
          <Range
            step={0.009}
            min={0.3}
            max={1}
            values={values}
            onChange={onOpacityChange}
            renderTrack={({ props, children }) => (
              <div
                {...props}
                style={{
                  ...props.style,
                  height: "6px",
                  width: "150px",
                  backgroundColor: rangeBgColor,
                }}
              >
                {children}
              </div>
            )}
            renderThumb={({ props }) => (
              <div
                {...props}
                style={{
                  ...props.style,
                  height: "20px",
                  width: "20px",
                  backgroundColor: rangeCircleColor,
                }}
              />
            )}
          />
          <label htmlFor="volume" className="settings-range-label">
            Make background darker
          </label>

          {/* Day/Night Switch Control */}
          <span>Switch theme</span>
          <Switch
            onChange={setIsNight}
            checked={isNight}
            onColor="#0e1112"
            offColor="#ffcc33"
            checkedIcon={
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  fontSize: 18,
                  color: "white",
                  paddingRight: 2,
                }}
              >
                🌙
              </div>
            }
            uncheckedIcon={
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  fontSize: 18,
                  color: "white",
                  paddingRight: 2,
                }}
              >
                ☀️
              </div>
            }
            handleDiameter={28}
            height={40}
            width={70}
          />
        </div>
      </div>
    </>
  );
};
