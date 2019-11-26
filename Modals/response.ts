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
export interface IResponeListOrders {
    billing_address: {
        country: string
        name: string
        phone: string
        province: string
        district: string
        ward: string
        address1: string
        address2: string
    },
    customer: {
        email: string
        orders_count: string
        total_spent: string
        updated_at: string
        birthday: string
        gender: string
        note: string
    },
    gateway: string,
    line_items: {
        price: number,
        product_id: number,
        image: {
            src: string
        },
        name: string,
        vendor: string,
        title: string,
        grams: number
    }
}