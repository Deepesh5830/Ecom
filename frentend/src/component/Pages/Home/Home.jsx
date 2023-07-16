import MainLayout from "../../../layout/MainLayout/MainLayout";
import MetaData from "../metaData/metaData";
import Product from "../product/product";
import "./Home.css";

const product = {
  name: "Blue Tshirt",
  images: [
    {
      url: "https://cdn.shopify.com/s/files/1/0752/6435/products/BLUERABBIT.jpg?v=1645448597",
    },
  ],
  price: "Rs-3000",
  _id: "deepesh",
};

const Home = () => {
  return (
    <MainLayout>
      <>
        <MetaData title="ECOMMERCE" />
        <div className="banner">
          <p>Wellcome to Ecommerce</p>
          <h1>FIND AMAZING PRODUCTS BELOW</h1>

          <a href="#container">
            <button>Scroll</button>
          </a>
        </div>
        <h2 className="homeHeading">Featured Products</h2>
        <div className="container" id="container">
          <Product product={product} />
          <Product product={product} />
          <Product product={product} />
          <Product product={product} />

          <Product product={product} />
          <Product product={product} />
          <Product product={product} />
          <Product product={product} />
        </div>
      </>
    </MainLayout>
  );
};
export default Home;
