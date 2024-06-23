import { KeyboardEvent, useEffect, useRef, useState } from "react";
import style from "./styles/select.module.css";

export type SelectOption = {
  label: string;
  value: string | number;
};

type SingleSelectProps = {
  multiple?: false;
  value?: SelectOption;
  onChange: (value: SelectOption | undefined) => void;
};

type MultipleSelectProps = {
  multiple: true;
  value: SelectOption[];
  onChange: (value: SelectOption[]) => void;
};

type SelectProps = {
  options: SelectOption[];
} & (SingleSelectProps | MultipleSelectProps);

export function Select({ multiple, value, onChange, options }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  function clearOptions() {
    multiple ? onChange([]) : onChange(undefined);
  }

  function selectOption(option: SelectOption) {
    if (multiple) {
      if (value.includes(option)) {
        onChange(value.filter((val) => val !== option));
      } else {
        onChange([...value, option]);
      }
    } else {
      onChange(option);
    }
  }

  function isOptionSelected(option: SelectOption) {
    return multiple ? value.includes(option) : option === value;
  }

  useEffect(() => {
    if (isOpen) setHighlightedIndex(0);
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target != containerRef.current) return;

      switch (e.code) {
        case "Enter":
        case "Space":
          setIsOpen((prev) => !prev);
          if (isOpen) selectOption(options[highlightedIndex]);
          break;
        case "ArrowUp":
        case "ArrowDown": {
          if (!isOpen) {
            setIsOpen(true);
            break;
          }

          const newValue = highlightedIndex + (e.code === "ArrowDown" ? 1 : -1);
          if (newValue >= 0 && newValue < options.length) {
            setHighlightedIndex(newValue);
          }
          break;
        }
        case "Escape":
          setIsOpen(false);
          break;
      }
    };

    containerRef.current?.addEventListener<"keydown">(
      "keydown",
      handler as any
    );

    return () => {
      containerRef.current?.removeEventListener("keydown", handler as any);
    };
  }, [isOpen, highlightedIndex, options]);

  return (
    <div
      ref={containerRef}
      onBlur={() => setIsOpen(false)}
      onClick={() => setIsOpen((pre) => !pre)}
      tabIndex={0}
      className={style.container}
    >
      <span className={style.value}>
        {multiple
          ? value.map((val) => (
              <button
                key={val.value}
                className={style["option-badge"]}
                onClick={(e) => {
                  e.stopPropagation();

                  selectOption(val);
                }}
              >
                {val.label} <span className={style["remove-btn"]}>&times;</span>
              </button>
            ))
          : value?.label}
      </span>
      <button
        onClick={(e) => {
          e.stopPropagation();
          clearOptions();
        }}
        className={style["clear-btn"]}
      >
        &times;
      </button>
      <div className={style.divider}></div>
      <div className={style.caret}></div>
      <ul className={`${style.options} ${isOpen ? style.show : ""}`}>
        {options.map((option, index) => {
          return (
            <li
              onClick={(e) => {
                e.stopPropagation();

                selectOption(option);
                setIsOpen(false);
              }}
              onMouseEnter={() => setHighlightedIndex(index)}
              key={option.value}
              className={`${style.option} ${
                isOptionSelected(option) ? style.selected : ""
              } ${index === highlightedIndex ? style.highlighted : ""}`}
            >
              {option.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
