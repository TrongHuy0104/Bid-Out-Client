import { PrimaryButton, Caption, Title, Loader } from '../../router';
import { commonClassNameOfInput } from '../../components/common/Design';
import { useRedirectLoggedOutUser } from '../../hooks/useRedirectLoggedOutUser';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
    getAllProducts,
    getProduct,
    selectProduct,
    updateProduct,
} from '../../redux/features/productSlice';

const initialState = {
    title: '',
    description: '',
    price: '',
    height: '',
    lengthpic: '',
    width: '',
    mediumused: '',
    weigth: '',
    category: null,
};

export const ProductEdit = () => {
    useRedirectLoggedOutUser('/login');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const productEdit = useSelector(selectProduct);
    const { isLoading } = useSelector((state) => state.product);
    const [product, setProduct] = useState(productEdit);
    const [productImage, setProductImage] = useState('');
    const [imagePreview, setImagePreview] = useState(null);

    const { isSuccess } = useSelector((state) => state.product);

    useEffect(() => {
        dispatch(getProduct(id));
    }, [dispatch, id]);

    useEffect(() => {
        setProduct(productEdit);
        setImagePreview(
            productEdit && productEdit.image
                ? `${productEdit.image.filePath}`
                : null
        );
    }, [productEdit]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleImageChange = (e) => {
        setProductImage(e.target.files[0]);
        setImagePreview(URL.createObjectURL(e.target.files[0]));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', product?.title);
        formData.append('price', product?.price);
        formData.append('lengthpic', product?.lengthpic);
        formData.append('height', product?.height);
        formData.append('width', product?.width);
        formData.append('mediumused', product?.mediumused);
        formData.append('weigth', product?.weigth);
        formData.append('description', product?.description);
        if (productImage) {
            formData.append('image', productImage);
        }

        await dispatch(updateProduct({ id, formData }));
        dispatch(getAllProducts());
        if (isSuccess) {
            navigate('/product');
        }
    };
    return (
        <>
            {isLoading && <Loader />}
            <section className="bg-white shadow-s1 p-8 rounded-xl">
                <Title level={5} className=" font-normal mb-5">
                    Update Product
                </Title>
                <hr className="my-5" />
                <form onSubmit={handleSubmit}>
                    <div className="w-full">
                        <Caption className="mb-2">Title *</Caption>
                        <input
                            type="text"
                            name="title"
                            className={`${commonClassNameOfInput}`}
                            placeholder="Title"
                            required
                            value={product?.title}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="flex items-center gap-5 my-4">
                        <div className="w-1/2">
                            <Caption className="mb-2">Height (cm) </Caption>
                            <input
                                type="number"
                                name="height"
                                placeholder="height"
                                className={`${commonClassNameOfInput}`}
                                value={product?.height}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="w-1/2">
                            <Caption className="mb-2">Length (cm) </Caption>
                            <input
                                type="number"
                                name="lengthpic"
                                placeholder="Length"
                                className={`${commonClassNameOfInput}`}
                                value={product?.lengthpic}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-5 my-4">
                        <div className="w-1/2">
                            <Caption className="mb-2">Width (cm) </Caption>
                            <input
                                type="number"
                                name="width"
                                placeholder="width"
                                className={`${commonClassNameOfInput}`}
                                value={product?.width}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="w-1/2">
                            <Caption className="mb-2">
                                Medium used{' '}
                                <span className=" text-purple-400 italic">
                                    (Typically, pencil, ink, charcoal or other)
                                </span>
                            </Caption>
                            <input
                                type="text"
                                name="mediumused"
                                placeholder="Medium used"
                                className={commonClassNameOfInput}
                                value={product?.mediumused}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-5 mt-4">
                        <div className="w-1/2">
                            <Caption className="mb-2">
                                Weight of piece{' '}
                                <span className=" text-purple-400 italic">
                                    (kg)
                                </span>
                            </Caption>
                            <input
                                type="number"
                                name="weigth"
                                placeholder="weigth"
                                className={`${commonClassNameOfInput}`}
                                value={product?.weigth}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="w-1/2">
                            <Caption className="mb-2">Price Range*</Caption>
                            <input
                                type="number"
                                name="price"
                                className={`${commonClassNameOfInput}`}
                                placeholder="Price"
                                required
                                value={product?.price}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div>
                        <Caption className="mb-2">Description *</Caption>
                        <textarea
                            name="description"
                            className={`${commonClassNameOfInput}`}
                            cols="30"
                            rows="5"
                            value={product?.description}
                            onChange={handleInputChange}
                        ></textarea>
                    </div>
                    <div>
                        <Caption className="mb-2">Image </Caption>
                        <input
                            type="file"
                            className={`${commonClassNameOfInput}`}
                            name="image"
                            onChange={(e) => handleImageChange(e)}
                        />
                        {imagePreview !== null ? (
                            <div>
                                <img
                                    src={
                                        imagePreview ||
                                        URL.createObjectURL(
                                            product?.image.filePath
                                        )
                                    }
                                    alt=""
                                    className="mt-5 rounded-lg w-48 h-48 object-cover"
                                />
                            </div>
                        ) : (
                            <p>No image set for this product</p>
                        )}
                    </div>
                    <PrimaryButton type="submit" className="rounded-none my-5">
                        Update
                    </PrimaryButton>
                </form>
            </section>
        </>
    );
};
