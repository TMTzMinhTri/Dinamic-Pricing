export interface IResponeSignIn {
    token: string,
    shopName: string,
    apiKey: string
}

export interface IResponseStatus {
    status: boolean
}

export interface IResponeListProduct {
    id: number,
    handle: string,
    created_at: Date,
    title: string,
    vendor: string,
    variants: [
        {
            id: number,
            price: number,
            product_id: number,
            title: string
        }
    ],
    images: [
        {
            created_at: Date,
            id: number,
            position: 1,
            src: string,
        }
    ]
}