import styled from 'styled-components';

type Props = {
  variant?: 'outline' | 'white' | 'mint' | 'blackOutline' | 'grey';
  size?: 'large' | 'small' | 'responsive';
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ ...props }: Props) {
  return <Wrapper {...props} />;
}

const baseButtonStyle = {
  width: '100%',
  borderRadius: '6px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  transition: 'background-color 200ms',
  border: 'none',
  whiteSpace: 'nowrap',
};

const sizeStyles = (size: Props['size'] = 'responsive') => {
  const largeStyle = {
    height: '60px',
    fontSize: '22px',
  };

  const smallStyle = {
    height: '36px',
    fontSize: '16px',
  };

  if (size === 'large') {
    return largeStyle;
  }

  if (size === 'small') {
    return smallStyle;
  }

  return {
    ...smallStyle,
  };
};

const variantStyles = (variant: Props['variant'] = 'mint') => {
  if (variant === 'outline') {
    return {
      boxShadow: '0 0 0 1px #ffffff inset',
      color: '#ffffff',
      background: 'none',

      '&:hover': {
        backgroundColor: '#1b1a1a',
      },
    };
  }
  if (variant === 'blackOutline') {
    return {
      boxShadow: '0 0 0 1px #000000 inset',
      color: '#000000',
      background: 'none',

      '&:hover': {
        backgroundColor: '#bac5db',
      },
    };
  }

  if (variant === 'white') {
    return {
      color: '#000',
      backgroundColor: '#fff',

      '&:hover': {
        backgroundColor: '#959595',
      },
    };
  }

  if (variant === 'grey') {
    return {
      color: '#ffffff',
      backgroundColor: '#BCC7D9',

      '&:hover': {
        backgroundColor: '#afbcd1',
      },
    };
  }

  return {
    color: '#000',
    backgroundColor: '#0057FF',
    '&:hover': {
      backgroundColor: '#004ce4',
    },
  };
};

const Wrapper = styled.button<Pick<Props, 'variant' | 'size'>>(
  baseButtonStyle,
  ({ size }) => sizeStyles(size),
  ({ variant }) => variantStyles(variant)
);
