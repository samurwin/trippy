"use-client"
import { createContext, useContext } from "react";

import { tripData } from '../.././../../types';

type TripContextType = {
  tripData: tripData | null;
};

const TripContext = createContext<TripContextType>({ tripData: null });

export function TripProvider({ tripData, children }: { tripData: tripData; children: React.ReactNode }) {
  return <TripContext.Provider value={{ tripData }}>{children}</TripContext.Provider>;
}

export function useTrip() {
  return useContext(TripContext);
}
