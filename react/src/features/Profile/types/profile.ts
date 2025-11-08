export type ProfileType = {
    id: number,
    user_id: number,
    image: string,
    name: string,
    postcode: string,
    address: string,
    building: string,
    pay: number
}

export type ProfileAddressRequest = {
    postcode: string,
    address: string,
    building?: string
}