import { Button, TextField } from "@mui/material";
import SubdirectoryArrowLeftIcon from "@mui/icons-material/SubdirectoryArrowLeft";
import { useContext } from "react";
import { AppContext } from "./contexts/AppContext";

const Search = () => {
  const {
    currentInput,
    setCurrentData,
    setCurrentInput,
    setCurrentCity,
    setDataFromCoordinatesAPI,
  } = useContext(AppContext);

  const APIKey = "c856aa7be41ac7238f8c2b7f7f39306e";
  const handleEnter = () => {
    if (currentInput.length > 0) {
      const API = `https://api.openweathermap.org/data/2.5/weather?q=${currentInput}&APPID=${APIKey}&units=metric`;
      fetch(API)
        .then((response) => response.json())
        .then((data) => {
          setCurrentData({ data: data, confirmedCity: currentInput });
          setCurrentInput("");
        });
      const APIforCoordinates = `
      https://api.openweathermap.org/geo/1.0/direct?q=${currentInput}&appid=${APIKey}`;

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
          } else {
            setCurrentCity({ lat: null, lon: null });
            setDataFromCoordinatesAPI(null);
          }
        });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleEnter();
    }
  };

  const handleChangeInput = (e) => {
    setCurrentInput(e.target.value);
  };

  return (
    <div className="search">
      <TextField
        onChange={(e) => handleChangeInput(e)}
        onKeyDown={handleKeyDown}
        value={currentInput}
        label="City"
        InputLabelProps={{ style: { color: "rgba(255, 255, 255, 0.47)" } }}
        inputProps={{ style: { color: "rgba(255, 255, 255, 0.47)" } }}
        color="secondary"
        variant="filled"
        sx={{
          "& .MuiInputBase-input": {
            backgroundColor: "#333333", // Kolor tła w polu tekstowym
          },
        }}
      />
      <Button
        size="small"
        variant=""
        color="secondary"
        onClick={handleEnter}
        style={{
          color: "#6c6b81",
        }}
      >
        <SubdirectoryArrowLeftIcon fontSize="large" />
      </Button>
    </div>
  );
};

export default Search;
