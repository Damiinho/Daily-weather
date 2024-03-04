import { useContext } from "react";
import { AppContext } from "./contexts/AppContext";
import { Button } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandMore from "./ExpandMore";
import ArrowIMG from "./img/windarrow.png";

const ContentBox = () => {
  const { currentCity, currentData, activeExpandMore, setActiveExpandMore } =
    useContext(AppContext);

  const sunrise = new Date(currentData.data.sys.sunrise * 1000);
  const sunset = new Date(currentData.data.sys.sunset * 1000);
  const sunriseLocal = `${sunrise.getHours()}:${
    sunrise.getMinutes() < 10
      ? `0${sunrise.getMinutes()}`
      : sunrise.getMinutes()
  }`;
  const sunsetLocal = `${sunset.getHours()}:${
    sunset.getMinutes() < 10 ? `0${sunset.getMinutes()}` : sunset.getMinutes()
  }`;

  return activeExpandMore ? (
    <div className="content">
      <ExpandMore />
    </div>
  ) : (
    <div className="content">
      <div className="content-title">
        <div className="content-title__city">
          {currentCity?.foundCity?.name}
        </div>
        <div className="content-title__state">
          {currentCity?.foundCity?.state} ({currentCity?.foundCity?.country})
        </div>{" "}
      </div>
      <div className="content-data">
        <div className="content-data__temp">
          <div className="content-data__temp__description">temp</div>
          <div className="content-data__temp__info">
            {currentData.data.main.temp}°C
          </div>
        </div>
        <div className="content-data__icon">
          <img
            src={`https://openweathermap.org/img/wn/${currentData.data.weather[0].icon}@2x.png`}
            alt="weather"
          ></img>
          <div className="content-data__icon-description">
            {currentData.data.weather[0].main}
          </div>
        </div>
      </div>
      <div className="content-details">
        <div className="content-details__item">
          <div className="content-details__item-title">Real feel</div>
          <div className="content-details__item-info">
            {currentData?.data?.main?.feels_like}°C
          </div>
        </div>
        <div className="content-details__item">
          <div className="content-details__item-title">humidity</div>
          <div className="content-details__item-info">
            {currentData?.data?.main?.humidity}%
          </div>
        </div>
        <div className="content-details__item">
          <div className="content-details__item-title">pressure</div>
          <div className="content-details__item-info">
            {currentData?.data?.main?.pressure}hPa
          </div>
        </div>
        <div className="content-details__item">
          <div className="content-details__item-title">wind</div>
          <div className="content-details__item-info">
            <img
              style={{ transform: `rotate(${currentData?.data?.wind.deg}deg)` }}
              src={ArrowIMG}
              alt="arrow"
            />
            {currentData?.data?.wind?.speed}m/s
          </div>
        </div>
        <div className="content-details__item">
          <div className="content-details__item-title">clouds</div>
          <div className="content-details__item-info">
            {currentData?.data?.clouds?.all}%
          </div>
        </div>
        <div className="content-details__item">
          <div className="content-details__item-title">sunrise</div>
          <div className="content-details__item-info">{sunriseLocal}</div>
        </div>
        <div className="content-details__item">
          <div className="content-details__item-title">sunset</div>
          <div className="content-details__item-info">{sunsetLocal}</div>
        </div>
      </div>
      <div className="content-more">
        <Button
          onClick={() => setActiveExpandMore(true)}
          size="large"
          style={{ color: "#6c6b93" }}
        >
          Expand more (24h) <ExpandMoreIcon />
        </Button>
      </div>
    </div>
  );
};

export default ContentBox;
