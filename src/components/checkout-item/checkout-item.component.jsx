import { useDispatch, useSelector } from 'react-redux';

import {
  addItemToCart,
  subtractItemFromCart,
  removeItemFromCart,
} from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';

import {
  CheckoutItemContainer,
  ImageContainer,
  BaseSpan,
  Quantity,
  RemoveButton,
  Arrow,
  Value,
} from './checkout-item.styles';

const CheckoutItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;

  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const addCartItem = () => dispatch(addItemToCart(cartItems, cartItem));
  const subtractCartItem = () =>
    dispatch(subtractItemFromCart(cartItems, cartItem));
  const removeCartItem = () =>
    dispatch(removeItemFromCart(cartItems, cartItem));

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={`${name}`} />
      </ImageContainer>
      <BaseSpan>{name}</BaseSpan>
      <Quantity>
        <Arrow onClick={subtractCartItem}>&#10094;</Arrow>
        <Value>{quantity}</Value>
        <Arrow onClick={addCartItem}>&#10095;</Arrow>
      </Quantity>
      <BaseSpan>{price}</BaseSpan>
      <RemoveButton onClick={removeCartItem}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  );
};

export default CheckoutItem;
