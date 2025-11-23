import { SellTemplate } from "../features/sell/components/SellTemplate/SellTemplate"
import { BaseLayout } from "../shared/components/layouts/BaseLayout/BaseLayout"

export const SellPage = () => {
    return (
        <BaseLayout title="Sell">
            <SellTemplate />
        </BaseLayout>
    )
}