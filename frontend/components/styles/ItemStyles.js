import styled from 'styled-components';

const Item = styled.div`
  background: white;
  border: 1px solid ${props => props.theme.offWhite};
  box-shadow: ${props => props.theme.bs};
  position: relative;
  display: flex;
  flex-direction: column;
  transition: 0.3s;
  &:hover {
    transform: scale(1.04);
    transition: 0.3s;
  }
  img {
    width: 100%;
    height: 400px;
    object-fit: cover;
    filter: grayscale(100%);
    transition: 0.2s;
  }
  p {
    line-height: 2;
    font-weight: 300;
    flex-grow: 1;
    padding: 0 3rem;
    font-size: 1.5rem;
  }
  .buttonList {
    display: grid;
    margin-top:auto;
    width: 100%;
    border-top: 1px solid ${props => props.theme.lightgrey};
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    grid-gap: 1px;
    background: ${props => props.theme.lightgrey};
    & > * {
      background: white;
      border: 0;
      font-size: 1rem;
      padding: 1rem;
    }
  }
  &:hover img {
    transition: 0.2s;
    filter: grayscale(0);
  }
`;

export default Item;
