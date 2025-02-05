import React from 'react';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../redux/features/authSlice';

export default function ShowOnLogin({ children }) {
    const isLoggedIn = useSelector(selectIsLoggedIn);

    if (isLoggedIn) {
        return <>{children}</>;
    }
    return null;
}

export const ShowOnLogout = ({ children }) => {
    const isLoggedIn = useSelector(selectIsLoggedIn);

    if (!isLoggedIn) {
        return <>{children}</>;
    }

    return null;
};
