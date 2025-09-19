

// import React, { useState } from "react";
// import axios from "axios";
// import {
//   Container,
//   TextField,
//   Button,
//   CircularProgress,
//   Typography,
// } from "@mui/material";
// import WeatherCard from "./components/WeatherCard";

// const App = () => {
//   const [city, setCity] = useState("");
//   const [weather, setWeather] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

//   const fetchWeather = async () => {
//     if (!city) return;
//     setLoading(true);
//     setError("");
//     try {
//       const res = await axios.get(
//         `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
//       );
//       setWeather(res.data);
//     } catch (err) {
//       setError("City not found. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Container maxWidth="sm" sx={{ mt: 5 }}>
//       <Typography variant="h4" gutterBottom>
//         🌦 Weather App
//       </Typography>

//       <TextField
//         label="Enter City"
//         variant="outlined"
//         fullWidth
//         value={city}
//         onChange={(e) => setCity(e.target.value)}
//         sx={{ mb: 2 }}
//       />
//       <Button variant="contained" fullWidth onClick={fetchWeather}>
//         Search
//       </Button>

//       {loading && <CircularProgress sx={{ mt: 3 }} />}
//       {error && (
//         <Typography color="error" sx={{ mt: 2 }}>
//           {error}
//         </Typography>
//       )}

//       {/* WeatherCard Component */}
//       {weather && <WeatherCard weather={weather} />}
//     </Container>
//   );
// };

// export default App;

import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  CircularProgress,
  Typography,
  CssBaseline,
  IconButton,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import WeatherCard from "./components/WeatherCard";

const App = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mode, setMode] = useState("light"); // light or dark

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const theme = createTheme({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            background: { default: "#f0f4f8" },
          }
        : {
            background: { default: "#121212" },
          }),
    },
    typography: {
      fontFamily: "Poppins, Arial, sans-serif",
    },
  });

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(res.data);
    } catch (err) {
      setError("City not found. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ mt: 5, textAlign: "center" }}>
        {/* Header with theme toggle */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h4" gutterBottom>
            🌦 Weather App
          </Typography>
          <IconButton onClick={() => setMode(mode === "light" ? "dark" : "light")} color="inherit">
            {mode === "light" ? <Brightness4 /> : <Brightness7 />}
          </IconButton>
        </div>

        {/* Input + Button */}
        <TextField
          label="Enter City"
          variant="outlined"
          fullWidth
          value={city}
          onChange={(e) => setCity(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" fullWidth onClick={fetchWeather}>
          Search
        </Button>

        {/* Loading + Error */}
        {loading && <CircularProgress sx={{ mt: 3 }} />}
        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}

        {/* WeatherCard */}
        {weather && <WeatherCard weather={weather} />}
      </Container>
    </ThemeProvider>
  );
};

export default App;
