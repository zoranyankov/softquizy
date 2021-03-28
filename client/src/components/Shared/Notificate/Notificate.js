import './Notificate.css';


const Notificate = ({ children, type }) => {
    if (!children) {
        return null;
    }
    let result = '';

    switch (type) {
        case 'error':
            result = (
                <div className="error">
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