import * as React from 'react';
import { db } from '../config/firebase';
import { getDocs, collection } from 'firebase/firestore';

const MantrasContext = React.createContext()
const mantraRef = collection(db, 'mantras');
const pepRef = collection(db, 'peptalks')

function MantrasProvider({children}) {
  const [mantras, setMantras] = React.useState([])
  const [pepTalks, setPepTalks] = React.useState([])
  const [localVotes, setLocalVotes] = React.useState([])

  
  React.useEffect(() => {
    async function initialize() {
      const rawMantraData = await getDocs(mantraRef)
      const mantraList = rawMantraData.docs.map(mantra => ({...mantra.data(), id: mantra.id}))
      setMantras(mantraList);

      if (!localStorage.getItem('votes')) {
          const initialVotes = mantraList.map(() => ( 0 ))
          localStorage.setItem('votes', JSON.stringify(initialVotes))
          setLocalVotes(initialVotes)
      } else {
          setLocalVotes(JSON.parse(localStorage.getItem('votes')))
      }

      const rawPepTalkData = await getDocs(pepRef)
      const pepTalkList = rawPepTalkData.docs.map(peptalk => ({...peptalk.data(), id: peptalk.id}))
      setPepTalks(pepTalkList)
      
    }

    initialize()
  }, [])

  return <MantrasContext.Provider value={{mantras, localVotes, setLocalVotes, pepTalks}}>{children}</MantrasContext.Provider>
}

function useMantraContext() {
  const context = React.useContext(MantrasContext)
  if (context === undefined) {
    throw new Error('useCount must be used within a CountProvider')
  }
  return context
}

export {MantrasProvider, useMantraContext} 