import { Controller } from "react-hook-form"
import { InputFormSection } from "../../../../shared/components/ui/InputFormSection/InputFormSection"
import styles from './style.module.css'
import type { ProfileType } from "../../types/profile"
import type { FC } from "react"
import { useProfileAddress } from "./useProfileAddress"
import { CommonButton } from "../../../../shared/components/ui/CommonButton/CommonButton"

type ProfileAddressProps = {
    profile: ProfileType
}

export const ProfileAddress: FC<ProfileAddressProps> = (props) => {
    const { profile } = props;
    
    const {
        control,
        errors,
        handleAddressSubmit
    } = useProfileAddress({ profile });

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleAddressSubmit}>
                <div className={styles.area}>
                    <Controller
                        name="postcode"
                        render={({ field }) => (
                            <InputFormSection
                                type="text"
                                placeholder="Postcode"
                                errorMessage={errors.postcode?.message}
                                {...field}
                            />
                        )}
                        control={control}
                    />
                </div>
                <div className={styles.area}>
                    <Controller
                        name="address"
                        render={({ field }) => (
                            <InputFormSection
                                type="text"
                                placeholder="Address"
                                errorMessage={errors.address?.message}
                                {...field}
                            />
                        )}
                        control={control}
                    />
                </div>
                <div className={styles.area}>
                    <Controller
                        name="building"
                        render={({ field }) => (
                            <InputFormSection
                                type="text"
                                placeholder="Building"
                                errorMessage={errors.building?.message}
                                {...field}
                            />
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