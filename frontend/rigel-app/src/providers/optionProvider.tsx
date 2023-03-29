import React from "react";

interface IOptionProvider {
    isEpilepsyMode: boolean;
    setIsEpilepsyMode: React.Dispatch<React.SetStateAction<boolean>>;
    isColorBlindMode: boolean;
    setIsColorBlindMode: React.Dispatch<React.SetStateAction<boolean>>;
    isSpecialMode: boolean;
    setIsSpecialMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export const OptionContext = React.createContext<IOptionProvider>({
    isEpilepsyMode: false,
    setIsEpilepsyMode: () => {
    },
    isColorBlindMode: false,
    setIsColorBlindMode: () => {
    },
    isSpecialMode: false,
    setIsSpecialMode: () => {
    },
});

export const OptionProvider: React.FC = ({children}: any) => {
    const [isEpilepsyMode, setIsEpilepsyMode] = React.useState<boolean>(false);
    const [isColorBlindMode, setIsColorBlindMode] = React.useState<boolean>(false);
    const [isSpecialMode, setIsSpecialMode] = React.useState<boolean>(false);

    return (
        <OptionContext.Provider
            value={{
                isEpilepsyMode,
                setIsEpilepsyMode,
                isColorBlindMode,
                setIsColorBlindMode,
                isSpecialMode,
                setIsSpecialMode
            }}
        >
            {children}
        </OptionContext.Provider>
    );
};

export const useOption = () => {
    return React.useContext(OptionContext);
}
