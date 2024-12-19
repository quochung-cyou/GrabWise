import { Info } from 'lucide-react';

interface TooltipProps {
  active?: boolean;
  payload?: any[];
}

export const BoxPlotTooltip = ({ active, payload }: TooltipProps) => {
  if (!active || !payload?.length) return null;

  const data = payload[0].payload;
  const formatter = new Intl.NumberFormat('en-US');

  return (
    <div className="bg-white/95 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-violet-200">
      <div className="flex items-center gap-2 mb-2">
        <Info className="h-4 w-4 text-violet-500" />
        <h3 className="font-semibold text-violet-900">{data.condition}</h3>
      </div>
      
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-x-8 gap-y-1">
          <p className="text-sm text-gray-600">Sample Size:</p>
          <p className="text-sm font-medium">{formatter.format(data.count)} rides</p>
        </div>

        <div className="border-t pt-2">
          <p className="text-xs text-gray-500 mb-1">Price Distribution (VND)</p>
          <div className="grid grid-cols-2 gap-x-8 gap-y-1">
            <p className="text-sm text-gray-600">Minimum:</p>
            <p className="text-sm font-medium">{formatter.format(data.min)}</p>
            <p className="text-sm text-gray-600">Q1 (25%):</p>
            <p className="text-sm font-medium">{formatter.format(data["25%"])}</p>
            <p className="text-sm text-gray-600">Median:</p>
            <p className="text-sm font-medium">{formatter.format(data["50%"])}</p>
            <p className="text-sm text-gray-600">Q3 (75%):</p>
            <p className="text-sm font-medium">{formatter.format(data["75%"])}</p>
            <p className="text-sm text-gray-600">Maximum:</p>
            <p className="text-sm font-medium">{formatter.format(data.max)}</p>
          </div>
        </div>

        <div className="border-t pt-2">
          <p className="text-xs text-gray-500 mb-1">Statistics</p>
          <div className="grid grid-cols-2 gap-x-8 gap-y-1">
            <p className="text-sm text-gray-600">Mean:</p>
            <p className="text-sm font-medium">{formatter.format(Math.round(data.mean))}</p>
            <p className="text-sm text-gray-600">Std Dev:</p>
            <p className="text-sm font-medium">±{formatter.format(Math.round(data.std))}</p>
          </div>
        </div>
      </div>
    </div>
  );
};