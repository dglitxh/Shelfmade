import { Link } from "react-router-dom"
import { products } from "../Products/Products"


const Shop = (props) => {
        const { addToCart, getProduct } = props
        
    return (
        <div>
        <div className="p-5 md:p-0 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-10 items-start ">
        {products.map( (product) => {
            return(
            <section key={product.id} className="p-5 py-12 text-left transform duration-500 hover:-translate-y-2 hover:shadow-2xl cursor-pointer">
                <Link to="/details" onClick={() => {getProduct(product)}}>
                <img height="50px" className="thumbnail" src={product.thumbnail} alt=""/>
                </Link>
                <h2 className="font-semibold mb-2 mt-12 text-cyan-600">Popular Collection</h2>
                <h1 className="text-3xl mb-5 h-16">{product.title}</h1>
                <h2 className="font-semibold mb-5">${product.price}</h2>
                <button id="add-to-cart" onClick={() => {addToCart(product, product.id)}} className="p-2 px-6 bg-red-500 text-white rounded-md hover:bg-red-600">Add To Cart</button>
            </section>
            )
        })} 

        </div>
        </div>
     
    )
}


export default Shop

