import styles from './Dropdown.module.css';
import { ReactElement, useState } from 'react';

interface DropdownProps {
  children: ReactElement | ReactElement;
  options: {
    name: ({ setOpen }: { setOpen: any }) => Element | JSX.Element;
    onClick: (data: any) => void;
    closeOnClick?: boolean;
    data?: any;
  }[];
}

export default function Dropdown({ children, options }: DropdownProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.dropdown}>
      <div
        className={styles.dropdown__trigger}
        onClick={() => setOpen((value) => !value)}
      >
        {children}
      </div>
      {open && (
        <div className={styles.dropdown__options}>
          {options.map((opt, optIdx) => (
            <span
              key={optIdx}
              onClick={() => {
                opt.onClick(opt.data);
                setOpen(false);
              }}
            >
              {typeof opt.name === 'function'
                ? opt.name?.({ setOpen })
                : (opt.name as any)}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
