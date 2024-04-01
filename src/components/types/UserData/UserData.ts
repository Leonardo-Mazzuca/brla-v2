type Limits = {
    limitMint: number;
    limitBurn: number;
    limitSwapBuy: number;
    limitSwapSell: number;
    limitBRLAOutOwnAccount: number;
    
}

type Wallets = {

    evm: string;
    tron: string;

}

export type UserData = {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    autoConvert: boolean;
    pixKey: string;
    kyc: {
        documentType: string;
        documentData: string;
    };
    address: {
        cep: string;
        street: string;
        number: string;
        complement: string;
        district: string;
        city: string;
        state: string;
    };

    wallets: Wallets;
    brCode: string;
    createdAt: string;
    passwordChangedAt: string;
    twoFAActivated: boolean;
    limits: Limits;
    
}