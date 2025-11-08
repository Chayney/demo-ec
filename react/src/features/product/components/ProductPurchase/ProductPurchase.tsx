import { useCallback, type FC } from "react"
import type { ProductType } from "../../types/product"
import styles from './style.module.css'
import { CommonButton } from "../../../../shared/components/ui/CommonButton/CommonButton";
import { useNavigate } from "react-router-dom";
import { NAVIGATION_PATH } from "../../../../shared/constants/navigation";

type ProductPurchaseProps = {
    product: ProductType
}

export const ProductPurchase: FC<ProductPurchaseProps> = (props) => {
    const { product } = props;
    const navigate = useNavigate();

    const handleMoveAddressPage = useCallback(
        // product.idを付与
        () => navigate(`${NAVIGATION_PATH.ADDRESS}?id=${product.id}`), [navigate, product.id]
    );

    return (
        <div className={styles.parentContainer}>
            <div className={styles.childLeftContainer}>
                <div className={styles.itemGroup}>
                    <div className={styles.imgGroup}>
                        <img
                            className={styles.img}
                            src={product.image_url}
                            alt={product.name}
                        />
                    </div>
                    <div className={styles.nameGroup}>
                        <p>{product.name}</p>
                        <p>￥{product.price}</p>
                    </div>
                </div>
                <div className={styles.payGroup}>
                    <span className={styles.payLabel}>支払い方法</span>
                    <form action="/purchase/pay/{item_id}" method="get">
                        変更する
                    </form>
                </div>
                <div className={styles.addressGroup}>
                    <span className={styles.addressLabel}>配送先</span>
                    <button onClick={handleMoveAddressPage}>
                        変更する
                    </button>
                </div>
            </div>
            <div className={styles.childRightContainer}>
                <div className={styles.priceGroup}>
                    <span className={styles.priceLabel}>商品代金</span>
                    <span className={styles.name}>￥{product.price}</span>
                </div>
                <div className={styles.payGroup}>
                    <p className="">支払い金額</p>
                </div>
                <div className={styles.payGroup}>
                    <p className="">支払い方法</p>
                </div>
                <CommonButton type="submit">購入する</CommonButton>
            </div>
        </div>
    )
}