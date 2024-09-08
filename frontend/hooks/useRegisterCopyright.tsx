import * as React from 'react';
import { abi_register} from '../src/abi';
import { 
  useWriteContract
} from 'wagmi';

// send Tx
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
    const url = "uploaded link url"; //write uploaded link
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

