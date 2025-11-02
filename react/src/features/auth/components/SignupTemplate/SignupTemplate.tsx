import { Controller } from "react-hook-form"
import { useSignupTemplate } from "./useSignupTemplate"
import { PuffLoader } from "react-spinners";
import { InputFormSection } from "../../../../shared/components/ui/InputFormSection/InputFormSection";
import styles from './style.module.css'
import { CommonButton } from "../../../../shared/components/ui/CommonButton/CommonButton";

export const SignupTemplate = () => {
    const { 
        control,
        handleSignupSubmit,
        errors,
        isLoading
    } = useSignupTemplate();

    if (isLoading) {
        return <PuffLoader />
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Signup</h1>
            <form className={styles.form} onSubmit={handleSignupSubmit}>
                <div className={styles.area}>
                    <Controller
                        name="name"
                        render={({ field }) => (
                            <InputFormSection
                                type="text"
                                placeholder="User Name"
                                errorMessage={errors.name?.message}
                                {...field}
                            />
                        )}
                        control={control}
                    />
                </div>
                <div className={styles.area}>
                    <Controller
                        name="email"
                        render={({ field }) => (
                            <InputFormSection
                                type="email"
                                placeholder="Email"
                                errorMessage={errors.email?.message}
                                {...field}
                            />
                        )}
                        control={control}
                    />
                </div>
                <div className={styles.area}>
                    <Controller
                        name="password"
                        render={({ field }) => (
                            <InputFormSection
                                type="password"
                                placeholder="Password"
                                errorMessage={errors.password?.message}
                                {...field}
                            />
                        )}
                        control={control}
                    />
                </div>
                <div className={styles.area}>
                    <Controller
                        name="password_confirmation"
                        render={({ field }) => (
                            <InputFormSection
                                type="password"
                                placeholder="Password Confirmation"
                                errorMessage={errors.password_confirmation?.message}
                                {...field}
                            />
                        )}
                        control={control}
                    />
                </div>
                <div className={styles.area}>
                    <CommonButton type="submit">Signup</CommonButton>
                </div>
            </form>
        </div>
    )
}