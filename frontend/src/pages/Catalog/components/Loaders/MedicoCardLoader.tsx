import React from "react"
import ContentLoader from "react-content-loader"
import { generateList } from "core/utils/list"

const MedicoCardLoader = () => {
    const loaderItems = generateList(3);

    return (
        <>
            {loaderItems.map(item => (
               <ContentLoader 
               key={item}
               speed={1}
               width={250}
               height={335}
               viewBox="0 0 250 335"
               backgroundColor="#ecebeb"
               foregroundColor="#d6d2d2"
               >
               <rect x="0" y="0" rx="10" ry="10" width="250" height="335" />
               </ContentLoader> 
            ))}
        </>
    )
}

export default MedicoCardLoader