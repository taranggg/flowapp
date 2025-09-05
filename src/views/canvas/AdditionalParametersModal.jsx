import React, { useState, useEffect, useMemo } from "react";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";

const inputBase =
  "w-full h-11 px-3 border rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500";

function TextWidget(props) {
  const {
    id,
    value,
    required,
    disabled,
    readonly,
    autofocus,
    placeholder,
    onChange,
    onBlur,
    onFocus,
    options,
  } = props;
  const empty = (options && options.emptyValue) ?? "";
  return (
    <input
      id={id}
      type="text"
      className={inputBase}
      value={value ?? ""}
      required={required}
      disabled={disabled}
      readOnly={readonly}
      autoFocus={autofocus}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value === "" ? empty : e.target.value)}
      onBlur={(e) => onBlur && onBlur(id, e.target.value)}
      onFocus={(e) => onFocus && onFocus(id, e.target.value)}
    />
  );
}

function NumberWidget(props) {
  const {
    id,
    value,
    required,
    disabled,
    readonly,
    autofocus,
    placeholder,
    onChange,
    onBlur,
    onFocus,
    options,
  } = props;
  const empty = options && options.emptyValue;
  const step = options && options.step;
  const min = options && options.min;
  const max = options && options.max;
  return (
    <input
      id={id}
      type="number"
      className={inputBase}
      value={value ?? ""}
      required={required}
      disabled={disabled}
      readOnly={readonly}
      autoFocus={autofocus}
      placeholder={placeholder}
      onChange={(e) => {
        const v = e.target.value;
        if (v === "") return onChange(empty);
        const n = e.currentTarget.valueAsNumber;
        onChange(Number.isNaN(n) ? empty : n);
      }}
      onBlur={(e) => onBlur && onBlur(id, e.target.value)}
      onFocus={(e) => onFocus && onFocus(id, e.target.value)}
      step={step ?? "any"}
      min={min}
      max={max}
    />
  );
}

function SelectWidget(props) {
  const {
    id,
    value,
    required,
    disabled,
    readonly,
    autofocus,
    onChange,
    options,
  } = props;
  const enumOptions = (options && options.enumOptions) || [];
  return (
    <select
      id={id}
      className={inputBase}
      value={value ?? ""}
      required={required}
      disabled={disabled || readonly}
      autoFocus={autofocus}
      onChange={(e) => onChange(e.target.value)}
    >
      {!required && <option value="">Select…</option>}
      {enumOptions.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

const widgets = {
  TextWidget,
  PasswordWidget: TextWidget,
  EmailWidget: TextWidget,
  URIWidget: TextWidget,
  SelectWidget,
  UpDownWidget: NumberWidget,
  RangeWidget: NumberWidget,
  DateWidget: TextWidget,
  DateTimeWidget: TextWidget,
  AltDateWidget: TextWidget,
  AltDateTimeWidget: TextWidget,
  NumberWidget: NumberWidget,
  IntegerWidget: NumberWidget,
};

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

function resolveToolParametersSchema(schemaOrTool) {
  if (!schemaOrTool) return { type: "object", properties: {} };
  if (schemaOrTool.toolParameters) return schemaOrTool.toolParameters;
  return schemaOrTool;
}

const ModalCard = ({ children }) => (
  <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 shadow-xl">{children}</div>
);

const Actions = ({ onCancel, onSave, saveClass, isSubmit }) => (
  <div className="flex justify-end gap-2 mt-6">
    <button
      type="button"
      onClick={onCancel}
      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
    >
      Cancel
    </button>
    <button type={isSubmit ? "submit" : "button"} onClick={onSave} className={saveClass}>
      Save
    </button>
  </div>
);

const FallbackNumberField = ({ id, label, value, onChange }) => (
  <div className="mb-5" style={{ minHeight: 60 }}>
    <label htmlFor={id} className="block text-base font-semibold text-gray-900 mb-1">
      {label}
    </label>
    <input id={id} type="number" min="0" value={value} onChange={onChange} className={inputBase} />
  </div>
);

export default function AdditionalParametersModal({
  isOpen,
  onClose,
  nodeData,
  onSave,
  schema, // pass either selectedTool.toolParameters OR the whole tool object
  uiSchema,
}) {
  const currentFormData = useMemo(() => nodeData?.data?.toolParameterValues ?? {}, [nodeData]);
  const [dynamicFormData, setDynamicFormData] = useState(currentFormData);
  const [maxIterations, setMaxIterations] = useState(nodeData?.data?.maxIterations || 0);

  useEffect(() => {
    setDynamicFormData(currentFormData);
  }, [currentFormData, isOpen]);

  useEffect(() => {
    if (nodeData && nodeData.data) {
      setMaxIterations(nodeData.data.maxIterations || 0);
    }
  }, [nodeData]);

  const handleDynamicSave = ({ formData }) => {
    if (onSave && nodeData) onSave(nodeData.id, { toolParameterValues: formData });
    onClose();
  };

  const handleFallbackSave = () => {
    if (onSave && nodeData) onSave(nodeData.id, { maxIterations });
    onClose();
  };

  const handleFallbackChange = (e) => {
    const value = e.target.value;
    if (value === "") {
      setMaxIterations("");
    } else {
      const numValue = parseInt(value, 10);
      if (!isNaN(numValue) && numValue >= 0) {
        setMaxIterations(numValue);
      }
    }
  };

  if (!isOpen) return null;

  const effectiveSchema = resolveToolParametersSchema(schema);
  const mergedUiSchema = { "ui:label": false, ...(uiSchema || {}) };

  const hasSchemaFields =
    effectiveSchema &&
    effectiveSchema.properties &&
    Object.keys(effectiveSchema.properties).length > 0;

  const isTool = !!(nodeData?.data && (nodeData.data.toolName || nodeData.data.toolId || nodeData.data.toolParameters));
  const saveBtnClass = isTool
    ? "px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
    : "px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600";
  return (
    <div className="fixed inset-0 bg-stone-950/80 flex items-center justify-center z-50">
      <ModalCard>
        {hasSchemaFields ? (
          <Form
            schema={effectiveSchema}
            uiSchema={mergedUiSchema}
            formData={dynamicFormData}
            validator={validator}
            FieldTemplate={CustomFieldTemplate}
            widgets={widgets}
            onChange={({ formData }) => setDynamicFormData(formData)}
            onSubmit={handleDynamicSave}
            showErrorList={false}
          >
            <Actions onCancel={onClose} saveClass={saveBtnClass} isSubmit />
          </Form>
        ) : (
          <div>
            <FallbackNumberField id="maxIterations" label="Max Iterations" value={maxIterations} onChange={handleFallbackChange} />
            <Actions onCancel={onClose} onSave={handleFallbackSave} saveClass={saveBtnClass} />
          </div>
        )}
      </ModalCard>
    </div>
  );
}
