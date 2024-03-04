import { Button } from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useContext } from "react";
import { AppContext } from "./contexts/AppContext";
import ArrowIMG from "./img/windarrow.png";

const ExpandMore = () => {
  const { setActiveExpandMore, dataFromCoordinatesAPI, windowWidth } =
    useContext(AppContext);
  return (
    <>
      <div className="content-byhours">
        {dataFromCoordinatesAPI.list.slice(0, 9).map((item) => {
          const time = new Date(item.dt * 1000);

          const daysOfWeek =
            windowWidth < 700
              ? ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
              : [
                  "Sunday",
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                ];
          const dayName = daysOfWeek[time.getDay()];
          const monthName =
            windowWidth < 700
              ? time.toLocaleString("en-us", { month: "short" })
              : time.toLocaleString("en-us", { month: "long" });
          const dayOfMonth = time.getDate();
          let hours = time.getHours();
          const minutes = time.getMinutes();
          const ampm = hours >= 12 ? "PM" : "AM";
          hours = hours % 12;
          hours = hours ? hours : 12;
          const hour = `${hours}:${minutes < 10 ? "0" + minutes : minutes}`;
          return (
            <div key={item.dt} className="content-byhours__item">
              <div className="content-byhours__item-daybox">
                <div className="day">
                  <div className="name">{dayName}</div>
                  <div className="month">
                    <span>{monthName}</span>
                    <span>{dayOfMonth}</span>
                  </div>
                </div>
                <div className="hours">
                  <div className="hour">{hour}</div>
                  <div className="ampm">{ampm}</div>
                </div>
              </div>
              <div className="content-byhours__item-weather">
                <img
                  src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                  alt="weather"
                />
              </div>
              <div className="content-byhours__item-temp">
                <div>
                  <span>{windowWidth > 499 && "temp"}</span>
                  <span>{item.main.temp.toFixed(1)}°C</span>
                </div>
                <div>
                  <span> {windowWidth > 499 && "real feel"}</span>
                  <span>{item.main.feels_like.toFixed(1)}°C</span>
                </div>
              </div>
              <div className="content-byhours__item-windbox">
                <div>
                  {windowWidth > 599 && <div>wind</div>}
                  <div>
                    {item.wind.speed}
                    <span>m/s</span>
                  </div>
                </div>
                <div>
                  {windowWidth > 599 && <div>pressure</div>}
                  <div>
                    {item.main.pressure}
                    <span>hPa</span>
                  </div>
                </div>
              </div>
              <div className="content-byhours__item-windarrow">
                <img
                  style={{ transform: `rotate(${item.wind.deg}deg)` }}
                  src={ArrowIMG}
                  alt="arrow"
                />
              </div>
              {windowWidth > 420 && (
                <div className="content-byhours__item-other">
                  <div>
                    <div>humidity</div>
                    <div>
                      {item.main.humidity}
                      <span>%</span>
                    </div>
                  </div>
                  <div>
                    <div>clouds</div>
                    <div>
                      {item.clouds.all}
                      <span>%</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="content-more">
        <Button
          onClick={() => setActiveExpandMore(false)}
          size="large"
          style={{ color: "#6c6b93" }}
        >
          Less info <ExpandLessIcon />
        </Button>
      </div>
    </>
  );
};

export default ExpandMore;
