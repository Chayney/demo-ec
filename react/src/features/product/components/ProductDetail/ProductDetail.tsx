import type { FC } from "react"
import type { ProductType } from "../../types/product"
import styles from './style.module.css'

type ProductDetailProps = {
    product: ProductType
}

export const ProductDetail: FC<ProductDetailProps> = (props) => {
    const { product } = props;

    return (
        <div className={styles.parentContainer}>
            <div className={styles.childLeftContainer}>
                <img
                    className={styles.img}
                    src={product.image_url}
                    alt={product.name}
                />
            </div>
            <div className={styles.ChildRightContainer}>

            </div>
        </div>
    )
}