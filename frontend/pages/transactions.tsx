import * as React from 'react';
import { abi_register, abi_contratInfos, abi_userContracts, abi_getContractContents, abi_checkContractIdByAddress } from '../src/abi';
import { 
  BaseError, 
  useWaitForTransactionReceipt, 
  useWriteContract,
  useReadContract
} from 'wagmi';
import styles from '../styles/Form.module.css';
import { getAddress } from 'viem'
import { createWalletClient, custom } from 'viem'
import { wemixTestnet } from 'viem/chains'

// send Tx
export function useRegisterDesign() {
  const { writeContract } = useWriteContract();

  async function registerDesign(e: React.FormEvent<HTMLFormElement>) { 
    e.preventDefault();
    const ca = "0xf3B6846802a11a9A5C23E334A4d98b95B82f8602"; //TODO : change CA according to Network
    const formData = new FormData(e.target as HTMLFormElement);
    const designType = formData.get('designType') as string;
    const applicantName = formData.get('applicantName') as string;
    const applicationDate = formData.get('applicationDate') as string;
    const email = formData.get('email') as string;
    const nationality = formData.get('nationality') as string;
    const legalStatus = formData.get('legalStatus') as string;
    const registrationCountry = (formData.get('registrationCountry') as string) || '';
    const registrationNumber = (formData.get('registrationNumber') as string) || '';
    const filingDate = (formData.get('filingDate') as string) || '';
    const registrationDate = (formData.get('registrationDate') as string) || '';
    const applicantAddress = formData.get('applicantAddress') as string;

    const metadataOfDesign = {
      designType,
      applicantName,
      applicationDate,
      email,
      nationality,
      legalStatus,
      registrationCountry,
      registrationNumber,
      filingDate,
      registrationDate,
      applicantAddress
    };

    const metadataString = JSON.stringify(metadataOfDesign);
    console.log("metadataString >>", metadataString);
    const rightType = 1; // this is from enum RightType in smart contract
    const url = "디자인의 실제 도면이 들어간 url"; //write uploaded link
    const hashValue = "0x2c26b46b68ffc68ff99b453c1d30413413422b9926c2a8b9922c97d4c2e1f0b9"; //make hash from url contents

    try {
      const tx = await writeContract({
        address: ca,
        abi: abi_register,
        functionName: 'register',
        args: [rightType, metadataString, url, hashValue],
      });

      console.log("tx >>", tx);
    } catch (err) {
      console.error("Error >>", err);
    }
  }

  return registerDesign;
}

export function useRegisterCopyright() {
  const { writeContract } = useWriteContract();

  async function registerCopyright(e: React.FormEvent<HTMLFormElement>) { 
    e.preventDefault();
    const ca = "0xf3B6846802a11a9A5C23E334A4d98b95B82f8602"; //TODO : change CA according to Network
    const formData = new FormData(e.target as HTMLFormElement);
    const title = formData.get('title') as string;
    const type = formData.get('type') as string;
    const classification = formData.get('classification') as string;
    const authorType = formData.get('authorType') as string;
    const authorName = formData.get('authorName') as string;
    const coAuthorNames = formData.get('coAuthorNames') as string;
    const nationality = formData.get('nationality') as string;
    const creationDate = formData.get('creationDate') as string;
    const isDerivative = formData.get('isDerivative') as string;
    const originalAuthorName = formData.get('originalAuthorName') as string;
    const originalTitle = formData.get('originalTitle') as string;
    const email = formData.get('email') as string;
    const isRegistered = formData.get('isRegistered') as string;
    const registrationNumber = (formData.get('registrationNumber') as string) || '';
    const registrationDate = (formData.get('registrationDate') as string) || '';
    const registrant = (formData.get('registrant') as string) || '';

    const metadataOfCopyright = {
      title,
      type,
      classification,
      authorType,
      authorName,
      coAuthorNames,
      nationality,
      creationDate,
      isDerivative,
      originalAuthorName,
      originalTitle,
      email,
      isRegistered,
      registrationNumber,
      registrationDate,
      registrant,
    };

    const metadataString = JSON.stringify(metadataOfCopyright);
    console.log("metadataString >>", metadataString);
    const rightType = 0; // this is from enum RightType in smart contract
    const url = "저작권의 실제 자료가 들어간 url"; //write uploaded link
    const hashValue = "0x2c26b46b68ffc68ff99b453c1d30413413422b9926c2a8b9922c97d4c2e1f0b9"; //make hash from url contents

    try {
      const tx = await writeContract({
        address: ca,
        abi: abi_register,
        functionName: 'register',
        args: [rightType, metadataString, url, hashValue],
      });

      console.log("tx >>", tx);
    } catch (err) {
      console.error("Error >>", err);
    }
  }

  return registerCopyright;
}

