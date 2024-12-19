import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Professional color palette with good contrast and accessibility
const COLORS = [
  '#2563EB', // Primary blue
  '#DC2626', // Red
  '#059669', // Green
  '#D97706', // Orange
  '#7C3AED', // Purple
  '#2563EB', // Blue
  '#9333EA', // Indigo
  '#DB2777', // Pink
];

interface FeatureData {
  name: string;
  value: number;
  displayName: string;
}

interface Props {
  data: Record<string, number>;
}

const OTHERS_THRESHOLD = 2; // Combine features with less than 2% importance

export const FeatureImportanceChart = ({ data }: Props) => {
  // Transform and prepare data
  const rawChartData: FeatureData[] = Object.entries(data)
    .map(([feature, importance]) => ({
      name: feature,
      displayName: feature === 'distance' ? 'Distance' :
        feature === 'hour' ? 'Hour' :
        feature === 'is_peak_morning' ? 'Morning Peak' :
        feature === 'is_peak_evening' ? 'Evening Peak' :
        feature === 'is_night' ? 'Night' :
        feature === 'distance_squared' ? 'Squared Distance' :
        feature === 'log_distance' ? 'Log Distance' :
        feature === 'has_rain' ? 'Has Rain' :
        feature === 'weather_severity' ? 'Weather Severity' :
        feature === 'distance_weather' ? 'Distance & Weather' :
        feature === 'distance_squared_weather' ? 'Squared Distance & Weather' :
        feature === 'temp_extreme' ? 'Extreme Temperature' :
        feature === 'temperature' ? 'Temperature' :
        feature === 'humidity' ? 'Humidity' :
        feature === 'wind_speed' ? 'Wind' :
        feature === 'strong_wind' ? 'Strong Wind' :
        feature === 'heavy_rain' ? 'Heavy Rain' :
        feature === 'rain_amount' ? 'Rain Amount' :
        feature === 'distance_peak' ? 'Peak Hour Distance' : feature,
      value: Math.round(importance * 100)
    }))
    .sort((a, b) => b.value - a.value);

  // Combine small values into "Others"
  const significantData: FeatureData[] = [];
  let othersValue = 0;

  rawChartData.forEach(item => {
    if (item.value >= OTHERS_THRESHOLD) {
      significantData.push(item);
    } else {
      othersValue += item.value;
    }
  });

  // Add "Others" category if there are small values
  const chartData = othersValue > 0 
    ? [...significantData, { name: 'others', displayName: 'Others', value: othersValue }]
    : significantData;

  // Custom label component with connecting lines
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    displayName,
    value,
    index
  }: any) => {
    const RADIAN = Math.PI / 180;
    // Increase radius for the line end point
    const radius = outerRadius * 1.2;
    
    // Calculate the end point of the line
    const x2 = cx + radius * Math.cos(-midAngle * RADIAN);
    const y2 = cy + radius * Math.sin(-midAngle * RADIAN);
    
    // Calculate the starting point of the line (on the pie)
    const x1 = cx + (outerRadius + 10) * Math.cos(-midAngle * RADIAN);
    const y1 = cy + (outerRadius + 10) * Math.sin(-midAngle * RADIAN);

    // Calculate the text anchor position (even further out than the line)
    const textRadius = radius + 10;
    const textX = cx + textRadius * Math.cos(-midAngle * RADIAN);
    const textY = cy + textRadius * Math.sin(-midAngle * RADIAN);

    // Determine text anchor based on which side of the pie we're on
    const textAnchor = midAngle < -90 || midAngle >= 90 ? 'end' : 'start';

    // Only show labels for segments with enough space
    if (percent < 0.02) return null;

    return (
      <g>
        {/* Connecting line */}
        <line
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={COLORS[index % COLORS.length]}
          strokeWidth={2}
        />
        {/* Line end point */}
        <circle
          cx={x2}
          cy={y2}
          r={2}
          fill={COLORS[index % COLORS.length]}
        />
        {/* Text background for better readability */}
        <text
          x={textX}
          y={textY}
          textAnchor={textAnchor}
          fill="#000000"
          fontSize={12}
          fontWeight="bold"
          stroke="#FFFFFF"
          strokeWidth={4}
          strokeLinejoin="round"
          strokeLinecap="round"
          paintOrder="stroke"
        >
          {`${displayName} (${value}%)`}
        </text>
        {/* Main text */}
        <text
          x={textX}
          y={textY}
          textAnchor={textAnchor}
          fill={COLORS[index % COLORS.length]}
          fontSize={12}
          fontWeight="bold"
        >
          {`${displayName} (${value}%)`}
        </text>
      </g>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Feature Importance Level</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[600px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={200}
                innerRadius={100}
                paddingAngle={1}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]}
                    stroke="#fff"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};