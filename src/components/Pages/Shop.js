import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { collection, getDocs } from  'firebase/firestore'
import { db } from  '../Firebase/firebase'



const Shop = (props) => {
    const [products, setProducts] = useState([])
    const { addToCart, getProduct } = props
    console.log(products)
    useEffect(() => {
       
            async function getData(){
                try{
                    const items = []
                    const querySnapshot = await getDocs(collection(db, "Products"));
                    querySnapshot.forEach((doc) => {
                    const item = doc.data()
                    item['id'] = doc.id
                    items.push(item)
                    console.log(item)
                    });
                    
                    if (items.length > 0) {localStorage.setItem("products", JSON.stringify(items))}
                    let getFromLs = localStorage.getItem('products')
                    setProducts(JSON.parse(getFromLs))
                    
                } catch(e){
                console.log(e)
                }
            }getData()
            
    },[]);
    

    return (
        <div>
            <h2 className="text-center text-4xl text-red-500 my-3 font-display font-semibold lg:text-left xl:text-5xl
                    xl:text-bold">Product Catalog</h2>
        <div className="container p-3 md:p-0 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-10 items-start ">
        {products.map( (product) => {
            return(
            <section key={product.id} className=" p-2 py-12 text-left transform duration-500 hover:-translate-y-2 hover:shadow-xl cursor-pointer">
                <Link to="/details" onClick={() => getProduct(product)}>
                <img  className="thumbnail" src={product.product_img} alt=""/>
                </Link>
                <div className="p-3">
                <h2 className="font-semibold mb-2 mt-2 text-cyan-600">Popular Collection</h2>
                <h1 className="xl:text-2xl mb-3 ">{product.title}</h1>
                <h2 className="font-semibold mb-3">GH??? {product.price}</h2>
                <button id="add-to-cart" onClick={() => {addToCart(product, product.id)}} className="p-2 px-6 bg-red-500 mb-9 text-white rounded-md hover:bg-red-600">Add to cart</button>
                </div>
            </section>
            )
        })} 

        </div>
        </div>
     
    )
}


export default Shop

