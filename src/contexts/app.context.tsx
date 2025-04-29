import { createContext, useState } from 'react'
import { ExtendedPurchase } from '../pages/Cart/Cart'
import { storage } from '../utils/storage';
import { Profile } from '../interface/auth.interface';

interface AppContextInterface {
  isAuthenticated: Boolean,
  setIsAuthenticated: React.Dispatch<React.SetStateAction<Boolean>>,
  profile: Profile | null
  setProfile: React.Dispatch<React.SetStateAction<Profile | null>>
  extendedPurchase: ExtendedPurchase | undefined;
  setExtendedPurchase: React.Dispatch<React.SetStateAction<ExtendedPurchase | undefined>>;
}


const initialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(storage.getToken()),
  setIsAuthenticated: () => null,
  profile: storage.getInfo(),
  setProfile: () => null,
  extendedPurchase: undefined,
  setExtendedPurchase: () => null,
}

export const AppContext = createContext<AppContextInterface>(initialAppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(initialAppContext.isAuthenticated)
  const [profile, setProfile] = useState<Profile | null>(initialAppContext.profile)
  const [extendedPurchase, setExtendedPurchase] = useState<ExtendedPurchase | undefined>(undefined);


  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        profile, 
        setProfile,
        extendedPurchase,
        setExtendedPurchase,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
