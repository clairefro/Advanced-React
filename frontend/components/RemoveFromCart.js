import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from './User';

const REMOVE_FROM_CART_MUTATION = gql`
  mutation removeFromCart($id: ID!) {
    removeFromCart(id: $id) {
      id
    }
  }
`;

const BigButton = styled.button`
  font-size: 3rem;
  background: none;
  border: 0;
  &:hover {
    color: ${props => props.theme.red};
    cursor: pointer;
  }
`;

class RemoveFromCart extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
  };

  // this is called as soon as we get a response back from server on mutation
  update = (cache, payload) => {
    console.log('Running remove from cart cache update', cache)
    // read cache
    const data = cache.readQuery({
      query: CURRENT_USER_QUERY
    });
    // remove item from cache
    const cartItemId = payload.data.removeFromCart.id;
    data.me.cart = data.me.cart.filter(cartItem => cartItem.id !== cartItemId);
    // write back to cache
    cache.writeQuery({ query: CURRENT_USER_QUERY, data: data });
  };

  render() {
    return <Mutation
      mutation={REMOVE_FROM_CART_MUTATION}
      variables={{id: this.props.id}}
      update={this.update}
      optimisticResponse={{
        __typename: 'Mutation'
      }}
      >
    {(removeFromCart, { loading })=>(
      <BigButton
        title="Delete Item"
        disabled={loading}
        onClick={() => {
          removeFromCart().catch(err=>alert(err.message));
        }}>&times;</BigButton>
    )}

    </Mutation>
  }
}

export default RemoveFromCart;
