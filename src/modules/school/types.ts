export interface School {
    id: string;
    name: string;
    address: {
        provincia: string;
        ciudad: string;
        calle: string;
        postCode: string;
    };
}