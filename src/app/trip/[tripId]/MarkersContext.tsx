import { createContext, useContext, ReactNode, useState } from 'react'
import { Poi } from '../../../../types';

const MarkersContext = createContext<{
  markers: Poi[] | undefined;
  setMarkers: (newLocations: Poi[]) => void;
} | null>(null);

// Context Provider component
export function MarkersProvider({ children }: { children: ReactNode }) {
  const [markers, setMarkers] = useState<Poi[]>([]);
  return (
    <MarkersContext.Provider value={{ markers, setMarkers }}>
      {children}
    </MarkersContext.Provider>
  );
}


export function useMarkers() {
  const context = useContext(MarkersContext);
  if (!context) {
    throw new Error('useMarkers must be used within a MarkersProvider');
  }
  return context;
}

export default MarkersContext;