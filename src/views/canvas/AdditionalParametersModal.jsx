import React, { useState, useEffect } from "react";
import { Input } from "../../components/ui/input";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";

// Custom FieldTemplate for label-above-input layout
function CustomFieldTemplate(props) {
  const {
    id,
    classNames,
    label,
    help,
    required,
    description,
    errors,
    children,
    hidden,
    displayLabel,
  } = props;
  if (hidden) return <div style={{ display: "none" }}>{children}</div>;
  return (
    <div className={classNames + " mb-5"} style={{ minHeight: 60 }}>
      {displayLabel && label && (
        <label
          htmlFor={id}
          className="block text-base font-semibold text-gray-900 mb-1"
        >
          {label}
          {required ? " *" : null}
        </label>
      )}
      {description && (
        <div className="text-xs text-gray-500 mb-1">{description}</div>
      )}
      <div>{children}</div>
      {errors && <div className="text-xs text-red-500 mt-1">{errors}</div>}
      {help && <div className="text-xs text-gray-400 mt-1">{help}</div>}
    </div>
  );
}

export default function AdditionalParametersModal({
  isOpen,
  onClose,
  nodeData,
  onSave,
  schema,
  uiSchema,
  formData,
}) {
  // For legacy static form fallback
  const [maxIterations, setMaxIterations] = useState(
    nodeData?.data?.maxIterations || 0
  );

  // For dynamic RJSF form
  const [dynamicFormData, setDynamicFormData] = useState(formData || {});

  useEffect(() => {
    if (nodeData?.data) {
      setMaxIterations(nodeData.data.maxIterations || 0);
    }
  }, [nodeData]);

  useEffect(() => {
    setDynamicFormData(formData || {});
  }, [formData, isOpen]);

  // Static form input handler (for legacy fallback)
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

  if (!isOpen) return null;

  // RJSF form submit handler
  const handleDynamicSave = ({ formData }) => {
    if (onSave && nodeData) {
      onSave(nodeData.id, formData);
    }
    onClose();
  };

  // Static form save handler
  const handleSave = () => {
    if (onSave && nodeData) {
      onSave(nodeData.id, { maxIterations });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-stone-950/80 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 shadow-xl">
        {/* If schema is provided, render RJSF form, else fallback to static */}
        {schema ? (
          <Form
            schema={schema}
            uiSchema={uiSchema}
            formData={dynamicFormData}
            validator={validator}
            FieldTemplate={CustomFieldTemplate}
            onChange={({ formData }) => setDynamicFormData(formData)}
            onSubmit={handleDynamicSave}
            showErrorList={false}
          >
            <div className="flex justify-end gap-2 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </Form>
        ) : (
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
        )}
      </div>
    </div>
  );
}
