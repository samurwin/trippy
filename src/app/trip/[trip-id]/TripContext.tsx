"use-client"
import { createContext, useContext } from "react";

import { tripData } from '../.././../../types';

type TripContextType = {
  trip: tripData | null;
  setTrip:  (trip: tripData | null) => void;
};

const TripContext = createContext<TripContextType>({ 
  trip: null,
  setTrip: () => {} 
});

export default TripContext;

export function useTrip() {
  return useContext(TripContext);
}
