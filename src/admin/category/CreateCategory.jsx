import { Caption, PrimaryButton, Title } from '../../router';
import { commonClassNameOfInput } from '../../components/common/Design';
import { useRedirectLoggedOutUser } from '../../hooks/useRedirectLoggedOutUser';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
    createCategory,
    getAllCategories,
} from '../../redux/features/categorySlice';

export const CreateCategory = () => {
    useRedirectLoggedOutUser('/login');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        setTitle(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setError('');
            await dispatch(createCategory({ title })).unwrap();
            await dispatch(getAllCategories()).unwrap();
            navigate('/category');
        } catch (error) {
            setError('Failed to create category. Please try again.');
        }
    };
    return (
        <>
            <section className="bg-white shadow-s1 p-8 rounded-xl">
                <Title level={5} className=" font-normal mb-5">
                    Create Category
                </Title>
                <form onSubmit={handleSubmit}>
                    <div className="w-full my-8">
                        <Caption className="mb-2">Title *</Caption>
                        <input
                            type="text"
                            className={`${commonClassNameOfInput}`}
                            placeholder="Title"
                            required
                            value={title}
                            onChange={handleInputChange}
                        />
                    </div>

                    <PrimaryButton type="submit" className="rounded-none my-5">
                        CREATE
                    </PrimaryButton>
                </form>
            </section>
        </>
    );
};
