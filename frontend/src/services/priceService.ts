interface WeatherData {
  temp: number;
  rain: number;
  humidity: number;
  wind: number;
}

interface PricePredictionRequest {
  time: string;
  distance: number;
  temperature: number;
  rain_amount: number;
  wind_speed: number;
  humidity: number;
}

interface PricePredictionResponse {
  predicted_price: number;
}

export const predictPrice = async (
  distance: number,
  sourceWeather: WeatherData,
  destWeather: WeatherData
) => {
  try {
    // Get current time in HH:mm:ss format
    const currentTime = new Date().toTimeString().split(' ')[0];
    
    // Average the weather conditions between source and destination
    const avgTemp = (sourceWeather.temp + destWeather.temp) / 2;
    const avgRain = (sourceWeather.rain + destWeather.rain) / 2;
    const avgWind = (sourceWeather.wind + destWeather.wind) / 2;
    const avgHumidity = (sourceWeather.humidity + destWeather.humidity) / 2;

    const requestData: PricePredictionRequest = {
      time: currentTime,
      distance,
      temperature: avgTemp,
      rain_amount: avgRain,
      wind_speed: avgWind,
      humidity: avgHumidity,
    };

    const response = await fetch("http://localhost:8000/api/v1/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error("Failed to predict price");
    }

    const data: PricePredictionResponse = await response.json();
    return data.predicted_price;
  } catch (error) {
    console.error("Error predicting price:", error);
    throw error;
  }
};
