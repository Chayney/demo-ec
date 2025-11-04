import { useAuthContext } from "../../../../features/auth/hooks/useAuthContext"
import { NAVIGATION_LIST } from "../../../constants/navigation"
import { NavigationLink } from "../../ui/NavigationLink/NavigationLink"
import styles from './style.module.css'

export const Navigation = () => {
    const { signout } = useAuthContext();

    return (
        <div className={styles.header}>
            <h1 className={styles.title}>Demo</h1>
            <nav className={styles.nav}>
                <ul className={styles.ul}>
                    <NavigationLink linkPath={NAVIGATION_LIST.TOP} label="TOP" />
                    <NavigationLink linkPath={NAVIGATION_LIST.CREATE} label="CREATE" />
                    <button className={styles.button} onClick={signout}>Signout</button>
                </ul>
            </nav>
        </div>
    )
}