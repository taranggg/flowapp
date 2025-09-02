import React, { useState, useEffect } from "react";
import { Input } from "../../components/ui/input";

export default function AdditionalParametersModal({
  isOpen,
  onClose,
  nodeData,
  onSave,
}) {
  const [maxIterations, setMaxIterations] = useState(
    nodeData?.data?.maxIterations || 0
  );

  // Update state when nodeData changes
  useEffect(() => {
    if (nodeData?.data) {
      setMaxIterations(nodeData.data.maxIterations || 0);
    }
  }, [nodeData]);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value === "") {
      setMaxIterations("");
    } else {
      const numValue = parseInt(value);
      if (!isNaN(numValue) && numValue >= 0) {
        setMaxIterations(numValue);
      }
    }
  };

  const handleSave = () => {
    if (onSave && nodeData) {
      onSave(nodeData.id, { maxIterations });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-stone-950/80 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 shadow-xl">
        <div className="space-y-4">
          <div>
            <label
              htmlFor="maxIterations"
              className="block text-gray-700 font-medium mb-3"
            >
              Max Iterations
            </label>
            <Input
              id="maxIterations"
              type="number"
              value={maxIterations}
              onChange={handleInputChange}
              min="0"
              className="w-full h-12 text-lg px-4 border border-gray-200 rounded-lg"
            />
          </div>
          <div className="flex justify-end gap-2 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
