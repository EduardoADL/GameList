import { FC } from 'react'
import './Loading.css'
const Loading: FC = () => {
    return(
        <div className='loading-animation'>
            <div className="loading-spinner"></div>
        </div>
    )
}
export default Loading;