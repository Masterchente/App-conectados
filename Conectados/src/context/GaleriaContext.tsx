import React, { createContext, useContext, useState, ReactNode } from "react";

type Imagen = {
  id: number;
  uri: string;
  fecha: string;
};

type GaleriaContextType = {
  imagenes: Imagen[];
  agregarImagen: (uri: string) => void;
};

const GaleriaContext = createContext<GaleriaContextType>({
  imagenes: [],
  agregarImagen: () => {},
});

export const GaleriaProvider = ({ children }: { children: ReactNode }) => {
  const [imagenes, setImagenes] = useState<Imagen[]>([]);

  const agregarImagen = (uri: string) => {
    const nueva = {
      id: Date.now(),
      uri,
      fecha: new Date().toLocaleDateString("es-MX"),
    };
    setImagenes((prev) => [nueva, ...prev]);
  };

  return (
    <GaleriaContext.Provider value={{ imagenes, agregarImagen }}>
      {children}
    </GaleriaContext.Provider>
  );
};

export const useGaleria = () => useContext(GaleriaContext);
