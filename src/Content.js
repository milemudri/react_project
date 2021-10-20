//import {useEfects} from 'react'

import Parent from './Parent'

export default function Content(link){
    return (
        <div className="g-2">
            <Parent selectlink={link}></Parent>
        </div>
    )
}
