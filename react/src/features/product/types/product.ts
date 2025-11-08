// --- Element テーブル ---
export type ElementType = {
    id: number;
    name: string;
};

// --- Condition テーブル ---
export type ConditionType = {
    id: number;
    condition: string;
};

// --- Item テーブル ---
export type ItemType = {
    id: number;
    profile_id: number;
    condition_id: number;
    name: string;
    description?: string | null;
    price: number;
    image: string;
    image_url: string,
    // image
    // DBにはimageが定義されているが相対パスで登録
    // ブラウザに表示するには絶対パスが必要
    // モデル側でJSON出力時に自動で、image_urlを含めるように設定
    // 画像の絶対URLを返すアクセサ処理を行っている
};

export type ProductType = ItemType & {
    condition?: ConditionType,
    // 複数項目もあり
    elements?: ElementType[]
}

export type GetProductRequest = {
    id: number,
    // purchaseはログインユーザーのみ
    // デフォルトはproduct
    type?: 'product' | 'purchase'
}