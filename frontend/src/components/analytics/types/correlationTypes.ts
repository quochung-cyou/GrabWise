export interface WeatherCorrelationResponse {
    status: string;
    data: {
      temperature_vs_rain_amount: CorrelationData;
      temperature_vs_humidity: CorrelationData;
      temperature_vs_wind_speed: CorrelationData;
      rain_amount_vs_humidity: CorrelationData;
      rain_amount_vs_wind_speed: CorrelationData;
      humidity_vs_wind_speed: CorrelationData;
    };
    message: string;
  }
  
  export interface CorrelationData {
    correlation: number;
    interpretation: string;
  }
  
  export interface WeatherCorrelationData {
    id: string;
    source: string;
    target: string;
    correlation: number;
    interpretation: string;
  }