import Link from 'next/link';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <h2>✅MENU</h2>
      <ul>
        <li>
          <Link href="/">🔎NFT Copyright Lookup</Link>
        </li>
        <li>
          <Link href="/copyright">1️⃣ Copyright registration</Link>
        </li>
        <li>
          <Link href="/trademark">2️⃣ Trademark registration</Link>
        </li>
        <li>
          <Link href="/design">3️⃣ Register your design</Link>
        </li>
        <li>
          <a href="https://wallet.test.wemix.com/faucet" target="_blank" rel="noopener noreferrer">
            🪙 Get a test coin
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
