import { useContext } from "react";
import { AppContext } from "./contexts/AppContext";

const Content = () => {
  const {
    currentCity,
    currentData,
    setCurrentData,
    setCurrentInput,
    setCurrentCity,
    setDataFromCoordinatesAPI,
    dataFromCoordinatesAPI,
  } = useContext(AppContext);

  const APIKey = "c856aa7be41ac7238f8c2b7f7f39306e";

  const handleDidYouMean = () => {
    const API = `https://api.openweathermap.org/data/2.5/weather?q=${dataFromCoordinatesAPI.city.name}&APPID=${APIKey}&units=metric`;
    fetch(API)
      .then((response) => response.json())
      .then((data) => {
        setCurrentData({
          data: data,
          confirmedCity: currentCity.foundCity.name,
        });
        setCurrentInput("");
      });
    const APIforCoordinates = `
      https://api.openweathermap.org/geo/1.0/direct?q=${dataFromCoordinatesAPI.city.name}&appid=${APIKey}`;
    fetch(APIforCoordinates)
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          setCurrentCity({
            lat: data[0].lat,
            lon: data[0].lon,
            foundCity: data[0],
          });
          if (data[0].lat) {
            const API = `https://api.openweathermap.org/data/2.5/forecast?lat=${data[0].lat}&lon=${data[0].lon}&appid=${APIKey}&units=metric`;
            fetch(API)
              .then((response) => response.json())
              .then((data) => {
                setDataFromCoordinatesAPI(data);
              });
          }
        } else setCurrentCity({ lat: null, lon: null });
      });
  };

  const DidYouMean = () => {
    return (
      <div className="content">
        <div className="content-didyoumean">
          Did you mean{" "}
          <span onClick={handleDidYouMean}>
            {dataFromCoordinatesAPI?.city?.name}
          </span>
          ?
        </div>
      </div>
    );
  };
  const Empty = () => {
    return (
      <div className="content">
        <div className="content-empty">Search your city...</div>
      </div>
    );
  };

  const ContentBox = () => {
    if (currentCity) {
      if (currentData?.data?.cod === 200) {
        return (
          <div className="content">
            <div className="content-title">
              <div className="content-title__city">
                {currentCity?.foundCity?.name}
              </div>
              <div className="content-title__state">
                {currentCity?.foundCity?.state} (
                {currentCity?.foundCity?.country})
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
          </div>
        );
      } else if (currentData && dataFromCoordinatesAPI?.city?.name) {
        return <DidYouMean />;
      } else return <Empty />;
    } else return <Empty />;
  };

  return <ContentBox />;
};

export default Content;
