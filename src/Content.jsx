import { useContext } from "react";
import { AppContext } from "./contexts/AppContext";
import ContentBox from "./ContentBox";

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

  if (currentCity) {
    if (currentData?.data?.cod === 200) {
      return <ContentBox />;
    } else if (currentData && dataFromCoordinatesAPI?.city?.name) {
      return <DidYouMean />;
    } else return <Empty />;
  } else return <Empty />;
};

export default Content;
