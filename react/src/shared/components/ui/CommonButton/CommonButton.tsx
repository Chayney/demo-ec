import type { ComponentProps, FC, ReactNode } from "react"
import styles from './style.module.css'

type CommonButtonProps = ComponentProps<'button'> & {
    children: ReactNode
}

export const CommonButton: FC<CommonButtonProps> = (props) => {
    const {
        type,
        onClick,
        children
    } = props;

    return (
        <button className={styles.button} type={type} onClick={onClick}>{children}</button>
    )
}