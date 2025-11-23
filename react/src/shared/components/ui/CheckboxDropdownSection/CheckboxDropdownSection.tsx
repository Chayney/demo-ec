import type { FC } from "react";
import styles from './style.module.css';
import { CheckboxDropdown } from "../CheckboxDropdown/CheckboxDropDown";

type CheckboxDropdownSectionProps = {
    options: { id: number; label: string }[];
    selected: number[];
    onChange: (selected: number[]) => void;
    placeholder?: string;
    errorMessage?: string;
};

export const CheckboxDropdownSection: FC<CheckboxDropdownSectionProps> = ({
    options,
    selected,
    onChange,
    placeholder = "選択してください",
    errorMessage
}) => {
    return (
        <>
            <CheckboxDropdown
                options={options}
                selected={selected}
                onChange={onChange}
                placeholder={placeholder}
            />
            {errorMessage && <p className={styles.error}>{errorMessage}</p>}
        </>
    );
};
