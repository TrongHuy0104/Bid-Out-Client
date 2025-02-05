import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { getAllCategories } from '../../redux/features/categorySlice';
import { Loader } from './Loader';

export const CategoryDropDown = (props) => {
    const dispatch = useDispatch();
    const { categories, isLoading } = useSelector((state) => state.category);

    useEffect(() => {
        dispatch(getAllCategories());
    }, [dispatch]);

    const allCategories = categories?.map((category) => {
        return {
            label: category?.title,
            value: category?._id,
        };
    });

    const handleChange = (selectedOption) => {
        props.onChange(selectedOption);
    };
    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <Select
                    id="category"
                    onChange={handleChange}
                    options={allCategories}
                    value={props.value}
                />
            )}
        </>
    );
};
