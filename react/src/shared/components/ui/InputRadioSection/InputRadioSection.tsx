import type { ComponentProps, FC, ReactNode } from "react"
import styles from './style.module.css'
import { InputRadio } from "../InputRadio/InputRadio"

type InputRadioSectionProps = ComponentProps<'input'> & {
    errorMessage?: string,
    label?: ReactNode;
    labelPosition?: 'left' | 'right';
}

export const InputRadioSection: FC<InputRadioSectionProps> = (props) => {
    const {
        errorMessage,
        type = 'radio',
        label,
        labelPosition = 'right',
        name,
        checked,
        onChange,
        value,
        ...rest
    } = props;

    if (type === 'radio' || type === 'checkbox') {
        return (
            <div className={styles.radioWrapper}>
                <label className={styles.radioLabel}>
                    {labelPosition === 'left' && label}
                    <InputRadio
                        type={type}
                        name={name}
                        checked={checked}
                        value={value}
                        onChange={onChange}
                        {...rest} />
                    {labelPosition === 'right' && label}
                </label>
                {errorMessage && <p className={styles.error}>{errorMessage}</p>}
            </div>
        );
    }

    return null;
}