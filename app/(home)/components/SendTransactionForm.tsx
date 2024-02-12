import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { isAddress, parseEther } from 'viem';
import {
  useAccount,
  useBalance,
  useSendTransaction,
  useWaitForTransactionReceipt
} from 'wagmi';
import { useEffect } from 'react';
import { Label } from '@/components/ui/label';

const formSchema = z.object({
  to: z.string().refine((value) => isAddress(value), {
    message: 'Invalid Address'
  }),
  value: z.string()
});

export default function SendTransactionForm() {
  const { address } = useAccount();
  const { data: balance } = useBalance({ address });
  const { sendTransaction, data: hash } = useSendTransaction();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      to: '',
      value: ''
    }
  });

  const value = useWatch({
    control: form.control,
    name: 'value'
  });

  useEffect(() => {
    const isInsufficientBalance = balance && balance?.value < parseEther(value);

    if (isInsufficientBalance) {
      form.setError('value', { message: 'Insufficient balance' });
    } else {
      form.clearErrors('value');
    }
  }, [value, balance, form]);

  function onSubmit({ to, value }: z.infer<typeof formSchema>) {
    sendTransaction({ to: to as `0x${string}`, value: parseEther(value) });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-10 w-full relative'
      >
        <FormField
          control={form.control}
          name='to'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input
                  placeholder='0x0000000000000000000000000000'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='value'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Value</FormLabel>
              <FormControl>
                <Input placeholder='0.1' {...field} type='number' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {(isConfirming || isConfirmed) && (
          <Label className='absolute bottom-12 text-sky-500'>
            {isConfirming ? 'Confirming Tx...' : 'Confirmed'}
          </Label>
        )}
        <Button
          disabled={!form.formState.isValid || isConfirming || isConfirmed}
          className='w-full'
          type='submit'
        >
          Send
        </Button>
      </form>
    </Form>
  );
}
