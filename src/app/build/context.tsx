"use client";

import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { WheelOption, DeckOption, MetalOption } from "@/data/customizer";

type CustomizerControlsContext = {
  selectedWheel?: WheelOption;
  setWheel: (wheel: WheelOption) => void;
  selectedDeck?: DeckOption;
  setDeck: (deck: DeckOption) => void;
  selectedTruck?: MetalOption;
  setTruck: (trucks: MetalOption) => void;
  selectedBolt?: MetalOption;
  setBolt: (bolts: MetalOption) => void;
};

const defaultContext: CustomizerControlsContext = {
  setWheel: () => {},
  setDeck: () => {},
  setTruck: () => {},
  setBolt: () => {},
};

const CustomizerControlsContext = createContext(defaultContext);

type CustomizerControlsProviderProps = {
  defaultWheel?: WheelOption;
  defaultDeck?: DeckOption;
  defaultTruck?: MetalOption;
  defaultBolt?: MetalOption;
  children?: ReactNode;
};

export function CustomizerControlsProvider({
  defaultWheel,
  defaultDeck,
  defaultTruck,
  defaultBolt,
  children,
}: CustomizerControlsProviderProps) {
  const [selectedWheel, setWheel] = useState(defaultWheel);
  const [selectedDeck, setDeck] = useState(defaultDeck);
  const [selectedTruck, setTruck] = useState(defaultTruck);
  const [selectedBolt, setBolt] = useState(defaultBolt);

  const value = useMemo(() => {
    return {
      selectedWheel,
      setWheel,
      selectedDeck,
      setDeck,
      selectedTruck,
      setTruck,
      selectedBolt,
      setBolt,
    };
  }, [selectedWheel, selectedDeck, selectedTruck, selectedBolt]);

  return (
    <CustomizerControlsContext.Provider value={value}>
      {children}
    </CustomizerControlsContext.Provider>
  );
}

export function useCustomizerControls() {
  return useContext(CustomizerControlsContext);
}
