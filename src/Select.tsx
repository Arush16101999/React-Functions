import { useState } from "react";
import styles from "./select.module.css";

type SelectOption = {
  label: string;
  value: any;
};

type SelectProps = {
  options: SelectOption[];
  value?: SelectOption;
  onChange: (value: SelectOption | undefined) => void;
};

export function Select({ value, onChange, options }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const clearOptions = () => {
    onChange(undefined);
  };

  const selectOption = (option: SelectOption) => {
    onChange(option);
  };

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
          {options.map((option) => (
            <li
              key={option.label}
              onClick={(e) => {
                e.stopPropagation();
                selectOption(option);
                setIsOpen(false);
              }}
              className={styles.option}
            >
              {option.label}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
