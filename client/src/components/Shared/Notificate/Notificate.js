import './Notificate.css';


const Notificate = ({ children, type, maxWidth, maxWidth2 }) => {
    let newErrWidth = maxWidth ? "max-width" : "error";
    newErrWidth = maxWidth2 ? "max-width2" : newErrWidth;
    if (!children) {
        return null;
    }
    let result = '';

    switch (type) {
        case 'error':
            result = (
                <div className={newErrWidth}>
                    {children}
                </div>
            );
            break;
        case 'message':
            result = (
                <div className="message">
                    {children}
                </div>
            );
            break;
        default:
            result = (
                <div className="notify">
                    {children}
                </div>
            );
    }
    return (
        <div className="notification">
            {result}
        </div>
    )
}

export default Notificate;