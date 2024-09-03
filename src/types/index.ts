export interface Farm {
    id: string;
    cpfCnpj: string;
    ownerName: string;
    farmName: string;
    city: string;
    state: string;
    totalArea: number;
    arableArea: number;
    vegetationArea: number;
    crops: string[];
}