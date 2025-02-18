import { myContext } from "./myContext"

export function MyState({children}) {
    const name = "Salina Bajracharya"
  return (
    <myContext.Provider value={{name}}>
       {children}
    </myContext.Provider>
  )
}

