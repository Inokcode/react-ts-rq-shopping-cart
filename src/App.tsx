import { useState } from 'react';
import { Badge, Drawer, Grid, LinearProgress } from '@material-ui/core';
import { useQuery } from 'react-query';
import Item from "./Item/Item";

//styles
import { Wrapper, StyledButton } from "./App.styles";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';



export type ICartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
}

const getProducts = async (): Promise<ICartItemType[]> =>
  await (await fetch('https://fakestoreapi.com/products')).json();



const App = () => {

  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as ICartItemType[]);
  //
  const { data, isLoading, error } = useQuery<ICartItemType[]>('products', getProducts);
  //console.log(data);

  const getTotalItems = (items: ICartItemType[]) => null;
  const handleAddToCart = (clickedItem: ICartItemType) => null;
  const handleRemoveFromCart = () => null;

  if (isLoading) return <LinearProgress />;
  if (error) return <div>Something went wrong ...</div>;
  return (
    <Wrapper>
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        Cart goes here
      </Drawer>
      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color="error">
          <AddShoppingCartIcon />
        </Badge>
      </StyledButton>
      <Grid container spacing={3}>
        {data?.map((item) => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
}

export default App;
