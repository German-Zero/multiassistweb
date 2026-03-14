export interface School {
    id: number;
    name: string;
    address: {
        provincia: string;
        ciudad: string;
        calle: string;
        postCode: string;
    };
}