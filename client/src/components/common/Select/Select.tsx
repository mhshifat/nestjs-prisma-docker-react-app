import { ForwardedRef, forwardRef, SelectHTMLAttributes } from 'react';
import Group from '../Group/Group';
import styles from './Select.module.css';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  icon?: JSX.Element;
  width?: string | number;
  options: { label: string; value: string }[];
}

function Select(
  { width, icon, options, ...restProps }: SelectProps,
  ref: ForwardedRef<HTMLSelectElement>,
) {
  return (
    <div className={styles.select} style={{ width }}>
      {icon ? (
        <Group
          direction="column"
          justify="center"
          align="center"
          p="0 0 0 1rem"
        >
          {icon}
        </Group>
      ) : null}{' '}
      <select {...restProps} ref={ref}>
        {options.map((opt) => (
          <option value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}

export default forwardRef(Select);
