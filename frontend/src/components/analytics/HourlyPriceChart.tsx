import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
interface HourlyData {
  hour: string;
  price: number;
  price_factor: number;
}
interface Props {
  data: Record<string, number>;
  hourlyAnalysis: Record<string, {
    price_factor: number;
    is_peak: string;
  }>;
}
export const HourlyPriceChart = ({ data, hourlyAnalysis }: Props) => {
  const chartData: HourlyData[] = Object.entries(data).map(([hour, price]) => ({
    hour: `${hour}:00`,
    price: Math.round(price),
    price_factor: hourlyAnalysis[hour]?.price_factor || 1,
  }));
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hourly Price Fluctuation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="price" 
                stroke="#8B5CF6" 
                name="Price (VNĐ)"
                strokeWidth={2}
              />
              <Line 
                type="monotone" 
                dataKey="price_factor" 
                stroke="#F97316" 
                name="Price Factor"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};