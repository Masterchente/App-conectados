// src/context/RecordatoriosContext.tsx
import React, { createContext, useContext, useState } from "react";

type Recordatorio = {
  id: number;
  text: string;
  time: string;
};

type RecordatoriosContextType = {
  recordatorios: Recordatorio[];
  addRecordatorio: (text: string, time: string) => void;
};

const RecordatoriosContext = createContext<RecordatoriosContextType | undefined>(undefined);

export const RecordatoriosProvider = ({ children }: { children: React.ReactNode }) => {
  const [recordatorios, setRecordatorios] = useState<Recordatorio[]>([
    { id: 1, text: "Recordatorio 1", time: "10:00 AM" },
    { id: 2, text: "Recordatorio 2", time: "2:00 PM" },
  ]);

  const addRecordatorio = (text: string, time: string) => {
    setRecordatorios((prev) => [
      ...prev,
      { id: Date.now(), text, time },
    ]);
  };

  return (
    <RecordatoriosContext.Provider value={{ recordatorios, addRecordatorio }}>
      {children}
    </RecordatoriosContext.Provider>
  );
};

export const useRecordatorios = () => {
  const context = useContext(RecordatoriosContext);
  if (!context) {
    throw new Error("useRecordatorios debe usarse dentro de RecordatoriosProvider");
  }
  return context;
};
