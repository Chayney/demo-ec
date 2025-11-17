import { Controller } from 'react-hook-form';
import { useSigninTemplate } from './useSigninTemplate';
import { PuffLoader } from 'react-spinners';
import { InputFormSection } from '../../../../shared/components/ui/InputFormSection/InputFormSection';
import styles from './style.module.css';
import { CommonButton } from '../../../../shared/components/ui/CommonButton/CommonButton';

export const SigninTemplate = () => {
	const { control, handleSigninSubmit, errors, isLoading } = useSigninTemplate();

	if (isLoading) {
		return <PuffLoader />;
	}

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Signin</h1>
			<form className={styles.form} onSubmit={handleSigninSubmit}>
				<div className={styles.area}>
					<Controller
						name="email"
						render={({ field }) => (
							<InputFormSection
								type="text"
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
					<CommonButton type="submit">Signin</CommonButton>
				</div>
			</form>
		</div>
	);
};
