import { Controller } from "react-hook-form"
import styles from './style.module.css'
import type { ProfileType } from "../../types/profile"
import type { FC } from "react"
import { CommonButton } from "../../../../shared/components/ui/CommonButton/CommonButton"
import { useProfilePay } from "./useProfilePay"
import { InputRadioSection } from "../../../../shared/components/ui/InputRadioSection/InputRadioSection"

type ProfilePayProps = {
    profile: ProfileType
}

export const ProfilePay: FC<ProfilePayProps> = (props) => {
    const { profile } = props;
    
    const {
        control,
        errors,
        handlePaySubmit,
        payMethods
    } = useProfilePay({ profile });

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handlePaySubmit}>
                <div className={styles.area}>
                    <Controller
                        name="pay"
                        render={({ field }) => (
                            <>
                                {payMethods.map(({ pay, label }) => (
                                    <InputRadioSection
                                        key={pay}
                                        type="radio"
                                        name={field.name}
                                        value={pay}
                                        checked={field.value === pay}
                                        onChange={() => field.onChange(pay)}
                                        label={label}
                                    />
                                ))}
                                {errors.pay && (
                                    <p className={styles.error}>{errors.pay.message}</p>
                                )}
                            </>
                        )}
                        control={control}
                    />
                </div>
                <div className={styles.area}>
                    <CommonButton type="submit">更新する</CommonButton>
                </div>
            </form>
        </div>
    )
}