import {useState,useEffect} from "react"
import Styled from "styled-components";
import ProductCard from "./ProductCard";
import Carousel from "react-elastic-carousel";
import axios from "axios";


const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2, itemsToScroll: 2, pagination: false },
  { width: 850, itemsToShow: 3 },
  { width: 1150, itemsToShow: 4, itemsToScroll: 2 },
  { width: 1450, itemsToShow: 5 },
  { width: 1750, itemsToShow: 6 }
];
const ProductList = () => {
  const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(false);

 const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/get-product`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

useEffect(()=>{
getAllProducts();
},[])

  if(loading){
    return <div>...........Loading</div>;
  }
  return (
    <ItemsContainer>
      <h2>Latest Products</h2>
      <p>Best and Quality Products from us</p>
      <div className="TripsBox">
        <Carousel breakPoints={breakPoints}>
          {products.map((item,index) => (
            <ProductCard
              key={index}
             p={item}
            />
          ))}
        </Carousel>
      </div>
    </ItemsContainer>
  );
};

export default ProductList;
  


const ItemsContainer = Styled.div`
  text-align: center;
    font-family: "Poppins", sans-serif;
   padding:20px;

   p{
    font-weight:bold;
    margin-top:0;
   }
  h2{
    font-size:2.5rem;
    font-weight:bolder;
    letter-spacing:1px
    margin-bottom:5px;
  }

    .TripsBox{
      padding:15px 0px;
    }
    @media screen and (max-width:850px){
      
    }
    `;
