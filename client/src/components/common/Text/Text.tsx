import { HTMLAttributes, ReactElement } from 'react';
import styles from './Text.module.css';

interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactElement | ReactElement[];
  size: 'sm' | 'xl';
  center?: boolean;
}

export default function Text({
  children,
  size,
  center,
  ...restProps
}: TextProps) {
  return (
    <p
      className={`${styles.text} ${styles[size]} ${
        center ? styles.center : ''
      }`}
      {...restProps}
    >
      {children}
    </p>
  );
}
