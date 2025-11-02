import { Controller } from "react-hook-form";
import { useTodoCreateTemplate } from "./useTodoCreateTemplate"
import { PuffLoader } from "react-spinners";
import { InputFormSection } from "../../../../shared/components/ui/InputFormSection/InputFormSection";
import styles from './style.module.css'
import { TextAreaSection } from "../../../../shared/components/ui/TextAreaSection/TextAreaSection";
import { CommonButton } from "../../../../shared/components/ui/CommonButton/CommonButton";

export const TodoCreateTemplate = () => {
    const { 
        control,
        errors,
        handleCreateTodo,
        isLoading
    } = useTodoCreateTemplate();

    if (isLoading) {
        return <PuffLoader />
    }

    return (
        <form className={styles.container} onSubmit={handleCreateTodo}>
            <div className={styles.area}>
                <Controller
                    name="title"
                    render={({ field }) => (
                        <InputFormSection
                            placeholder="Title"
                            errorMessage={errors.title?.message}
                            {...field}
                        />
                    )}
                    control={control}
                />
            </div>
            <div className={styles.area}>
                <Controller
                    name="content"
                    render={({ field }) => (
                        <TextAreaSection
                            placeholder="Content"
                            errorMessage={errors.content?.message}
                            {...field}
                        />
                    )}
                    control={control}
                />
            </div>
            <div className={styles.area}>
                <CommonButton type="submit">CREATE TODO</CommonButton>
            </div>
        </form>
    )
}