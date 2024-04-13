import React, { createContext, useContext, useCallback, useEffect, useState, ReactNode } from 'react';

export interface Secret {
  domain: string;
  value: string;
}

export interface SecretsData {
  secrets: Secret[];
  addSecret: (newSecret: Secret) => void;
  deleteSecret: (domain: string) => void;
  updateSecret: (domain: string, newValue: string) => void;
  deleteAllSecrets: () => void;
  // You can also include functions to remove or update secrets as needed.
}

const SecretsContext = createContext<SecretsData | undefined>(undefined);

export const SecretsProvider = ({ children }: { children: ReactNode }) => {
  const [secrets, setSecrets] = useState<Secret[]>([]);

  // Function to add a new secret to the secrets array
  const addSecret = useCallback((newSecret: Secret) => {
    setSecrets(currentSecrets => [...currentSecrets, newSecret]);
  }, []);

  // Function to delete a secret from the secrets array
  const deleteSecret = useCallback((domain: string) => {
    setSecrets(currentSecrets => currentSecrets.filter(secret => secret.domain !== domain));
  }, []);

  // Function to update a secret value
  const updateSecret = useCallback((domain: string, newValue: string) => {
    setSecrets(currentSecrets =>
      currentSecrets.map(secret => (secret.domain === domain ? { ...secret, value: newValue } : secret)),
    );
  }, []);

  // Function to delete all secrets
  const deleteAllSecrets = useCallback(() => {
    setSecrets([]);
  }, []);

  return (
    <SecretsContext.Provider value={{ secrets, addSecret, deleteSecret, updateSecret, deleteAllSecrets }}>
      {children}
    </SecretsContext.Provider>
  );
};

export function useSecrets() {
  const context = useContext(SecretsContext);
  if (context === undefined) {
    throw new Error('useSecrets must be used within a SecretsProvider');
  }
  return context;
}
