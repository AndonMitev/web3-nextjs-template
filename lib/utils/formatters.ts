import { formatEther } from 'viem';
import { Optional } from '@/lib/types/common';

export const formatAddress = (
  address: Optional<`0x${string}`>,
  sliceIdx = 6
) => {
  if (!address) {
    return '';
  }

  return address.slice(0, sliceIdx) + '...' + address.slice(-sliceIdx);
};

export const formatBalance = (value: Optional<bigint>, sliceIdx = 8) => {
  if (!value) {
    return 0;
  }

  return formatEther(value).toString().slice(0, sliceIdx);
};
