import PropTypes from "prop-types";
import "./Field.css";
function Field({
  id,
  label,
  type = "text",
  value,
  onChange,
  onBlur,
  error,
  touched,
  placeholder,
  required = false,
  disabled = false,
  options = [], // for select
  maxLength,
  rows = 3,
  readOnly = false,
}) {
  const showError = touched && error;
  const errorId = showError ? `${id}-error` : undefined;
  const commonProps = {
    id,
    name: id,
    value,
    onChange,
    onBlur,
    disabled,
    readOnly,
    placeholder,
    "aria-invalid": showError,
    "aria-describedby": errorId,
    "aria-required": required,
  };
  const renderInput = () => {
    if (type === "select") {
      return (
        <select
          {...commonProps}
          className={`field-input ${showError ? "error" : ""}`}
        >
          <option value="">Select...</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      );
    }
    if (type === "textarea") {
      return (
        <textarea
          {...commonProps}
          rows={rows}
          maxLength={maxLength}
          className={`field-input ${showError ? "error" : ""}`}
        />
      );
    }
    return (
      <input
        {...commonProps}
        type={type}
        maxLength={maxLength}
        className={`field-input ${showError ? "error" : ""}`}
      />
    );
  };

  return (
    <div className="field">
      <label htmlFor={id} className="field-label">
        {label}
        {required && <span className="field-required">*</span>}
      </label>
      {renderInput()}
      {!showError && maxLength && type === "textarea" && (
        <span className="field-hint">
          {value?.length || 0} / {maxLength} characters
        </span>
      )}
      {showError && (
        <p id={errorId} className="field-error" role="alert">
          ⚠️ {error}
        </p>
      )}
    </div>
  );
}

Field.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf([
    "text",
    "tel",
    "email",
    "number",
    "textarea",
    "select",
  ]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  error: PropTypes.string,
  touched: PropTypes.bool,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ),
  maxLength: PropTypes.number,
  rows: PropTypes.number,
  readOnly: PropTypes.bool,
};

export default Field;
