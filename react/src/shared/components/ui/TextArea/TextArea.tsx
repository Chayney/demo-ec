import type { ComponentProps, FC } from "react"
import styles from './style.module.css'

type TextAreaProps = ComponentProps<'textarea'>

export const TextArea: FC<TextAreaProps> = (props) => {
    const {
        disabled = false,
        value,
        placeholder,
        onChange
    } = props;

    return (
        <textarea
            disabled={disabled}
            className={styles.text}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
        />
    )
}