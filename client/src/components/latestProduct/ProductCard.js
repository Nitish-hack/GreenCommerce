import Styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/cart";
import toast from "react-hot-toast"; 
import styled from "styled-components"
import { useMediaQuery } from "@material-ui/core";

const ProductCard = ({p,adminProduct}) => {
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery("(max-width: 392px)");
    const [cart, setCart] = useCart();

  return (
    <ProductContainer>
      <ImageContainer>
        <img src={`/api/v1/product/product-photo/${p._id}`} alt={p.name} />
      </ImageContainer>
     
    <h4>{p.name.length > 20 ? `${p.name.slice(0, 20)}...` : p.name}</h4>
      <p>  {p.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}</p>
                      <div className="buttonContainer">
                  {!adminProduct  && <Button
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success("Item Added to cart");
                      }}
                    >
                     {isSmallScreen ? "Add": "Add to Cart"} 
                    </Button>}
                    {!adminProduct  && <Button
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                       {isSmallScreen ? "Details": "More Details"} 
                    </Button>}
                    </div>
    </ProductContainer>
  );
};
export default ProductCard;

const ProductContainer = Styled.div`
width:320px;
text-align:start;
box-shadow:0 5px 25px 2px rgba(0,0,0,0.11);
border-radius:7px;
padding: 1rem .8rem;
cursor: pointer; 
background:white;

@media screen and (max-width:923px){
  width:250px;
}


h4{
  font-size: 1.3em;
padding: .9rem 0.2rem 0;
}
.buttonContainer{
    display:flex;
    
    justify-content:between;
    column-gap:5px;
}

`;
const ImageContainer = Styled.div`
height:350px;
@media screen and (max-width:923px){
  height:270px;
}
@media screen and (max-width:630px){
  height:250px;
}

overflow:hidden;
border-radius:7px;
img {
height:100%;
width:100%;
transition:0.4s ease-in-out;
border-radius:7px;
}
&:hover{
  img{
    transform:scale(1.1);
  }
}
`;

const Button=styled.button`
background:#caaeff;
padding:5px;
border-radius:5px;
width:48%;
font-weight:bold;
font-size:14px;

&:hover{
  background: rgb(255,152,17);
background: linear-gradient(155deg, rgba(255,152,17,1) 21%, rgba(155,105,249,1) 85%);
color:white;
}
`