import { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { Farm, FarmContextProps } from '../types';
import { generateId, saveToLocalStorage } from '../utils';

export const FarmContext = createContext({} as FarmContextProps);

export const FarmProvider = ({ children }: { children: ReactNode }) => {
    const [farms, setFarms] = useState<Farm[]>([]);

    useEffect(() => {
        const savedFarmers = localStorage.getItem('farms');
        if (savedFarmers) {
            setFarms(JSON.parse(savedFarmers));
        }
    }, []);

    function addFarm(farmer: Farm) {
        const newFarms = [...farms, { ...farmer, id: generateId() }]
        setFarms(newFarms);
        saveToLocalStorage('farms', newFarms);
    };

    function editFarm(updatedFarmer: Farm) {
        const newFarms = farms.map(farmer => farmer.id === updatedFarmer.id ? updatedFarmer : farmer)
        setFarms(newFarms);
        saveToLocalStorage('farms', newFarms);
    };

    function deleteFarm(id: string) {
        const newFarms = farms.filter(farm => farm.id !== id)
        setFarms(newFarms);
        saveToLocalStorage('farms', newFarms);
    };

    return (
        <FarmContext.Provider value={{ farms, addFarm, editFarm, deleteFarm }}>
            {children}
        </FarmContext.Provider>
    );
};

export const useFarm = () => useContext(FarmContext)
