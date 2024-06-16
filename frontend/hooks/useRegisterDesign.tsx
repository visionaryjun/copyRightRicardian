import * as React from 'react';
import { abi_register} from '../src/abi';
import { 
  useWriteContract
} from 'wagmi';

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

