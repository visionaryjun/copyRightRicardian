import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import styles from './Layout.module.css';
import { ConnectButton } from '@rainbow-me/rainbowkit';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {

  return (
    <div className={styles.layout}>
      <Sidebar />
      <div className={styles.content}>
        <div className={styles.header}>
            <ConnectButton />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Layout;
