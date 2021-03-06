import { Link } from "react-router-dom"


const Home = () => {
    return(
    <div>
    <div className='container'>
     <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
      <div className="col-10 col-sm-8 col-lg-6">
        <img src="./undraw_empty_cart_co35.svg" className="d-block mx-lg-auto img-fluid" alt="svg" loading="lazy" width="700" height="500"/>
      </div>
      <div className="col-lg-6">
        <h1 className="display-5 fw-bold lh-1 mb-3">Shelfmade Online Retail Store</h1>
        <p className="lead mb-4">We are the best online sneaker store out on the market
        at this very moment. We sell only the best and authentic products which are purchased
        directly from their respective factories. We offer great discounts and have the best return policy and prices</p>
        <Link to='/shop' className="d-grid gap-2 d-md-flex justify-content-md-start">
          <button type="button" className="btn btn-outline-secondary btn-lg px-4">Start shopping</button>
        </Link>
      </div>
    </div>
    </div>
    <section className=" mx-auto py-10 md:py-20 antialiased ">
        <h2 className="text-center display-5 fw-bold lh-1 mb-3"> We Provide You With</h2>
        <section className="grid lg:grid-cols-4 2xl:grid-cols-4 grid-cols-1 gap-8">
            <article className="mx-auto max-w-sm pb-8 bg-cover bg-center cursor-pointer transform duration-500 hover:-translate-y-1 shadow-md rounded-xl">
                <img className="mx-auto mb-20 mt-10 w-40" src="https://penpot.app/images/cross-teams.webp" alt=""/>
                <h2 className="text-center text-3xl mt-8 font-bold min-h-18 px-12">
                    High Quality Products
                </h2>
                <p className="m-4 text-lg p-4 leading-relaxed text-center ">
                    Product features and capabilities meant for the different roles in the next-decade team. Say goodbye to the legendary pain of the design silo.
                </p>
            </article>

            <article className="mx-auto max-w-sm pb-8 bg-cover bg-center cursor-pointer transform duration-500 hover:-translate-y-1 shadow-md rounded-xl">
                <img className="mx-auto mb-20 mt-10 w-40" src="https://penpot.app/images/open-standards.webp" alt=""/>
                <h2 className="text-center text-3xl mt-8 font-bold min-h-18 px-12">
                    Super Fast Deliveries
                </h2>
                <p className="m-4 text-lg p-4 leading-relaxed text-center">
                    Using SVG as no other prototyping tool does, Penpot files sport compatibility with most of the vectorial tools, are tech friendly and extremely easy to use in web.
                </p>
            </article>

            <article className="mx-auto max-w-sm pb-8 bg-cover bg-center cursor-pointer transform duration-500 hover:-translate-y-1 shadow-md rounded-xl">
                <img className="mx-auto mb-20 mt-10 w-40" src="https://penpot.app/images/multi-platforms.webp" alt=""/>
                <h2 className="text-center text-3xl mt-8 font-bold min-h-18 px-12">
                    Multiplatform Support
                </h2>
                <p className="m-4 text-lg p-4 leading-relaxed text-center ">
                    Being web based, Penpot is not dependent on operating systems or installations, you will only need to run a modern browser.
                </p>
            </article>

            <article className="mx-auto max-w-sm pb-8 bg-cover bg-center cursor-pointer transform duration-500 hover:-translate-y-1 shadow-md rounded-xl">
                <img className="mx-auto mb-20 mt-10 w-40" src="https://penpot.app/images/open-source.webp" alt=""/>
                <h2 className="text-center text-3xl mt-8 font-bold min-h-18 px-12">
                    Great Customer Support
                </h2>
                <p className="m-4 text-lg p-4 leading-relaxed text-center ">
                    Build for the community and empowered by the community. Extreme adaptability: contributions can range from add-ons and plugins to core functionality.
                </p>
            </article>
        </section>
    </section>
  </div>

    )
}

export default Home
