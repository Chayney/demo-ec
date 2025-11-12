import type { ItemType } from "../../product/types/product"

// --- Profile テーブル ---
export type ProfileType = {
    id: number,
    user_id: number,
    image: string,

    // アクセサでブラウザに表示できるよう新しく定義
    image_url: string,

    name: string,
    postcode: string,
    address: string,
    building: string,
    pay: number
}

// --- Purchase テーブル ---
export type PurchaseType = {
    id: number,
    profile_id: number,
    item_id: number
}

export type PurchaseItemType = PurchaseType & ItemType

// --- Profile, Purchase, Item 合算 ---
export type ProfileInfo = {
    profile: ProfileType
    purchaseItems: PurchaseItemType[],
    items: ItemType[]
}

export type ProfileEditRequest = {
    id: number,
    name: string,
    image?: string | null
    postcode: string,
    address: string,
    building? :string
}

export type ProfileAddressRequest = {
    postcode: string,
    address: string,
    building?: string
}

export type ProfilePayRequest = {
    id: number,
    pay: number
}