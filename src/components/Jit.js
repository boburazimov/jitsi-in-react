import React, {useState} from 'react';
import {Jutsu} from 'react-jutsu';
import importScript from "./importScript";

const Jit = (props) => {

    importScript("https://meet.jit.si/external_api.js");

    const {userName, roomName, handleStartMeeting, handleClose} = props;

    const [call, setCall] = useState(false)
    const [password, setPassword] = useState('')
    const [close, setClose] = useState(false)
    const link = 'https://meet.jit.si/' + roomName;

    const handleClick = event => {
        event.preventDefault()
        if (roomName && userName && link) setCall(true)
        handleStartMeeting(roomName, userName, password, link);
    }

    const onCloseButton = () => {
        handleClose()
        setPassword('')
        setCall(false);
        setClose(true);
    }

    const handleCopyLink = () => {
        navigator.clipboard.writeText(link).then(() => alert("Copied link: " + link))
    }

    return call ? (
        <div aria-hidden={close}>
            <div>
                <div className="input-group mb-3 d-inline-flex align-content-center align-items-center text-center" style={{width: '350px'}}>
                    <input id="linkText" type="text" className="form-control" placeholder="Link for join to meeting"
                           aria-label="Link for join to meeting" aria-describedby="button-addon2" defaultValue={link} readOnly/>
                        <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={handleCopyLink}>copy</button>
                </div>
                { password ? <p>Password: <span>{password}</span></p> : <p>Not protected</p>}
            </div>
            <Jutsu
                roomName={roomName}
                containerStyles={{width: '900px', height: '600px'}}
                displayName={userName}
                password={password}
                onMeetingEnd={() => onCloseButton()}
                loadingComponent={<p>loading ...</p>}
                errorComponent={<p>Oops, something went wrong</p>}
                configOverwrite={{prejoinPageEnabled: false, startWithAudioMuted: true, startWithVideoMuted: true}}
            />
        </div>
    ) : (
        <form>
            <input id='password' type='text' placeholder='Password (optional)' value={password}
                   onChange={(e) => setPassword(e.target.value)}/>
            <button onClick={handleClick} type='submit'>Start video-meeting</button>
        </form>
    )
}

export default Jit;