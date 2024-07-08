import { useEffect, useState } from "react";
import styles from "./select.module.css";

type SelectOption = {
  label: string;
  value: string | number;
};

type SelectProps = {
  options: SelectOption[];
  value?: SelectOption;
  onChange: (value: SelectOption | undefined) => void;
};

export function Select({ value, onChange, options }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(0);

  const clearOptions = () => {
    onChange(undefined);
  };

  const selectOption = (option: SelectOption) => {
    if (option !== value) {
      onChange(option);
    } else {
      alert("You have already selected this option");
    }
  };

  const isOptionSelected = (option: SelectOption) => {
    return option === value; // return true if the option is selected
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
        <span className={styles.value}>{value?.label}</span>
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