export function useRegisterTrademark() {
  const { writeContract } = useWriteContract();

  async function registerTrademark(e: React.FormEvent<HTMLFormElement>) { 
    e.preventDefault();
    const ca = "0xf3B6846802a11a9A5C23E334A4d98b95B82f8602"; // TODO: change CA according to Network
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get('name') as string;
    const applicationDate = formData.get('applicationDate') as string;
    const email = formData.get('email') as string;
    const nationality = formData.get('nationality') as string;
    const legalStatus = formData.get('legalStatus') as string;
    const registrationCountry = (formData.get('registrationCountry') as string) || '';
    const registrationNumber = (formData.get('registrationNumber') as string) || '';
    const filingDate = (formData.get('filingDate') as string) || '';
    const registrationDate = (formData.get('registrationDate') as string) || '';
    const applicantName = formData.get('applicantName') as string;
    const applicantAddress = formData.get('applicantAddress') as string;

    const metadataOfTrademark = {
      name,
      applicationDate,
      email,
      nationality,
      legalStatus,
      registrationCountry,
      registrationNumber,
      filingDate,
      registrationDate,
      applicantName,
      applicantAddress,
    };

    const metadataString = JSON.stringify(metadataOfTrademark);
    console.log("metadataString >>", metadataString);
    const rightType = 2; // this is from enum RightType in smart contract
    const url = "상표의 실제 자료가 들어간 url"; // write uploaded link
    const hashValue = "0x2c26b46b68ffc68ff99b453c1d30413413422b9926c2a8b9922c97d4c2e1f0b9"; // make hash from url contents

    try {
      const tx = await writeContract({
        address: ca,
        abi: abi_register,
        functionName: 'register',
        args: [rightType, metadataString, url, hashValue],
      });

      console.log("tx >>", tx);
    } catch (err) {
      console.error("Error >>", err);
    }
  }

  return registerTrademark;
}

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

export function GetDesignInfos() {
  const [data, setData] = React.useState<any>(null);
  const [designId, setDesignId] = React.useState('0');

  const ca = "0xf3B6846802a11a9A5C23E334A4d98b95B82f8602"; //TODO : change CA according to Network

  const { data: contractInfoData } = useReadContract({
    address: ca,
    abi: abi_getContractContents,
    functionName: 'getContractContents',
    args: [BigInt(designId)],
  });

  console.log("contractInfoData >>", contractInfoData);

  const handleReadData = () => {
    setData(contractInfoData);
  };

  const renderHumanReadableData = (data: any) => {
    if (!data) return null;
    console.log("data >>", data[2])
    if(!data[2]) {
      return (
        <div>
          <p><strong>등록되지 않은 번호입니다.</strong></p>
        </div>
      )
    } else {
      const contents = JSON.parse(data[2]);
      return (
        <div>
          <h3>Contract Data</h3>
          <div>
            <p><strong>Right Type:</strong> {data[0]}</p>
            <p><strong>Author:</strong> {data[1]}</p>
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
            <p><strong>URL:</strong> {data[3]}</p>
            <p><strong>Contents Hash:</strong> {data[4]}</p>
            <p><strong>Updated Blocknumber:</strong> {data[5].toString()}</p>
          </div>
        </div>
      );
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="0"
        value={designId}
        onChange={(e) => setDesignId(e.target.value)}
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