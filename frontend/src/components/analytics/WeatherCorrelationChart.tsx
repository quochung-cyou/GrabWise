import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from '@/hooks/use-toast';
import { getCorrelationColor, getCorrelationStrength, formatCorrelationValue } from './utils/correlationUtils';
import { WeatherCorrelationResponse, WeatherCorrelationData } from './types/correlationTypes';
import CorrelationLegend from '@/components/CorrelationLegend';

const WeatherCorrelationChart = () => {
  const { toast } = useToast();
  const [correlationData, setCorrelationData] = useState<WeatherCorrelationResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<WeatherCorrelationResponse>('http://localhost:8000/api/v1/api/weather/correlations');
        setCorrelationData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching correlation data:', error);
        toast({
          title: "Error",
          description: "Failed to load correlation data. Please try again later.",
          variant: "destructive",
        });
        setIsLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Weather Variable Correlations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[600px]">
            <Skeleton className="w-full h-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!correlationData) return null;

  const variables = ['Temperature', 'Rain Amount', 'Humidity', 'Wind Speed', 'Distance', 'New Price'];
  
  // Create a complete correlation matrix including self-correlations
  const getCorrelationValue = (source: string, target: string): WeatherCorrelationData => {
    if (source === target) {
      return {
        id: `${source.toLowerCase()}-self`,
        source,
        target,
        correlation: 1.0,
        interpretation: "Perfect positive correlation (self)"
      };
    }

    const key = `${source.toLowerCase().replace(' ', '_')}_vs_${target.toLowerCase().replace(' ', '_')}`;
    const reverseKey = `${target.toLowerCase().replace(' ', '_')}_vs_${source.toLowerCase().replace(' ', '_')}`;
    
    if (correlationData.data[key]) {
      return {
        id: key,
        source,
        target,
        correlation: correlationData.data[key].pearson_correlation,
        interpretation: correlationData.data[key].interpretation
      };
    } else if (correlationData.data[reverseKey]) {
      return {
        id: reverseKey,
        source,
        target,
        correlation: correlationData.data[reverseKey].pearson_correlation,
        interpretation: correlationData.data[reverseKey].interpretation
      };
    }

    return {
      id: `${source.toLowerCase()}-${target.toLowerCase()}`,
      source,
      target,
      correlation: 0,
      interpretation: "No correlation data available"
    };
  };

  // Generate all possible pairs including self-correlations
  const correlations: WeatherCorrelationData[] = [];
  variables.forEach((source) => {
    variables.forEach((target) => {
      correlations.push(getCorrelationValue(source, target));
    });
  });

  const cellSize = 120; // Increased cell size
  const margin = 100;  // Increased margin
  const width = variables.length * cellSize + margin * 2;
  const height = variables.length * cellSize + margin * 2;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Weather Variable Correlations</CardTitle>
        <p className="text-sm text-muted-foreground">
          Interactive heatmap showing relationships between different weather variables
        </p>
      </CardHeader>
      <CardContent>
        <div className="relative overflow-x-auto" style={{ width: '100%', height: `${height}px` }}>
          {/* Column headers */}
          {variables.map((variable, i) => (
            <div
              key={`col-${i}`}
              className="absolute transform -rotate-45 text-sm font-semibold"
              style={{
                left: `${margin + i * cellSize + cellSize / 2}px`,
                top: `${margin - 40}px`,
                transformOrigin: 'bottom left',
                whiteSpace: 'nowrap'
              }}
            >
              {variable}
            </div>
          ))}

          {/* Row headers */}
          {variables.map((variable, i) => (
            <div
              key={`row-${i}`}
              className="absolute text-sm font-semibold"
              style={{
                left: `${margin - 100}px`,
                top: `${margin + i * cellSize + cellSize / 2}px`,
                transform: 'translateY(-50%)',
                whiteSpace: 'nowrap'
              }}
            >
              {variable}
            </div>
          ))}

          {/* Correlation cells */}
          {correlations.map((item) => {
            const rowIndex = variables.indexOf(item.source);
            const colIndex = variables.indexOf(item.target);
            const backgroundColor = getCorrelationColor(item.correlation);
            const strength = getCorrelationStrength(item.correlation);
            
            return (
              <div
                key={`${item.source}-${item.target}`}
                className="absolute transition-all duration-300 hover:opacity-90 cursor-pointer group"
                style={{
                  left: `${margin + colIndex * cellSize}px`,
                  top: `${margin + rowIndex * cellSize}px`,
                  width: `${cellSize}px`,
                  height: `${cellSize}px`,
                  backgroundColor,
                  transform: 'scale(0.95)',
                  transition: 'transform 0.2s ease-in-out',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(0.95)';
                }}
              >
                <div className="flex items-center justify-center h-full">
                  <div className="opacity-0 group-hover:opacity-100 absolute bg-black/95 text-white p-3 rounded-lg text-sm -translate-y-full -translate-x-1/2 left-1/2 top-0 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-xl backdrop-blur-sm z-50">
                    <div className="font-semibold mb-1">{`${item.source} vs ${item.target}`}</div>
                    <div>{`Correlation: ${formatCorrelationValue(item.correlation)}`}</div>
                    <div>{`Strength: ${strength} ${item.correlation < 0 ? 'Negative' : 'Positive'}`}</div>
                    <div className="text-xs mt-1 text-gray-300">{item.interpretation}</div>
                  </div>
                  <span className="text-base font-semibold text-white drop-shadow-md">
                    {formatCorrelationValue(item.correlation)}
                  </span>
                </div>
              </div>
            );
          })}

          <CorrelationLegend />
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherCorrelationChart;