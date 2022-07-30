import { BsThreeDotsVertical } from 'react-icons/bs';
import Dropdown from '../Dropdown/Dropdown';
import styles from './Table.module.css';

interface TableProps {
  headers: {
    name: string;
    key: string;
    width: string;
    align: 'left' | 'center' | 'right';
  }[];
  data: any[];
  quickActions: {
    name: ({ setOpen }: { setOpen: any }) => Element | JSX.Element;
    onClick: (data: any) => void;
    closeOnClick?: boolean;
  }[];
}

export default function Table({ headers, data, quickActions }: TableProps) {
  return (
    <div className={styles.table}>
      <table>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header.name} style={{ width: header.width }}>
                <div className={styles[header.align]}>{header.name}</div>
              </th>
            ))}
            <th />
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              {headers.map((header) => (
                <td key={header.name} style={{ width: header.width }}>
                  <div className={styles[header.align]}>
                    {row?.components[header.key]}
                  </div>
                </td>
              ))}
              <td>
                <div
                  className={styles['right']}
                  style={{ paddingLeft: '2rem' }}
                >
                  <Dropdown
                    options={quickActions.map((action) => ({
                      ...action,
                      data: row,
                    }))}
                  >
                    <BsThreeDotsVertical />
                  </Dropdown>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
