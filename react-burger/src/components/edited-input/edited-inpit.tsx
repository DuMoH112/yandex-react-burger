import React, { useState } from "react";

import { Input } from "@ya.praktikum/react-developer-burger-ui-components";

import { IEditedInput } from "../../utils/interfaces";

const EditedInput = (_ref: IEditedInput) => {
  const value = _ref.value,
    type = _ref.type === void 0 ? "text" : _ref.type,
    name = _ref.name,
    placeholder = _ref.placeholder,
    onChange = _ref.onChange,
    validateFunction = _ref.validateFunction as Function,
    size = _ref.size === void 0 ? "default" : _ref.size;
  const [error, setError] = useState(false);
  const [fieldDisabled, setDisabled] = useState(true);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const onIconClick = () => {
    setDisabled(false);
    setTimeout(function () {
      let _inputRef$current;
      return (_inputRef$current = inputRef.current) === null ||
        _inputRef$current === void 0
        ? void 0
        : _inputRef$current.focus();
    }, 0);
  };

  const validateField = (value: string) => {
    if (Boolean(validateFunction)) setError(!validateFunction(value));
  };

  const onFocus = function onFocus() {
    setError(false);
  };

  const onBlur = function onBlur(e: React.FocusEvent<HTMLInputElement>) {
    if (e.target.value) {
      validateField(e.target.value);
    } else {
      setError(false);
    }
    setDisabled(true);
  };

  return (
    <Input
      type={type}
      name={name}
      placeholder={placeholder}
      icon={"EditIcon"}
      value={value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
        return onChange(e);
      }}
      ref={inputRef}
      onIconClick={onIconClick}
      onBlur={onBlur}
      onFocus={onFocus}
      disabled={fieldDisabled}
      error={error}
      errorText={"Ошибка"}
      size={size}
    />
  );
}

export default EditedInput;
