import { useLocation } from 'react-router-dom';
import { useUserProfile } from '../../../hooks/useUserProfile';
import { Sidebar } from '../../admin/Sidebar';
import { Container } from '../Design';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getUserProfile } from '../../../redux/features/authSlice';

export const DashboardLayout = ({ children }) => {
    const { role, isLoggedIn } = useUserProfile();
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(getUserProfile());
        }
    }, [location, dispatch, isLoggedIn]);

    return (
        <>
            <div className="mt-32">
                <Container className="flex">
                    <div
                        className={`${
                            role === 'admin'
                                ? 'h-[110vh]'
                                : role === 'seller'
                                ? 'h-[80vh]'
                                : 'h-[80vh]'
                        } w-[25%] shadow-s1 py-8 p-5 rounded-lg`}
                    >
                        <Sidebar role={role} />
                    </div>
                    <div className="w-[75%] px-5 ml-10 rounded-lg">
                        {children}
                    </div>
                </Container>
            </div>
        </>
    );
};
