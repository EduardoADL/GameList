import { FC } from 'react'
import './Message.css'
interface ReceivedError {
    text : string
}

const Message: FC<ReceivedError> = ({text}) => {
    return(
        <div className="container-message">
            <p className="text-error">{text}</p>
        </div>
    )
}
export default Message;