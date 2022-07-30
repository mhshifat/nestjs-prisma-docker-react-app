import styles from './Modal.module.css';
import { cloneElement, ReactElement, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { BiDockLeft } from 'react-icons/bi';
import { FaTimes } from 'react-icons/fa';

interface ModalProps {
  children?: ReactElement | ReactElement[];
  body: ({ setOpen }: { setOpen: any }) => Element | JSX.Element;
  title?: string;
  description?: string;
  onClick?: () => void;
  onClose?: () => void;
  open?: boolean;
}

export default function Modal({
  children,
  body,
  title,
  description,
  onClick,
  open: propsOpen,
  onClose,
}: ModalProps) {
  const [open, setOpen] = useState(propsOpen || false);

  useEffect(() => {
    setOpen(propsOpen || false);
  }, [propsOpen]);

  return (
    <>
      {children &&
        cloneElement(children as any, {
          onClick: () => {
            setOpen(true);
            onClick?.();
          },
        })}
      {open &&
        createPortal(
          <div className={styles.modal}>
            <div className={styles.modal__wrapper}>
              <div className={styles.modal__header}>
                <div>
                  <BiDockLeft />
                </div>
                <div>
                  <h2>{title || 'Show somethging'}</h2>
                  <p>{description || 'Show somethging'}</p>
                </div>
                <div>
                  <FaTimes
                    onClick={() => {
                      setOpen(false);
                      onClose?.();
                    }}
                  />
                </div>
              </div>
              {typeof body === 'function' ? body({ setOpen }) : (body as any)}
            </div>
          </div>,
          document.getElementById('modal')!,
        )}
    </>
  );
}
