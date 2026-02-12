export interface NavLink {
    name: string
    url: string
}

export interface Service {
    cta: string
    description: string[]
    href: string
    price: number | string
    priceText: string
    title: string
}

export interface Referral {
    cta: string
    href: string
}