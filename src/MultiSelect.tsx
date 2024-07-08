import { useEffect, useState } from "react";
import styles from "./multiselect.module.css";

export type SelectOption = {
  label: string;
  value: string | number;
};

type MultipleSelectProps = {
  multiple: true;
  value?: SelectOption[];
  onChange: (value: SelectOption[]) => void;
};

type SingleSelectProps = {
  multiple?: false;
  value?: SelectOption;
  onChange: (value: SelectOption | undefined) => void;
};

type SelectProps = {
  options: SelectOption[];
} & (MultipleSelectProps | SingleSelectProps);

export function MultiSelect({
  multiple,
  value,
  onChange,
  options,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(0);

  const clearOptions = () => {
    multiple ? onChange([]) : onChange(undefined);
  };

  const selectOption = (option: SelectOption) => {
    if (multiple) {
      if (value.includes(option)) {
        onChange(value.filter((o) => o !== option));
      } else {
        onChange([...value, option]);
      }
    } else {
      if (option !== value) {
        onChange(option);
      }
    }
  };

  const isOptionSelected = (option: SelectOption) => {
    return multiple ? value?.includes(option) : option === value; // return true if the option is selected
  };

  useEffect(() => {
    if (isOpen) {
      setHighlightIndex(0); // reset the highlight index when the dropdown is opened
    }
  }, [isOpen]);

  return (
    <>
      <div
        onBlur={() => setIsOpen(false)} // This to make user able to close the dropdown by clicking outside of it
        onClick={() => setIsOpen((prev) => !prev)} // This to toggle the dropdown when click the box (previous value and give the exact opposite value)
        tabIndex={0} // This to make the div focusable
        className={styles.container}
      >
        <span className={styles.value}>
          {multiple
            ? value?.map((v) => (
                <button
                  key={v.value}
                  onClick={(e) => {
                    e.stopPropagation();
                    selectOption(v);
                  }}
                  className={styles["option-badge"]}
                >
                  {v.label}
                  <span className={styles["remove-btn"]}>&times;</span>
                </button>
              ))
            : value?.label}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation(); // it will prevent the event from bubbling up the Parent DOM tree
            clearOptions();
          }}
          className={styles["clear-btn"]}
        >
          &times;
        </button>
        <div className={styles.divider}></div>
        <div className={styles.caret}></div>
        <ul className={`${styles.options} ${isOpen ? styles.show : ""}`}>
          {options.map((option, index) => (
            <li
              key={option.value}
              onClick={(e) => {
                e.stopPropagation();
                selectOption(option);
                setIsOpen(false);
              }}
              onMouseEnter={() => setHighlightIndex(index)} // This to highlight the option when hover on it
              className={`${styles.option} ${
                isOptionSelected(option) ? styles.selected : ""
              }
                ${index === highlightIndex ? styles.highlighted : ""}`}
            >
              {option.label}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
