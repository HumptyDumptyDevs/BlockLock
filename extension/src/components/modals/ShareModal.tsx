import React, { useState, useRef } from 'react';
import GenericModal from './GenericModal';
import { useEthereum } from '@src/shared/providers/EthereumContext';
import { getStorageContract } from '@root/utils/utils';
import { ethers } from 'ethers'; // Import ethers

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  secretDomain: string;
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, secretDomain }) => {
  const { signer, connectToMetaMask, isConnected } = useEthereum();
  const [isPending, setIsPending] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [inputError, setInputError] = useState('');
  const inputRef = useRef(null);

  // EVM Address Validation with ethers
  const isValidEvmAddress = address => {
    try {
      ethers.utils.getAddress(address); // Attempt to get a checksummed address
      return true;
    } catch (error) {
      return false;
    }
  };

  const share = async () => {
    console.log('hit share');
    if (!isConnected) {
      await connectToMetaMask();
    } else {
      shareSecret();
    }
  };

  const shareSecret = async () => {
    console.log('hit shareSecret');

    const contract = getStorageContract(signer);
    const address = inputRef.current.value;
    // Address Validation
    if (!isValidEvmAddress(address)) {
      setInputError('Please enter a valid EVM address');
      return;
    } else {
      setInputError('');
    }

    console.log('Address:', address);
    setIsPending(true);
    const tx = await contract.shareSecret(address, secretDomain);
    console.log('TX:', tx);
    const txReceipt = await tx.wait();
    console.log('Transaction Receipt:', txReceipt);

    setIsPending(false);
    setIsConfirmed(true);

    //@ts-ignore
    input.current.value = address;
  };

  return (
    <GenericModal isOpen={isOpen} onClose={onClose} title={`Share password for: ${secretDomain.replace(/^www\./, '')}`}>
      <div className="pt-6">Address</div>
      <div className="pt-2 pb-6 w-full">
        <input
          type="text"
          className="input py-2 h-10 w-full rounded-md bg-text3"
          placeholder="Address"
          ref={inputRef}
        />
        {inputError && <p className="text-red-500 text-xs pt-2">{inputError}</p>}
      </div>
      <div className="flex justify-between gap-4">
        <button
          className="whitespace-nowrap flex items-center justify-center text-center w-full h-full text-primary1 hover:bg-primary2 hover:text-background3 focus:ring-4 focus:ring-primary2 border border-solid border-0.25 border-background5 font-medium rounded text-sm px-5 py-2 focus:outline-none"
          onClick={() => {
            onClose();
          }}>
          Cancel
        </button>
        {!isPending && !isConfirmed ? (
          <button
            className="text-background2 whitespace-nowrap flex items-center justify-between w-full h-full bg-primary1 hover:bg-primary2 focus:ring-4 focus:ring-primary2 font-medium rounded text-sm px-5 py-2 focus:outline-none"
            onClick={() => {
              share();
            }}>
            Share on-chain
            <div className="flex justify-center items-center h-4 my-auto">
              <i className="fa-solid fa-arrow-up-right-from-square w-4 h-4"></i>
            </div>
          </button>
        ) : isPending ? (
          <div className="flex items-center justify-between px-2 py-2 h-full my-auto w-full">
            <div className="text-text1 text-sm flex items-center justify-center gap-6 w-full">
              <span className="align-middle">Processing... </span>
              <span className="loading loading-spinner"></span>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between px-5 py-2 h-full my-auto w-full">
            <div className="text-primary1 whitespace-nowrap text-sm flex justify-between items-center gap-6 w-full">
              <span>Saved</span>
              <i className="fa-duotone fa-check w-4 h-4"></i>
            </div>
          </div>
        )}
      </div>
    </GenericModal>
  );
};

export default ShareModal;
