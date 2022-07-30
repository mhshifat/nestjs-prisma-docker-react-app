import styles from './Button.module.css';
import { ButtonHTMLAttributes, ForwardedRef, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'primary';
  full?: boolean;
}

function Button(
  { children, full, variant = 'primary', ...restProps }: ButtonProps,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${
        full ? styles.full : ''
      }`}
      type="button"
      {...restProps}
      ref={ref}
    >
      {children}
    </button>
  );
}

export default forwardRef(Button);
