import styled from 'styled-components';

import { Text, type IText } from './Text';

export interface IParagraph extends IText {
  children: React.ReactNode;
}

const ParagraphStyled = styled.p`
  margin: 0;
`;

export function Paragraph({ size, weight, variant, children }: IParagraph) {
  return (
    <ParagraphStyled>
      <Text size={size} weight={weight} variant={variant}>
        {children}
      </Text>
    </ParagraphStyled>
  );
}
