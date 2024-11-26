import { Link } from 'react-router-dom';
import './home.css';
import './Banner.css';
import { useEffect, useState } from 'react';
import { product } from '../../assets/data/product';
import Cart from '../Cart/cart';


export function Navigation() {
    const [cartStatus, setCartStatus] = useState(false);

    const handleCartClick = () => {
        setCartStatus(!cartStatus);
    }

    return (
        <div className="nav">
            <img className='logo' src="/assets/logo.png" />

            <div className='other-function'>
                <span>Sign In</span>
                <svg onClick={handleCartClick}
                    xmlns="http://www.w3.org/2000/svg" width="36px" height="36px" viewBox="0 0 24 24" fill="none">
                    <path d="M3.55514 14.2572C2.83668 10.9043 2.47745 9.22793 3.378 8.11397C4.27855 7 5.99302 7 9.42196 7H14.5781C18.0071 7 19.7215 7 20.6221 8.11397C21.5226 9.22793 21.1634 10.9043 20.4449 14.2572L20.0164 16.2572C19.5294 18.5297 19.2859 19.666 18.4608 20.333C17.6357 21 16.4737 21 14.1495 21H9.85053C7.52639 21 6.36432 21 5.53925 20.333C4.71418 19.666 4.47069 18.5297 3.98372 16.2572L3.55514 14.2572Z" stroke="#ffffff" stroke-width="1.5" />
                    <path opacity="0.6" d="M3 11H21" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path opacity="0.6" d="M10 14H14" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path opacity="0.6" d="M18 9L15 3" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path opacity="0.6" d="M6 9L9 3" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </div>
            {cartStatus && <Cart />}
        </div>
    )
}


export function Home() {
    const [searchText, setSearchText] = useState('');
    const [count, setCount] = useState(0);
    const [search, setSearch] = useState('');
    const [searchTerm, setSearchTerm] = useState("");
    const [filterTerm, setFilterTerm] = useState("");
    const [products, setProducts] = useState([]);

    const filteredProducts = product.filter((product) =>
        product.name.toLowerCase().includes(filterTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(filterTerm.toLowerCase())
    );

    // useEffect(() => {
    //     fetch("/products.json")
    //         .then((response) => response.json())
    //         .then((data) => setProducts(data))
    //         .catch((error) => console.error("Error fetching data:", error));
    // }, []);


    const handleSearch = () => {
        setFilterTerm(searchTerm);
    };

    return (
        <div className="home">
            <Navigation onSearch={setSearchText} />
            <div className="intro-header">
                <div className="header">
                    <ul>
                        <li>Discover</li>
                        <li>Category</li>
                        <li>News</li>
                        <li>About</li>
                    </ul>
                </div>
                <div className="intro">
                    <img src="/assets/intro1.jpg" alt="Intro" />
                </div>
            </div>
            <div className="home-main">
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search anything you want ..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="search-icon" onClick={handleSearch}></div>
                </div>
                <div className="product-list">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <div key={product.id} className="product-card">

                                <Link to={`/product/${product.id}`} className="product-link">
                                    <div className="product-image-container">
                                        <img src={product.image} alt={product.name} className="product-image" />
                                    </div>
                                    <h3 className="product-name">{product.name}</h3>
                                    <p className="product-category">{product.category}</p>
                                    <div className="product-info">
                                        <p className="product-status">Available</p>
                                        <p className="product-price">{product.price} VND</p>
                                    </div>
                                </Link>
                            </div>
                        ))
                    ) : (
                        <p>No products found</p>
                    )}
                </div>
            </div>
            <div className="footer">
            </div>
        </div>
    );
}
