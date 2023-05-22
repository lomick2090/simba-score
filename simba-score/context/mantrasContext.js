import * as React from 'react';
import { db } from '../config/firebase';
import { getDocs, collection } from 'firebase/firestore';

const MantrasContext = React.createContext()
const mantraRef = collection(db, 'mantras');

function MantrasProvider({children}) {
  const [mantras, setMantras] = React.useState([])

  React.useEffect(() => {
    async function getMantras() {
        const rawMantraData = await getDocs(mantraRef)
        const mantraList = rawMantraData.docs.map(mantra => (mantra.data()))
        setMantras(mantraList);
    }
    getMantras()
  }, [])

  return <MantrasContext.Provider value={mantras}>{children}</MantrasContext.Provider>
}

function useMantraContext() {
  const context = React.useContext(MantrasContext)
  if (context === undefined) {
    throw new Error('useCount must be used within a CountProvider')
  }
  return context
}

export {MantrasProvider, useMantraContext}