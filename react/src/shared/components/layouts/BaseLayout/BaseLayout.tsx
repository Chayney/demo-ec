import type { FC, ReactNode } from "react"
import { Navigation } from "../Navigation/Navigation";
import styles from './style.module.css'

type BaseLayoutProps = {
    children: ReactNode,
    title: string
}

export const BaseLayout: FC<BaseLayoutProps> = (props) => {
    const { children, title } = props;

    return (
        <div>
            <header className={styles.header}>
                <Navigation />
            </header>
            <main className={styles.container}>
                <h1 className={styles.title}>{title}</h1>
                {children}
            </main>
        </div>
    )
}