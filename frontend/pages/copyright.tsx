import React, { useState } from 'react';
import Layout from '../components/Layout';
import styles from '../styles/Form.module.css';
import { useRegisterCopyright } from '../hooks/useRegisterCopyright';

const Copyright = () => {
  const [isRegistered, setIsRegistered] = useState('');
  const [isDerivative, setIsDerivative] = useState('');
  const registerCopyright = useRegisterCopyright();

  const handleIsRegisteredChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsRegistered(event.target.value);
  };

  const handleIsDerivativeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsDerivative(event.target.value);
  };

  return (
    <Layout>
      <h1>Copyright Form</h1>
      <form className={styles.form} id="copyrightForm" onSubmit={registerCopyright}>
        <div className={styles.formGroup}>
          <label>Title (제목):</label>
          <input type="text" name="title" required />
        </div>
        <div className={styles.formGroup}>
          <label>Type (종류):</label>
          <input type="text" name="type" required />
        </div>
        <div className={styles.formGroup}>
          <label>Classification (저작물 구분):</label>
          <div>
            <label><input type="radio" name="classification" value="일반 저작물" /> 일반 저작물</label>
            <label><input type="radio" name="classification" value="업무상 저작물" /> 업무상 저작물</label>
            <label><input type="radio" name="classification" value="공동 저작물" /> 공동 저작물</label>
          </div>
        </div>
        <div className={styles.formGroup}>
          <label>Author Type (저작자 구분):</label>
          <div>
            <label><input type="radio" name="authorType" value="개인 저작" /> 개인 저작</label>
            <label><input type="radio" name="authorType" value="업무상 저작" /> 업무상 저작</label>
            <label><input type="radio" name="authorType" value="공동 저작" /> 공동 저작</label>
            <label><input type="radio" name="authorType" value="저작인접자" /> 저작인접자</label>
          </div>
        </div>
        <div className={styles.formGroup}>
          <label>Author Name (저작자 성명):</label>
          <input type="text" name="authorName" required />
        </div>
        <div className={styles.formGroup}>
          <label>Co-Author Names (공동저작자 성명):</label>
          <input type="text" name="coAuthorNames" />
        </div>
        <div className={styles.formGroup}>
          <label>Nationality (국적):</label>
          <input type="text" name="nationality" required />
        </div>
        <div className={styles.formGroup}>
          <label>Creation Date (창작일):</label>
          <input type="date" name="creationDate" required />
        </div>
        <div className={styles.formGroup}>
          <label>Is Derivative (2차적 저작물 여부):</label>
          <div>
            <label>
              <input 
                type="radio" 
                name="isDerivative" 
                value="Yes" 
                onChange={handleIsDerivativeChange} 
                required
              /> Yes
            </label>
            <label>
              <input 
                type="radio" 
                name="isDerivative" 
                value="No" 
                onChange={handleIsDerivativeChange} 
                required
              /> No
            </label>
          </div>
        </div>

        {isDerivative === 'Yes' && (
          <>
            <div className={styles.formGroup}>
              <label>Original Author Name (원저작물 저작자 성명):</label>
              <input type="text" name="originalAuthorName" />
            </div>
            <div className={styles.formGroup}>
              <label>Original Title (원저작물 제목):</label>
              <input type="text" name="originalTitle" />
            </div>
            <div className={styles.formGroup}>
              <label>Email (전자우편주소):</label>
              <input type="email" name="email" />
            </div>
          </>
        )}

        <div className={styles.formGroup}>
          <label>Is Copyright Registered (저작권 기등록여부):</label>
          <div>
            <label>
              <input 
                type="radio" 
                name="isRegistered" 
                value="Yes" 
                onChange={handleIsRegisteredChange} 
              /> Yes
            </label>
            <label>
              <input 
                type="radio" 
                name="isRegistered" 
                value="No" 
                onChange={handleIsRegisteredChange} 
              /> No
            </label>
          </div>
        </div>

        {isRegistered === 'Yes' && (
          <>
            <div className={styles.formGroup}>
              <label>Registration Number (등록번호):</label>
              <input type="text" name="registrationNumber" />
            </div>
            <div className={styles.formGroup}>
              <label>Registration Date (등록일자):</label>
              <input type="date" name="registrationDate" />
            </div>
            <div className={styles.formGroup}>
              <label>Registrant (등록권리자):</label>
              <input type="text" name="registrant" />
            </div>
          </>
        )}
        <button type="submit" className={styles.submitButton}>Submit</button>
      </form>
    </Layout>
  );
};

export default Copyright;
