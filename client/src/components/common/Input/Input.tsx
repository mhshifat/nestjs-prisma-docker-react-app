import { ForwardedRef, forwardRef, InputHTMLAttributes } from 'react';
import Group from '../Group/Group';
import styles from './Input.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: JSX.Element;
  error?: any;
}

function Input(
  { width, icon, error, ...restProps }: InputProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  return (
    <Group direction="column" align="flex-start" width="100%" spacing=".1rem">
      <>
        <div className={styles.input} style={{ width }}>
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
          <input type="text" {...restProps} ref={ref} />
        </div>
        {error && <p className="error">{error}</p>}
      </>
    </Group>
  );
}

export default forwardRef(Input);
