import { Button } from "@material-ui/core";
import { ICartItemType } from "../App";
import { Wrapper } from "./Item.styles";

type IProps = {
    item: ICartItemType;
    handleAddToCart: (clickedItem: ICartItemType) => void;
}

const Item: React.FC<IProps> = ({ item, handleAddToCart }) => {
    return (
        <Wrapper>
            <img src={item.image} alt={item.title} />
            <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <h3>${item.price}</h3>
            </div>
            <Button onClick={() => handleAddToCart(item)}> Add to cart</Button>
        </Wrapper >

    )
}

export default Item
