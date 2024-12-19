"use client"

import React from 'react'
import Plot from 'react-plotly.js'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

interface WeatherStats {
  count: number
  mean: number
  std: number
  min: number
  "25%": number
  "50%": number
  "75%": number
  max: number
}

interface Props {
  data: {
    price_by_weather: Record<string, WeatherStats>
    hourly_analysis: Record<string, {
      mean_price: number
      is_peak: string
    }>
    peak_summary: {
      morning_peak: { hours: string, avg_price_factor: number }
      evening_peak: { hours: string, avg_price_factor: number }
      late_night: { hours: string, avg_price_factor: number }
    }
  }
}

export const WeatherPriceChart: React.FC<Props> = ({ data }) => {
  const weatherConditions = Object.keys(data.price_by_weather)
  const boxPlotData = weatherConditions.map(condition => ({
    type: 'box',
    y: [
      data.price_by_weather[condition].min,
      data.price_by_weather[condition]["25%"],
      data.price_by_weather[condition]["50%"],
      data.price_by_weather[condition]["75%"],
      data.price_by_weather[condition].max
    ],
    name: condition,
    boxpoints: 'outliers',
    jitter: 0.3,
    pointpos: -1.8,
    marker: {
      color: getColor(condition),
      outliercolor: 'rgba(219, 64, 82, 0.6)',
      line: {
        outliercolor: 'rgba(219, 64, 82, 1)',
        outlierwidth: 2
      }
    },
    line: {
      color: getColor(condition)
    }
  }))

  const hourlyData = Object.entries(data.hourly_analysis).map(([hour, info]) => ({
    x: [parseInt(hour)],
    y: [info.mean_price],
    type: 'scatter',
    mode: 'markers',
    name: `Hour ${hour}`,
    marker: {
      color: getPeakColor(info.is_peak),
      size: 10,
      symbol: 'diamond'
    },
    showlegend: false
  }))

  const layout = {
    title: 'Ride Price Distribution by Weather Condition',
    yaxis: {
      title: 'Price (VND)',
      zeroline: false,
      gridcolor: 'rgb(229, 231, 235)',
      tickformat: ',d',
      ticksuffix: ' VND'
    },
    xaxis: {
      title: 'Weather Condition',
      zeroline: false,
      gridcolor: 'rgb(229, 231, 235)'
    },
    boxmode: 'overlay', 
    plot_bgcolor: 'rgb(249, 250, 251)',
    paper_bgcolor: 'rgb(249, 250, 251)',
    font: {
      family: 'Arial, sans-serif',
      size: 14,
      color: 'rgb(55, 65, 81)'
    },
    showlegend: true,
    legend: {
      title: { text: 'Weather Condition' },
      orientation: 'h',
      yanchor: 'bottom',
      y: -0.4,
      xanchor: 'center',
      x: 0.5
    },
    margin: {
      l: 120,
      r: 30,
      b: 100,
      t: 100,
      pad: 4
    },
    annotations: [
      {
        x: 0.5,
        y: 1.12,
        xref: 'paper',
        yref: 'paper',
        text: 'Hourly average prices shown as diamond markers',
        showarrow: false,
        font: {
          size: 12,
          color: 'rgb(107, 114, 128)'
        }
      }
    ]
  }

  const config = {
    responsive: true,
    displayModeBar: false
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-gray-900">
          Ride Price Distribution Across Weather Conditions
        </CardTitle>
        <CardDescription>
          Box plot showing price distribution, with hourly averages as diamond markers
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[600px]">
          <Plot
            data={[...boxPlotData]}
            layout={layout}
            config={config}
            style={{ width: '100%', height: '100%' }}
          />
        </div>

      </CardContent>
    </Card>
  )
}

const PeakSummary: React.FC<{ title: string, data: { hours: string, avg_price_factor: number } }> = ({ title, data }) => (
  <div className="bg-gray-100 p-3 rounded-lg">
    <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
    <p className="text-xs text-gray-600">Hours: {data.hours}</p>
    <p className="text-xs text-gray-600">Avg Price Factor: {data.avg_price_factor.toFixed(2)}x</p>
  </div>
)

function getColor(condition: string): string {
  const colors = {
    rainy: 'rgba(54, 162, 235, 0.7)',
    normal: 'rgba(75, 192, 192, 0.7)',
    extreme_temp: 'rgba(255, 99, 132, 0.7)',
    normal_temp: 'rgba(255, 206, 86, 0.7)'
  }
  return colors[condition as keyof typeof colors] || 'rgba(201, 203, 207, 0.7)'
}

function getPeakColor(peakType: string): string {
  const colors = {
    morning_peak: 'rgba(255, 159, 64, 0.8)',
    evening_peak: 'rgba(153, 102, 255, 0.8)',
    late_night: 'rgba(201, 203, 207, 0.8)',
    normal: 'rgba(75, 192, 192, 0.8)'
  }
  return colors[peakType as keyof typeof colors] || 'rgba(201, 203, 207, 0.8)'
}
