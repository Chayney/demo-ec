import { useCallback, type FC } from "react"
import type { ProductType } from "../../types/product"
import styles from './style.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { CommonButton } from "../../../../shared/components/ui/CommonButton/CommonButton";
import { CommonTag } from "../../../../shared/components/ui/CommonTag/CommonTag";
import { useNavigate } from "react-router-dom";
import { NAVIGATION_PATH } from "../../../../shared/constants/navigation";
import { useAuthContext } from "../../../auth/hooks/useAuthContext";

type ProductDetailProps = {
    product: ProductType
}

export const ProductDetail: FC<ProductDetailProps> = (props) => {
    const { product } = props;
    const { isAuth } = useAuthContext();
    const navigate = useNavigate();

    // ログインユーザーは購入ページへ
    const handleMovePurchasePage = useCallback(
        () => navigate(`${NAVIGATION_PATH.PURCHASE}/${product.id}`),[navigate]
    );

    // ゲストユーザーはログインページへリダイレクト
    const handleMoveLoginPage = useCallback(
        () => navigate(`${NAVIGATION_PATH.SIGNIN}`), [navigate]
    );

    return (
        <div className={styles.parentContainer}>
            <div className={styles.childLeftContainer}>
                <img
                    className={styles.img}
                    src={product.image_url}
                    alt={product.name}
                />
            </div>
            <div className={styles.childRightContainer}>
                <p className={styles.name}>{product.name}</p>
                <p className={styles.name}>￥{product.price}</p>
                <div className={styles.iconGroup}>
                    <FontAwesomeIcon
                        icon={faStarRegular}
                        size="2x"
                    />
                    <FontAwesomeIcon
                        icon={faComment}
                        size="2x"
                    />
                </div>
                {!isAuth && (
                    <CommonButton type="submit" onClick={handleMoveLoginPage}>購入する</CommonButton>
                )}
                {isAuth && (
                    <CommonButton type="submit" onClick={handleMovePurchasePage}>購入する</CommonButton>
                )}
                <div className={styles.infoGroup}>
                    <p className={styles.name}>商品説明</p>
                    <p>{product.condition?.condition}</p>
                    <p>{product.description}</p>
                </div>
                <div className={styles.infoGroup}>
                    <p className={styles.name}>商品の情報</p>
                    {product.elements?.map((element) => (
                        <span key={element.id} className={styles.tag}>
                            <CommonTag>{element.name}</CommonTag>
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}