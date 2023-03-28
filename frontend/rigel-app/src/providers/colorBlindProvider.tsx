import React, {createContext, useState} from 'react';

interface ColorBlindContextInterface {

    colorBlindMode: 'deuteranopia' | 'protanopia' | 'tritanopia';
    setColorBlindMode: React.Dispatch<React.SetStateAction<'deuteranopia' | 'protanopia' | 'tritanopia'>>;
    colorBlindIntensity: number;
    setColorBlindIntensity: React.Dispatch<React.SetStateAction<number>>;
}

export const ColorBlindContext = createContext<ColorBlindContextInterface>({
    colorBlindMode: 'tritanopia',
    setColorBlindMode: () => {
    },
    colorBlindIntensity: 10,
    setColorBlindIntensity: () => {
    },
});

export const ColorBlindProvider: React.FC = ({children}: any) => {
    const [colorBlindMode, setColorBlindMode] = useState<'deuteranopia' | 'protanopia' | 'tritanopia'>(
        'tritanopia',
    );
    const [colorBlindIntensity, setColorBlindIntensity] = useState<number>(10);

    return (
        <ColorBlindContext.Provider
            value={{colorBlindMode, setColorBlindMode, colorBlindIntensity, setColorBlindIntensity}}
        >
            {children}
        </ColorBlindContext.Provider>
    );
};


export const useColorBlind = () => {
    return React.useContext(ColorBlindContext);
}
