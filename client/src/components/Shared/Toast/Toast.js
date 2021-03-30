import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import errorIcon from '../../../assets/error.svg';
import info from '../../../assets/info.svg';

import './Toast.css';

const Toast = ({ toastList, position, autoDelete, dismissTime }) => {

    const [list, setList] = useState(toastList);
    const icon = {
        "Error" : errorIcon,
        "Success" : info,
    };
    const backgroundColor = {
        "Error" : "#d9534f",
        "Success" : "#5cb85c",
    };
    if (toastList.find(m => m.title === "Success")) {
        autoDelete = true;
        dismissTime = 3000;
    }
    if (toastList.find(m => m.title === "Error")) {
        autoDelete = true;
        dismissTime = 10000;
    }


    useEffect(() => {
        setList([...toastList]);
    }, [toastList]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (autoDelete && toastList.length && list.length) {
                deleteToast(toastList[0].id);
            }
        }, dismissTime);

        return () => {
            clearInterval(interval);
        }

        // eslint-disable-next-line
    }, [toastList, autoDelete, dismissTime, list]);

    const deleteToast = id => {
        const listItemIndex = list.findIndex(e => e.id === id);
        const toastListItem = toastList.findIndex(e => e.id === id);
        list.splice(listItemIndex, 1);
        toastList.splice(toastListItem, 1);
        setList([...list]);
    }

    return (
        <div className="toaster-containter">
            <div className={`notification-container ${position}`}>
                {
                    list.map((toast, i) =>
                        <div
                            key={toast.description + i}
                            className={`notification toast ${position}`}
                            style={{ backgroundColor: toast.backgroundColor || backgroundColor[toast.title] }}
                        >
                            <button onClick={() => deleteToast(toast.id)}>
                                X
                            </button>
                            <div className="notification-image">
                                <img src={toast.icon || icon[toast.title]} alt="" />
                            </div>
                            <div>
                                <p className="notification-title">{toast.title}</p>
                                <p className="notification-message">
                                    {toast.description}
                                </p>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

Toast.propTypes = {
    toastList: PropTypes.array.isRequired,
    position: PropTypes.string,
    autoDelete: PropTypes.bool,
    dismissTime: PropTypes.number
}


export default Toast;