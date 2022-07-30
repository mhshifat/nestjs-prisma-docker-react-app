import { ReactElement } from 'react';
import styles from './Group.module.css';

interface GroupProps {
  spacing?: string;
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  justify?: 'center' | 'flex-start' | 'flex-end' | 'space-between';
  align?: 'center' | 'flex-start' | 'flex-end';
  p?: string;
  m?: string;
  width?: string;
  children: ReactElement | ReactElement[];
}

export default function Group({
  children,
  spacing = '1rem',
  direction = 'row',
  justify = 'flex-start',
  align = 'center',
  p,
  m,
  width,
  ...restProps
}: GroupProps) {
  return (
    <div
      className={styles.group}
      style={{
        gap: spacing,
        flexDirection: direction,
        justifyContent: justify,
        alignItems: align,
        padding: p,
        margin: m,
        width,
      }}
      {...restProps}
    >
      {children}
    </div>
  );
}
