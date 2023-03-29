import React, {createContext, useState} from 'react';

interface FilterContextInterface {
    contrast: number;
    setContrast: React.Dispatch<React.SetStateAction<number>>;
    brightness: number;
    setBrightness: React.Dispatch<React.SetStateAction<number>>;
    saturation: number;
    setSaturation: React.Dispatch<React.SetStateAction<number>>;
    hue: number;
    setHue: React.Dispatch<React.SetStateAction<number>>;
    handleResetColors: () => void;
    getFilterEffect: () => string;
    isUsingFilter: boolean;
    setIsUsingFilter: React.Dispatch<React.SetStateAction<boolean>>;
}

export const FilterContext = createContext<FilterContextInterface>({
    contrast: 1,
    setContrast: () => {
    },
    brightness: 1,
    setBrightness: () => {
    },
    saturation: 1,
    setSaturation: () => {
    },
    hue: 0,
    setHue: () => {
    },
    handleResetColors: () => {
    },
    getFilterEffect: () => '',
    isUsingFilter: false,
    setIsUsingFilter: () => {
    },
});

export const FilterProvider: React.FC = ({children}: any) => {
    const [isUsingFilter, setIsUsingFilter] = useState<boolean>(false);
    const [contrast, setContrast] = useState<number>(1);
    const [brightness, setBrightness] = useState<number>(1);
    const [saturation, setSaturation] = useState<number>(1);
    const [hue, setHue] = useState<number>(0);

    const handleResetColors = () => {
        setContrast(1);
        setBrightness(1);
        setSaturation(1);
        setHue(0);
    }

    const getFilterEffect = () => {
        if (isUsingFilter)
            return `contrast(${contrast}) brightness(${brightness}) saturate(${saturation}) hue-rotate(${hue}deg)`;
        else
            return '';
    }

    return (
        <FilterContext.Provider
            value={{
                contrast,
                setContrast,
                brightness,
                setBrightness,
                saturation,
                setSaturation,
                hue,
                setHue,
                handleResetColors,
                getFilterEffect,
                isUsingFilter,
                setIsUsingFilter
            }}
        >
            {children}
        </FilterContext.Provider>
    );
};

export const useFilter = () => {
    return React.useContext(FilterContext);
}
