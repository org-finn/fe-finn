import styled from 'styled-components';

type KeywordViewProps = {
  positiveKeywords?: string;
  negativeKeywords?: string;
};

export default function KeywordView({
  positiveKeywords,
  negativeKeywords,
}: KeywordViewProps) {
  if (!positiveKeywords && !negativeKeywords) {
    return null;
  }

  return <KeywordSection>{/* keyword */}</KeywordSection>;
}

const KeywordSection = styled.div`
  display: flex;
`;
