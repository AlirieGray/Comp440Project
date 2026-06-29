import React, { createContext, useState } from "react"
export const ProjectsContext = createContext(null)

const ItemsContextProvider = ({ children })=> {
    const [items, setItems] = useState<Array<Project>>([])

    return <ProjectsContext.Provider value={{
        items, setItems
    }}>
        {children}
    </ProjectsContext.Provider>
}

export default ItemsContextProvider