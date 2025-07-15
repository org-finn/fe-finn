import SearchBar from '@/components/common/SearchBar';
import NewsList from '@/components/News/NewsList';
import { NewsDummy } from '@/constants/dummy';
import styled from 'styled-components';

export default function NewsBoardPage() {
  return (
    <Wrapper>
      <SearchBar />
      <NewsList items={NewsDummy} />
    </Wrapper>
  );
}
const Wrapper = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: 50px;
  padding: 16px 0;
`;
