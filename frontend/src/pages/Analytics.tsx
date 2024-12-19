import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HourlyPriceChart } from '@/components/analytics/HourlyPriceChart';
import { WeatherPriceChart } from '@/components/analytics/WeatherPriceChart';
import { FeatureImportanceChart } from '@/components/analytics/FeatureImportanceChart';
import WeatherCorrelationChart from '@/components/analytics/WeatherCorrelationChart';
import { PeakHoursAnalysis } from '@/components/analytics/PeakHoursAnalysis';
import { ModelMetrics } from '@/components/analytics/ModelMetrics';
import { useToast } from '@/hooks/use-toast';
interface ModelMetricsResponse {
  train_r2: number;
  val_r2: number;
  train_rmse: number;
  val_rmse: number;
  feature_importance: Record<string, number>;
  temp_correlation: number;
  rain_correlation: number;
  humidity_correlation: number;
  wind_correlation: number;
  price_by_weather: Record<string, {
    mean: number;
    min: number;
    max: number;
  }>;
  price_by_hour: Record<string, number>;
  hourly_analysis: Record<string, {
    price_factor: number;
    is_peak: string;
  }>;
  peak_summary: {
    morning_peak: {
      hours: string;
      avg_price_factor: number;
    };
    evening_peak: {
      hours: string;
      avg_price_factor: number;
    };
    late_night: {
      hours: string;
      avg_price_factor: number;
    };
  };
}

const Analytics = () => {
  const [data, setData] = useState<ModelMetricsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/model/metrics');
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching model metrics:', error);
        toast({
          title: "Error",
          description: "Unable to load analytics data. Please try again later.",
          variant: "destructive",
        });
        setIsLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  if (isLoading) return (
    <div className="min-h-screen">
      <Header />
      <div className="container mx-auto p-4">
        <div className="text-center py-20">Loading analytics data...</div>
      </div>
      <Footer />
    </div>
  );

  if (!data) return (
    <div className="min-h-screen">
      <Header />
      <div className="container mx-auto p-4">
        <div className="text-center py-20 text-red-500">
          Unable to load analytics data. Please try again later.
        </div>
      </div>
      <Footer />
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto p-4 space-y-6">
        <h1 className="text-3xl font-bold text-center mb-8">Fare Data Analysis</h1>

        <ModelMetrics 
          trainR2={data.train_r2}
          valR2={data.val_r2}
          trainRMSE={data.train_rmse}
          valRMSE={data.val_rmse}
        />

        <PeakHoursAnalysis data={data.peak_summary} />

        <Tabs defaultValue="hourly" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="hourly">Hourly Price</TabsTrigger>
            <TabsTrigger value="weather">Weather Impact</TabsTrigger>
            <TabsTrigger value="features">Influencing Factors</TabsTrigger>
            <TabsTrigger value="correlation">Correlation</TabsTrigger>
          </TabsList>

          <TabsContent value="hourly">
            <HourlyPriceChart 
              data={data.price_by_hour}
              hourlyAnalysis={data.hourly_analysis}
            />
          </TabsContent>

          <TabsContent value="weather">
            <WeatherPriceChart data={data} />
          </TabsContent>

          <TabsContent value="features">
            <FeatureImportanceChart data={data.feature_importance} />
          </TabsContent>

          <TabsContent value="correlation">
            <WeatherCorrelationChart 
              tempCorrelation={data.temp_correlation}
              rainCorrelation={data.rain_correlation}
              humidityCorrelation={data.humidity_correlation}
              windCorrelation={data.wind_correlation}
            />
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default Analytics;