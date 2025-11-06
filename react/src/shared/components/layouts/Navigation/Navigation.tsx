import { useAuthContext } from "../../../../features/auth/hooks/useAuthContext"
import { NAVIGATION_LIST } from "../../../constants/navigation"
import { NavigationLink } from "../../ui/NavigationLink/NavigationLink"
import styles from './style.module.css'

export const Navigation = () => {
    const { signout, isAuth } = useAuthContext();

    return (
        <div className={styles.header}>
            <h1 className={styles.title}>Demo</h1>
            <nav className={styles.nav}>
                <ul className={styles.ul}>
                    {!isAuth && (
                        <>
                            <NavigationLink linkPath={NAVIGATION_LIST.SIGNIN} label="SIGNIN" />
                            <NavigationLink linkPath={NAVIGATION_LIST.SIGNUP} label="SIGNUP" />
                            <NavigationLink linkPath={NAVIGATION_LIST.SELL} label="SELL" />
                        </>
                    )}
                    {isAuth && (
                        <>
                            <button className={styles.button} onClick={signout}>Signout</button>
                            <NavigationLink linkPath={NAVIGATION_LIST.MYPAGE} label="MYPAGE" />
                            <NavigationLink linkPath={NAVIGATION_LIST.SELL} label="SELL" />
                        </>
                    )}
                </ul>
            </nav>
        </div>
    )
}