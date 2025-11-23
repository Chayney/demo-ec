import { PuffLoader } from "react-spinners";
import { useItemQuery } from "../../hooks/useItemQuery"
import { Sell } from "../Sell/Sell";
import { Controller } from "react-hook-form";
import { useRef, type ChangeEvent } from "react";
import { InputFormSection } from "../../../../shared/components/ui/InputFormSection/InputFormSection";
import { CommonButton } from "../../../../shared/components/ui/CommonButton/CommonButton";
import styles from './style.module.css'
import { useSellTemplate } from "./useSellTemplate";

export const SellTemplate = () => {
    // 単一セレクトボックスと複数選択ドロップダウンリストの初期値用
    const { data: itemData, isLoading } = useItemQuery();

    const {
        control,
        errors,
        handleSellSubmit,
        previewUrl
    } = useSellTemplate();

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    if (isLoading) {
        return <PuffLoader />
    }

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSellSubmit}>
                <span className={styles.formTitle}>商品画像</span>
                <div className={styles.imageArea}>
                    <Controller
                        name="image"
                        control={control}
                        render={({ field: { onChange } }) => (
                            <div
                                className={styles.imageContainer}
                                // 画像クリックでもファイル選択
                                onClick={() => fileInputRef.current?.click()}
                                style={{ cursor: 'pointer', position: 'relative' }}
>
                                {/* プレビュー画像または選択ボタン */}
                                {previewUrl === '/no-image.jpg' ? (
                                    <div className={styles.button}>
                                        画像を選択する
                                    </div>
                                ) : (
                                    <img
                                        src={previewUrl}
                                        className={styles.previewImage}
                                        alt="preview"
                                    />
                                )}

                                {/* hidden input */}
                                <input
                                    type="file"
                                    accept="image/*"
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                        const file = e.target.files?.[0];
                                        // react-hook-formにセット
                                        if (file) onChange(file);
                                    }}
                                />
                            </div>
                        )}
                    />
                </div>
                <div className={styles.area}>
                    <span className={styles.areaTitle}>商品の詳細</span>
                    {!!itemData && <Sell itemData={itemData} control={control} />}
                </div>
                <div className={styles.area}>
                    <span className={styles.areaTitle}>商品名と説明</span>
                    <span className={styles.formTitle}>商品名</span>
                    <Controller
                        name="name"
                        control={control}
                        render={({ field }) => (
                            <InputFormSection
                                type="text"
                                placeholder="Name"
                                errorMessage={errors.name?.message}
                                {...field}
                            />
                        )}
                    />            
                    <span className={styles.formTitle}>商品詳細</span>            
                    <Controller
                        name="description"
                        control={control}
                        render={({ field }) => (
                            <InputFormSection
                                type="text"
                                placeholder="Description"
                                errorMessage={errors.description?.message}
                                {...field}
                            />
                        )}
                    />          
                </div>   
                <div className={styles.area}>
                    <span className={styles.areaTitle}>販売価格</span>
                    <span className={styles.formTitle}>商品価格</span>
                    <Controller
                        name="price"
                        control={control}
                        render={({ field: { onChange, value, ...rest } }) => (
                            <InputFormSection
                                type="text"
                                placeholder="Price"
                                errorMessage={errors.price?.message}
                                value={value}
                                onChange={(e) => onChange(Number(e.target.value))}
                                {...rest}
                            />
                        )}
                    />
                </div>
                <div className={styles.area}>
                    <CommonButton type="submit" disabled={isLoading}>
                        {isLoading ? '出品中...' : '出品する'}
                    </CommonButton>
                </div>
            </form>
        </div>
    )
}