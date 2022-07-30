import { SVGS } from './svgs';
import styles from './SvgIcon.module.css';

interface SvgIconProps {
  type: keyof typeof SVGS;
}

export default function SvgIcon({ type }: SvgIconProps) {
  return <span className={styles.svg}>{SVGS[type]}</span>;
}
