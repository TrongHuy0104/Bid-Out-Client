import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const useRedirectLoggedOutUser = (path) => {
    const navigate = useNavigate();
    const { isLoggedIn } = useSelector((state) => state.auth);

    useEffect(() => {
        const redirectLoggedOutUser = async () => {
            if (!isLoggedIn) {
                navigate(path);
                return;
            }
        };
        redirectLoggedOutUser();
    }, [path, navigate, isLoggedIn]);
};
