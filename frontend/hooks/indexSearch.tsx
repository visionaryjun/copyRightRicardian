import * as React from 'react';
import { abi_getContractContents, abi_checkContractIdByAddress } from '../src/abi';
import { 
  useReadContract
} from 'wagmi';
import styles from '../styles/Form.module.css';
import { getAddress } from 'viem'

// read tx
export function CheckContractIdByAddress() {
  const [address, setAddress] = React.useState('0xc89CC160A4B3d79F3162C99fd2467f5B706f8f8E');
  const [data, setData] = React.useState<any>(null);

  const ca = "0xf3B6846802a11a9A5C23E334A4d98b95B82f8602"; //TODO: change CA according to Network

  const { data: contractInfos, isError, isLoading } = useReadContract({
    address: ca,
    abi: abi_checkContractIdByAddress,
    functionName: 'checkContractIdByAddress',
    args: [getAddress(address)],
  });

  React.useEffect(() => {
    console.log('contractInfos useEffect:', contractInfos);
    if (contractInfos) {
      setData(contractInfos);
    }
  }, [contractInfos]);

  const handleReadData = () => {
    console.log('handleReadData called');
    console.log('isError:', isError);
    console.log('isLoading:', isLoading);
    console.log('contractInfos:', contractInfos);

    if (isError) {
      console.error('Error fetching contract info:', isError);
      return;
    }

    if (isLoading) {
      console.log('Loading contract info...');
      return;
    }

    if (contractInfos) {
      setData(contractInfos);
    }
  };

  const renderHumanReadableData = (data: any) => {
    if (!data) {
      return (
        <div>
          <p><strong>해당 사용자는 저작권을 등록하지 않았습니다.</strong></p>
        </div>
      );
    }

    if (Array.isArray(data) && data.length === 0) {
      return (
        <div>
          <p><strong>해당 사용자는 저작권을 등록하지 있지 않습니다.</strong></p>
        </div>
      );
    }

    return (
      <div>
        <h3>해당 사용자가 보유한 저작권 번호</h3>
        <div>
          {data.map((contractId: any, index: number) => (
            <p key={index}><strong> 저작권 번호:</strong> {contractId.toString()}</p>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      <input
        type="text"
        placeholder="0xaC17421fa07A6D6E424A56c3B8b86F4eD3a4C864"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button
        onClick={handleReadData}
        className={styles.submitButton}
      > 지갑주소로 보유한 저작권 찾기 📤
      </button>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error fetching data. Please try again.</p>}
      {renderHumanReadableData(data)}
    </div>
  );
}


export function GetContractInfos() {
  const [data, setData] = React.useState<any>(null);
  const [contractId, setContractId] = React.useState('0');
  const ca = "0xf3B6846802a11a9A5C23E334A4d98b95B82f8602"; //TODO : change CA according to Network

  const { data: contractInfoData } = useReadContract({
    address: ca,
    abi: abi_getContractContents,
    functionName: 'getContractContents',
    args: [BigInt(contractId)],
  });

  const handleReadData = () => {
    setData(contractInfoData);
  };

  const renderHumanReadableData = (data: any) => {
    if (!data) return null;
    if (!data[2]) return null;
    const rightType = data[0];
    const author = data[1];
    const contents = JSON.parse(data[2]);
    const url = data[3];
    const contentsHash = data[4];
    const updatedBlocknumber = data[5].toString();

    switch (rightType) {
      case 0: // CopyRight
        return (
          <div>
            <h3>Contract Data - CopyRight</h3>
            <p><strong>Right Type:</strong> {rightType}</p>
            <p><strong>Author:</strong> {author}</p>
            <p><strong>Title:</strong> {contents.title}</p>
            <p><strong>Type:</strong> {contents.type}</p>
            <p><strong>Classification:</strong> {contents.classification}</p>
            <p><strong>Author Type:</strong> {contents.authorType}</p>
            <p><strong>Author Name:</strong> {contents.authorName}</p>
            {contents.coAuthorNames && <p><strong>Co-Author Names:</strong> {contents.coAuthorNames}</p>}
            <p><strong>Nationality:</strong> {contents.nationality}</p>
            <p><strong>Creation Date:</strong> {contents.creationDate}</p>
            <p><strong>Is Derivative:</strong> {contents.isDerivative}</p>
            {contents.originalAuthorName && <p><strong>Original Author Name:</strong> {contents.originalAuthorName}</p>}
            {contents.originalTitle && <p><strong>Original Title:</strong> {contents.originalTitle}</p>}
            <p><strong>Email:</strong> {contents.email}</p>
            <p><strong>Is Registered:</strong> {contents.isRegistered}</p>
            {contents.registrationNumber && <p><strong>Registration Number:</strong> {contents.registrationNumber}</p>}
            {contents.registrationDate && <p><strong>Registration Date:</strong> {contents.registrationDate}</p>}
            {contents.registrant && <p><strong>Registrant:</strong> {contents.registrant}</p>}
            <p><strong>URL:</strong> {url}</p>
            <p><strong>Contents Hash:</strong> {contentsHash}</p>
            <p><strong>Updated Blocknumber:</strong> {updatedBlocknumber}</p>
          </div>
        );
      case 1: // Design
        return (
          <div>
            <h3>Contract Data - Design</h3>
            <p><strong>Right Type:</strong> {rightType}</p>
            <p><strong>Author:</strong> {author}</p>
            <p><strong>Design Type:</strong> {contents.designType}</p>
            <p><strong>Applicant Name:</strong> {contents.applicantName}</p>
            <p><strong>Application Date:</strong> {contents.applicationDate}</p>
            <p><strong>Email:</strong> {contents.email}</p>
            <p><strong>Nationality:</strong> {contents.nationality}</p>
            <p><strong>Legal Status:</strong> {contents.legalStatus}</p>
            {contents.registrationCountry && <p><strong>Country of Registration:</strong> {contents.registrationCountry}</p>}
            {contents.registrationNumber && <p><strong>Registration Number:</strong> {contents.registrationNumber}</p>}
            {contents.filingDate && <p><strong>Filing Date:</strong> {contents.filingDate}</p>}
            {contents.registrationDate && <p><strong>Registration Date:</strong> {contents.registrationDate}</p>}
            <p><strong>Applicant Address:</strong> {contents.applicantAddress}</p>
            <p><strong>URL:</strong> {url}</p>
            <p><strong>Contents Hash:</strong> {contentsHash}</p>
            <p><strong>Updated Blocknumber:</strong> {updatedBlocknumber}</p>
          </div>
        );
      case 2: // TradeMark
        return (
          <div>
            <h3>Contract Data - TradeMark</h3>
            <p><strong>Right Type:</strong> {rightType}</p>
            <p><strong>Author:</strong> {author}</p>
            <p><strong>Name:</strong> {contents.name}</p>
            <p><strong>Application Date:</strong> {contents.applicationDate}</p>
            <p><strong>Email:</strong> {contents.email}</p>
            <p><strong>Nationality:</strong> {contents.nationality}</p>
            <p><strong>Legal Status:</strong> {contents.legalStatus}</p>
            {contents.registrationCountry && <p><strong>Country of Registration:</strong> {contents.registrationCountry}</p>}
            {contents.registrationNumber && <p><strong>Registration Number:</strong> {contents.registrationNumber}</p>}
            {contents.filingDate && <p><strong>Filing Date:</strong> {contents.filingDate}</p>}
            {contents.registrationDate && <p><strong>Registration Date:</strong> {contents.registrationDate}</p>}
            <p><strong>Applicant Name:</strong> {contents.applicantName}</p>
            <p><strong>Applicant Address:</strong> {contents.applicantAddress}</p>
            <p><strong>URL:</strong> {url}</p>
            <p><strong>Contents Hash:</strong> {contentsHash}</p>
            <p><strong>Updated Blocknumber:</strong> {updatedBlocknumber}</p>
          </div>
        );
      default:
        return (
          <div>
            <p><strong>Unknown Right Type:</strong> {rightType}</p>
          </div>
        );
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter Contract ID"
        value={contractId}
        onChange={(e) => setContractId(e.target.value)}
      />
      <button
        onClick={handleReadData}
        className={styles.submitButton}
      >
        Check contract contents from ID 📤
      </button>
      {renderHumanReadableData(data)}
    </div>
  );
}