export type ProductType = {
    id: number,
    profile_id: number,
    condition_id: number,
    name: string,
    description: string,
    price: number,
    image_url: string,
    // image
    // DBにはimageが定義されているが相対パスで登録
    // ブラウザに表示するには絶対パスが必要
    // モデル側でJSON出力時に自動で、image_urlを含めるように設定
    // 画像の絶対URLを返すアクセサ処理を行っている
}

// export type GetProduct = {
//     id: number
// }