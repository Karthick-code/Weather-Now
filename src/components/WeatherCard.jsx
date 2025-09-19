// import React from "react";
// import { Card, CardContent, Typography } from "@mui/material";

// const WeatherCard = ({ weather }) => {
//   if (!weather) return null;

//   return (
//     <Card
//       sx={{
//         marginTop: 3,
//         borderRadius: 4,
//         boxShadow: 4,
//         background: "linear-gradient(135deg, #74ebd5 0%, #ACB6E5 100%)",
//         color: "white",
//         textAlign: "center",
//       }}
//     >
//       <CardContent>
//         {/* City + Country */}
//         <Typography variant="h5" gutterBottom>
//           {weather.name}, {weather.sys.country}
//         </Typography>

//         {/* Weather icon */}
//         <img
//           src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
//           alt={weather.weather[0].description}
//           style={{ width: 100 }}
//         />

//         {/* Main temperature */}
//         <Typography variant="h2" fontWeight="bold">
//           {Math.round(weather.main.temp)}°C
//         </Typography>

//         {/* Weather description */}
//         <Typography variant="h6" sx={{ textTransform: "capitalize" }}>
//           {weather.weather[0].description}
//         </Typography>

//         {/* Extra info */}
//         <div
//           style={{
//             marginTop: 20,
//             display: "flex",
//             justifyContent: "space-around",
//           }}
//         >
//           <div>
//             <Typography variant="body1">💧 Humidity</Typography>
//             <Typography variant="h6">{weather.main.humidity}%</Typography>
//           </div>
//           <div>
//             <Typography variant="body1">🌬 Wind</Typography>
//             <Typography variant="h6">{weather.wind.speed} m/s</Typography>
//           </div>
//           <div>
//             <Typography variant="body1">🌡 Feels Like</Typography>
//             <Typography variant="h6">
//               {Math.round(weather.main.feels_like)}°C
//             </Typography>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default WeatherCard;

import React from "react";
import { Card, CardContent, Typography, Grid, Box } from "@mui/material";

// helper: pick background gradient based on temp
const getBackground = (temp, isNight) => {
  if (isNight) {
    return "linear-gradient(135deg, #0f2027, #203a43, #2c5364)";
  } else if (temp > 30) {
    return "linear-gradient(135deg, #f7971e, #ffd200)";
  } else if (temp < 10) {
    return "linear-gradient(135deg, #74ebd5, #ACB6E5)";
  }
  return "linear-gradient(135deg, #89f7fe, #66a6ff)";
};

const WeatherCard = ({ weather }) => {
  if (!weather) return null;

  const temp = Math.round(weather.main.temp);
  const isNight = weather.weather[0].icon.includes("n");

  return (
    <Card
      sx={{
        marginTop: 3,
        borderRadius: 5,
        boxShadow: 6,
        background: getBackground(temp, isNight),
        color: "white",
        textAlign: "center",
        backdropFilter: "blur(10px)",
      }}
    >
      <CardContent>
        {/* City + Country */}
        <Typography variant="h5" gutterBottom>
          {weather.name}, {weather.sys.country}
        </Typography>

        {/* Weather icon */}
        <Box sx={{ animation: "fadeIn 1s ease-in-out" }}>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
            style={{ width: 120 }}
          />
        </Box>

        {/* Temperature */}
        <Typography
          variant="h2"
          fontWeight="bold"
          sx={{
            textShadow: "2px 2px 8px rgba(0,0,0,0.4)",
            animation: "scaleUp 0.8s ease-in-out",
          }}
        >
          {temp}°C
        </Typography>

        {/* Weather description */}
        <Typography
          variant="h6"
          sx={{ textTransform: "capitalize", opacity: 0.9 }}
        >
          {weather.weather[0].description}
        </Typography>

        {/* Extra info in mini cards */}
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={4}>
            <Box
              sx={{
                p: 2,
                borderRadius: 3,
                background: "rgba(255,255,255,0.2)",
                backdropFilter: "blur(6px)",
              }}
            >
              <Typography variant="body2">💧 Humidity</Typography>
              <Typography variant="h6">{weather.main.humidity}%</Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box
              sx={{
                p: 2,
                borderRadius: 3,
                background: "rgba(255,255,255,0.2)",
                backdropFilter: "blur(6px)",
              }}
            >
              <Typography variant="body2">🌬 Wind</Typography>
              <Typography variant="h6">{weather.wind.speed} m/s</Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box
              sx={{
                p: 2,
                borderRadius: 3,
                background: "rgba(255,255,255,0.2)",
                backdropFilter: "blur(6px)",
              }}
            >
              <Typography variant="body2">🌡 Feels Like</Typography>
              <Typography variant="h6">
                {Math.round(weather.main.feels_like)}°C
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>

      {/* Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes scaleUp {
            from { transform: scale(0.8); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }
        `}
      </style>
    </Card>
  );
};

export default WeatherCard;
