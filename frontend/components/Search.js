import React, { Component } from 'react';
import Downshift from 'downshift';
import Router from 'next/router';
import { ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import debounce from 'lodash.debounce';
import { DropDown, DropDownItem, SearchStyles } from './styles/DropDown';


const SEARCH_ITEMS_QUERY = gql`
  query SEARCH_ITEMS_QUERY($searchTerm: String!) {
    items(where: {
      OR: [
        { title_contains: $searchTerm },
        { description_contains: $searchTerm}
      ]
    }) {
      id
      image
      title
    }
  }
`;

class Search extends Component {
  state = {
    items: [],
    loading: false,
  }
  // manually query apollo client
  onChange = debounce(async (e, client) => {
    console.log('Searching...');
    this.setState({ loading: true });
    const res = await client.query({
      query: SEARCH_ITEMS_QUERY,
      variables: { searchTerm: e.target.value }
    });
    this.setState({
      items: res.data.items,
      loading: false,
    });
  }, 350);

  render() {
    return (
      <SearchStyles>
        <div>
          <ApolloConsumer>
            {(client) => (
              <input type="search" onChange={(e) => {
                e.persist();
                this.onChange(e, client);
              }}/>
            )}
          </ApolloConsumer>
          <DropDown>
            {this.state.items.map(item => {
              return (
                <DropDownItem key={item.id}>
                  <img width="50px" src={item.image} alt={item.title}/>
                  {item.title}
                </DropDownItem>
              );
            })}
          </DropDown>
        </div>
      </SearchStyles>
    );
  }
}

export default Search;
