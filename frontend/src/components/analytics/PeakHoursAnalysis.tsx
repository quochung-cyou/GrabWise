import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
interface PeakData {
  hours: string;
  avg_price_factor: number;
}
interface Props {
  data: {
    morning_peak: PeakData;
    evening_peak: PeakData;
    late_night: PeakData;
  };
}
export const PeakHoursAnalysis = ({ data }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Peak Hours Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Morning Peak</h3>
              <p>Time: {data.morning_peak.hours}</p>
              <p>Price Factor: {(data.morning_peak.avg_price_factor * 100).toFixed(1)}%</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Evening Peak</h3>
              <p>Time: {data.evening_peak.hours}</p>
              <p>Price Factor: {(data.evening_peak.avg_price_factor * 100).toFixed(1)}%</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Late Night</h3>
              <p>Time: {data.late_night.hours}</p>
              <p>Price Factor: {(data.late_night.avg_price_factor * 100).toFixed(1)}%</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};