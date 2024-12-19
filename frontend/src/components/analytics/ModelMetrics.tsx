"use client"

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Loader2 } from 'lucide-react'

interface MetricsData {
  mae: number
  rmse: number
  mape: number
  r2: number
  interpretation: {
    mae: string
    rmse: string
    mape: string
    r2: string
  }
}

const AnimatedNumber = ({ value }: { value: number }) => {
  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {value.toFixed(2)}
    </motion.span>
  )
}

const AnimatedProgress = ({ value }: { value: number }) => {
  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: `${value}%` }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Progress value={value} className="mt-2" />
    </motion.div>
  )
}

export const ModelMetrics = () => {
  const [metrics, setMetrics] = useState<MetricsData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/api/model/metrics')
        if (!response.ok) {
          throw new Error('Failed to fetch metrics')
        }
        const data = await response.json()
        setMetrics(data.data)
      } catch (err) {
        setError('Failed to load metrics. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchMetrics()
  }, [])

  if (isLoading) return (
    <div className="flex items-center justify-center h-64">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
    </div>
  )
  if (error) return <div className="text-red-500 text-center">{error}</div>
  if (!metrics) return null

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900 dark:to-indigo-900">
        <CardHeader>
          <CardTitle>Model Accuracy</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">R² Score</p>
              <p className="text-4xl font-bold">
                <AnimatedNumber value={metrics.r2 * 100} />%
              </p>
              <AnimatedProgress value={metrics.r2 * 100} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Interpretation</p>
              <p className="text-sm">{metrics.interpretation.r2}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900 dark:to-emerald-900">
        <CardHeader>
          <CardTitle>Mean Absolute Percentage Error</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">MAPE</p>
              <p className="text-4xl font-bold">
                <AnimatedNumber value={metrics.mape} />%
              </p>
              <AnimatedProgress value={metrics.mape} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Interpretation</p>
              <p className="text-sm">{metrics.interpretation.mape}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900 dark:to-pink-900">
        <CardHeader>
          <CardTitle>Root Mean Square Error</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">RMSE</p>
              <p className="text-4xl font-bold">
                <AnimatedNumber value={metrics.rmse} />
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Interpretation</p>
              <p className="text-sm">{metrics.interpretation.rmse}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900 dark:to-orange-900">
        <CardHeader>
          <CardTitle>Mean Absolute Error</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">MAE</p>
              <p className="text-4xl font-bold">
                <AnimatedNumber value={metrics.mae} />
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Interpretation</p>
              <p className="text-sm">{metrics.interpretation.mae}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
