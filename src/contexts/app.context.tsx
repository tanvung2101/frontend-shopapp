import { createContext, useState } from 'react'
import { ExtendedPurchase } from '../pages/Cart/Cart'

interface AppContextInterface {
  extendedPurchase: ExtendedPurchase | undefined;
  setExtendedPurchase: React.Dispatch<React.SetStateAction<ExtendedPurchase | undefined>>;
}


const initialAppContext: AppContextInterface = {
  extendedPurchase: undefined,
  setExtendedPurchase: () => null,
}

export const AppContext = createContext<AppContextInterface>(initialAppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [extendedPurchase, setExtendedPurchase] = useState<ExtendedPurchase | undefined>(undefined);


  return (
    <AppContext.Provider
      value={{
        extendedPurchase,
        setExtendedPurchase,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
