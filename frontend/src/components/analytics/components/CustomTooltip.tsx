import { Info } from 'lucide-react';

interface TooltipProps {
  active: boolean;
  payload: any[];
}

export const CustomTooltip = ({ active, payload }: TooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
        <p className="font-semibold text-gray-900">{data.weather}</p>
        <div className="space-y-2 mt-2">
          <div className="grid grid-cols-2 gap-x-4 text-sm">
            <p className="text-gray-600">Sample Count:</p>
            <p className="font-medium">{data.count.toLocaleString()}</p>
          </div>
          <div className="grid grid-cols-2 gap-x-4 text-sm">
            <p className="text-gray-600">Mean Price:</p>
            <p className="font-medium">{data.mean.toLocaleString()} VND</p>
          </div>
          <div className="grid grid-cols-2 gap-x-4 text-sm">
            <p className="text-gray-600">Std Deviation:</p>
            <p className="font-medium">{data.std.toLocaleString()} VND</p>
          </div>
          <div className="border-t pt-2">
            <div className="grid grid-cols-2 gap-x-4 text-sm">
              <p className="text-gray-600">Minimum:</p>
              <p className="font-medium">{data.min.toLocaleString()} VND</p>
            </div>
            <div className="grid grid-cols-2 gap-x-4 text-sm">
              <p className="text-gray-600">Q1 (25%):</p>
              <p className="font-medium">{data.q1.toLocaleString()} VND</p>
            </div>
            <div className="grid grid-cols-2 gap-x-4 text-sm">
              <p className="text-gray-600">Median:</p>
              <p className="font-medium">{data.median.toLocaleString()} VND</p>
            </div>
            <div className="grid grid-cols-2 gap-x-4 text-sm">
              <p className="text-gray-600">Q3 (75%):</p>
              <p className="font-medium">{data.q3.toLocaleString()} VND</p>
            </div>
            <div className="grid grid-cols-2 gap-x-4 text-sm">
              <p className="text-gray-600">Maximum:</p>
              <p className="font-medium">{data.max.toLocaleString()} VND</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return null;
};