import React from 'react';

const defaultInfo = {
    name: '',
    about: '',
    avatar: '',
    _id: ''
}

export const CurrentUserContext = React.createContext(defaultInfo);