export interface CreateAddressDto {
    province: string;
    city: string;
    street: string;
    postCode: string;
}

export interface CreateSchoolDto {
    name: string;
    addressId: number;
}