import React, { useState } from 'react';
import Layout from '../components/Layout';
import styles from '../styles/Form.module.css';
import { useRegisterDesign } from '../hooks/useRegisterDesign';

const Design = () => {
  const [legalStatus, setLegalStatus] = useState('');
  const registerDesign = useRegisterDesign();

  return (
    <Layout>
      <h1>Design Form</h1>
      <form className={styles.form} id="designForm" onSubmit={registerDesign}>
        <div className={styles.formGroup}>
          <label>디자인 구분 (Design Type):</label>
          <input type="text" name="designType" required />
        </div>

        <div className={styles.formGroup}>
          <label>출원인 성명 (Applicant Name):</label>
          <input type="text" name="applicantName" required />
        </div>

        <div className={styles.formGroup}>
          <label>접수 일자 (Application Date):</label>
          <input type="date" name="applicationDate" required />
        </div>

        <div className={styles.formGroup}>
          <label>전자우편 주소 (Email Address):</label>
          <input type="email" name="email" required />
        </div>

        <div className={styles.formGroup}>
          <label>국적 (Nationality):</label>
          <input type="text" name="nationality" required />
        </div>

        <div className={styles.formGroup}>
          <label>법적 상태 (Legal Status):</label>
          <div>
            <label>
              <input 
                type="radio" 
                name="legalStatus" 
                value="등록 디자인" 
                onChange={(e) => setLegalStatus(e.target.value)} 
                required 
              /> 등록 디자인
            </label>
            <label>
              <input 
                type="radio" 
                name="legalStatus" 
                value="미등록 디자인" 
                onChange={(e) => setLegalStatus(e.target.value)} 
                required
              /> 미등록 디자인
            </label>
          </div>
        </div>

        {legalStatus === '등록 디자인' && (
          <>
            <div className={styles.formGroup}>
              <label>등록국가 (Country of Registration):</label>
              <input type="text" name="registrationCountry" />
            </div>

            <div className={styles.formGroup}>
              <label>등록번호 (Registration Number):</label>
              <input type="text" name="registrationNumber" />
            </div>

            <div className={styles.formGroup}>
              <label>출원일자 (Filing Date):</label>
              <input type="date" name="filingDate" />
            </div>

            <div className={styles.formGroup}>
              <label>등록일자 (Registration Date):</label>
              <input type="date" name="registrationDate" />
            </div>

            <div className={styles.formGroup}>
               <label>출원인 주소지 (Applicant Address):</label>
               <input type="text" name="applicantAddress" required />
            </div>
          </>
        )}
        <button 
          type="submit"
          className={styles.submitButton}
        >register 📥
        </button>
      </form>
    </Layout>
  );
};

export default Design;
