import type { ComponentProps, FC } from "react";
import { SelectForm } from "../SelectForm/SelectForm";
import styles from './style.module.css'

type SelectFormSectionProps = ComponentProps<'select'> & {
    errorMessage?: string
}

export const SelectFormSection: FC<SelectFormSectionProps> = (props) => {
    return (
        <>
            <SelectForm {...props} />
            {props.errorMessage && <p className={styles.error}>{props.errorMessage}</p>}
        </>
    )
}