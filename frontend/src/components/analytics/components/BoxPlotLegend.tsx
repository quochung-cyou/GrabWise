export const BoxPlotLegend = () => {
    return (
      <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
        <h4 className="font-medium text-gray-900 mb-3">Understanding the Box Plot</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-violet-500 rounded-sm"></div>
              <p className="text-sm text-gray-600">Box: Shows the middle 50% of prices (IQR)</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-0.5 bg-violet-500"></div>
              <p className="text-sm text-gray-600">Whiskers: Full price range (min to max)</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-0.5 bg-violet-500"></div>
              <p className="text-sm text-gray-600">Middle Line: Median price</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-orange-500"></div>
              <p className="text-sm text-gray-600">Orange Dot: Mean price</p>
            </div>
          </div>
        </div>
      </div>
    );
  };