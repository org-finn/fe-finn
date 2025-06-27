import styled from 'styled-components';
import { IoIosSearch } from 'react-icons/io';

export default function SearchBar() {
  return (
    <Wrapper>
      <Input type="text" placeholder="종목을 검색해주세요!" />
      <SearchIcon
        size={24}
        color="#363636"
        role="button"
        aria-label="search icon"
      />
    </Wrapper>
  );
}
const Wrapper = styled.div`
  width: 100%;
  border-radius: 32px;
  border: 1px solid #787878;
  background-color: none;
  display: flex;
  align-items: center;
`;
const Input = styled.input`
  width: 100%;
  border: none;
  background: transparent;
  padding: 12px 14px;
  &::placeholder {
    color: #939393;
  }
  &:focus {
    outline: none;
  }
`;
const SearchIcon = styled(IoIosSearch)`
  padding: 0px 14px;
  cursor: pointer;
`;
