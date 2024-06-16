import React, { useState } from 'react';
import Layout from '../components/Layout';
import styles from '../styles/Form.module.css';
import { useRegisterTrademark } from '../hooks/useRegisterTrademark';

const Trademark = () => {
  const [legalStatus, setLegalStatus] = useState('');
  const registerTrademark = useRegisterTrademark();

  return (
    <Layout>
      <h1>Trademark Form</h1>
      <form className={styles.form} id="trademarkForm" onSubmit={registerTrademark}>
        <div className={styles.formGroup}>
          <label>Name (출원인 성명):</label>
          <input type="text" name="name" required />
        </div>
        <div className={styles.formGroup}>
          <label>Application Date (접수 일자):</label>
          <input type="date" name="applicationDate" required />
        </div>
        <div className={styles.formGroup}>
          <label>Email (전자우편 주소):</label>
          <input type="email" name="email" required />
        </div>
        <div className={styles.formGroup}>
          <label>Nationality (국적):</label>
          <input type="text" name="nationality" required />
        </div>
        <div className={styles.formGroup}>
          <label>Legal Status (법적 상태):</label>
          <div>
            <label>
              <input 
                type="radio" 
                name="legalStatus" 
                value="등록상표" 
                onChange={(e) => setLegalStatus(e.target.value)} 
                required 
              /> 등록상표
            </label>
            <label>
              <input 
                type="radio" 
                name="legalStatus" 
                value="미등록상표" 
                onChange={(e) => setLegalStatus(e.target.value)} 
                required
              /> 미등록상표
            </label>
          </div>
        </div>

        {legalStatus === '등록상표' && (
          <>
            <div className={styles.formGroup}>
              <label>Country of Registration (등록국가):</label>
              <input type="text" name="registrationCountry" />
            </div>
            <div className={styles.formGroup}>
              <label>Registration Number (등록번호):</label>
              <input type="text" name="registrationNumber" />
            </div>
            <div className={styles.formGroup}>
              <label>Filing Date (출원일자):</label>
              <input type="date" name="filingDate" />
            </div>
            <div className={styles.formGroup}>
              <label>Registration Date (등록일자):</label>
              <input type="date" name="registrationDate" />
            </div>
            <div className={styles.formGroup}>
                <label>Applicant Name (출원인 성명):</label>
                <input type="text" name="applicantName" required />
            </div>
            <div className={styles.formGroup}>
                <label>Applicant Address (출원인 주소지):</label>
                <input type="text" name="applicantAddress" required />
            </div>
          </>
        )}

        <button type="submit" className={styles.submitButton}>Submit</button>
      </form>
    </Layout>
  );
};

export default Trademark;
