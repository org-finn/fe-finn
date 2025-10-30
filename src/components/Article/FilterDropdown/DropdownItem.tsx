import styled from 'styled-components';

interface DropdownItemProps {
  label: string;
  onClick: () => void;
  isFiltered?: boolean;
  children?: React.ReactNode;
}

export default function DropdownItem({
  label,
  onClick,
  children,
  isFiltered,
}: DropdownItemProps) {
  return (
    <DropdownItems onClick={onClick} $isFiltered={isFiltered}>
      {label}
      {children}
    </DropdownItems>
  );
}

const DropdownItems = styled.div<{
  $isFiltered?: boolean;
}>`
  padding: 10px 16px;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  background-color: ${({ $isFiltered }) =>
    $isFiltered ? '#edf5fd' : '#ffffff'};

  &:hover {
    background-color: ${({ $isFiltered }) =>
      $isFiltered ? '#e3edf7' : '#f0f0f0'};
  }

  @media screen and (max-width: 768px) {
    padding: 12px 12px;
    font-size: 14px;
  }
`;
