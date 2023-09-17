import { useParams } from 'react-router-dom';


const ProductsPage = () => {
    const params = useParams();

    return (
        <div>
            ProductsPage { JSON.stringify(params) }
        </div>
    );
};

export default ProductsPage;