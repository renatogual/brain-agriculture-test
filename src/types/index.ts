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

export interface FarmContextProps {
    farms: Farm[];
    addFarm: (farm: Farm) => void;
    editFarm: (farm: Farm) => void;
    deleteFarm: (id: string) => void;
}