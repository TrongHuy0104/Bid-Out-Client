import { PrimaryButton } from '../../router';
import {
    Caption,
    commonClassNameOfInput,
    Title,
} from '../../components/common/Design';
import { useRedirectLoggedOutUser } from '../../hooks/useRedirectLoggedOutUser';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import {
    getAllCategories,
    updateCategory,
} from '../../redux/features/categorySlice';

export const UpdateCategory = () => {
    useRedirectLoggedOutUser('/login');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const { isSuccess } = useSelector((state) => state.category);

    const handleInputChange = (e) => {
        setTitle(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            title,
        };

        await dispatch(updateCategory({ formData, id }));
        await dispatch(getAllCategories());
        if (isSuccess) {
            navigate('/category');
        }
    };
    return (
        <>
            <section className="bg-white shadow-s1 p-8 rounded-xl">
                <Title level={5} className=" font-normal mb-5">
                    Update Category
                </Title>

                <form onSubmit={handleSubmit}>
                    <div className="w-full my-8">
                        <Caption className="mb-2">Title *</Caption>
                        <input
                            value={title}
                            onChange={handleInputChange}
                            type="text"
                            name="title"
                            className={`${commonClassNameOfInput}`}
                        />
                    </div>

                    <PrimaryButton type="submit" className="rounded-none my-5">
                        Update
                    </PrimaryButton>
                </form>
            </section>
        </>
    );
};
