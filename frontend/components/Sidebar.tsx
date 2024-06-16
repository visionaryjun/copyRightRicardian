import Link from 'next/link';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <h2>✅MENU</h2>
      <ul>
        <li>
          <Link href="/">🔎 NFT 저작권 조회</Link>
        </li>
        <li>
          <Link href="/copyright">1️⃣ 저작권 등록</Link>
        </li>
        <li>
          <Link href="/trademark">2️⃣ 상표 등록</Link>
        </li>
        <li>
          <Link href="/design">3️⃣ 디자인 등록</Link>
        </li>
        <li>
          <a href="https://wallet.test.wemix.com/faucet" target="_blank" rel="noopener noreferrer">
            🪙 테스트용 코인 받기
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
