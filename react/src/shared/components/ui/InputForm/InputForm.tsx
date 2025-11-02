import type { ComponentProps, FC } from "react"
import styles from './style.module.css'

type InputFormProps = ComponentProps<'input'>

export const InputForm: FC<InputFormProps> = (props) => {
    const {
        disabled = false,
        type = 'text',
        value,
        placeholder,
        onChange,
        onKeyDown
    } = props;

    return (
        <input
            disabled={disabled}
            className={styles.input}
            type={type}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            onKeyDown={onKeyDown}
        />
    )
}