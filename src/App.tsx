import { useState } from 'react';
import { Badge, Drawer, Grid, LinearProgress } from '@material-ui/core';
import { useQuery } from 'react-query';
import Item from "./Item/Item";

//styles
import { Wrapper, StyledButton } from "./App.styles";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Cart from './Cart/Cart';



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

  const getTotalItems = (items: ICartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount, 0);

  const handleAddToCart = (clickedItem: ICartItemType) => {

    setCartItems(prev => {
      // check is the item already added in the code
      const isItemInCart = prev.find(item => item.id === clickedItem.id);
      if (isItemInCart) {
        return prev.map((item) => item.id === clickedItem.id ? { ...item, amount: item.amount + 1 } : item)
      }
      //First time item is added
      return [...prev, { ...clickedItem, amount: 1 }];
    })


  };
  const handleRemoveFromCart = (id: number) => {
    setCartItems(prev => prev.reduce((ack, item) => {
      if (item.id === id) {
        if (item.amount === 1) return ack;
        return [...ack, { ...item, amount: item.amount - 1 }]
      } else {
        return [...ack, item];
      }
    }, [] as ICartItemType[])
    );
  };

  if (isLoading) return <LinearProgress />;
  if (error) return <div>Something went wrong ...</div>;
  return (
    <Wrapper>
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart cartItems={cartItems} addToCart={handleAddToCart} removeFromCart={handleRemoveFromCart} />
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
