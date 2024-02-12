'use client';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { formatAddress, formatBalance } from '@/lib/utils/formatters';
import { useAccount, useBalance } from 'wagmi';
import SendTransactionForm from './SendTransactionForm';

export default function CryptoProfileCard() {
  const { address } = useAccount();
  const { data: balance } = useBalance({ address });

  return (
    <Card className='w-1/3'>
      <CardHeader className='text-center'>
        <CardTitle>Profile</CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col gap-4'>
        <Label>{formatAddress(address)}</Label>
        <Label>
          Balance: {formatBalance(balance?.value)} {balance?.symbol}
        </Label>
      </CardContent>
      <CardFooter className='flex flex-col gap-4'>
        <SendTransactionForm />
      </CardFooter>
    </Card>
  );
}
