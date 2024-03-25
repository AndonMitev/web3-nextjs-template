import { createAuthenticationAdapter } from '@rainbow-me/rainbowkit';
import { SiweMessage } from 'siwe';

export const authenticationAdapter = createAuthenticationAdapter({
  getNonce: async () => {
    console.log('called');
    // const response = await fetch('/api/nonce');
    // return response.text()
    return new Promise((resolve) => resolve('test_nonce'));
  },
  createMessage: ({ nonce, address, chainId }) => {
    console.log('createMessage');
    return new SiweMessage({
      domain: window.location.host,
      address,
      statement: 'Sign in with Ethereum to the app.',
      uri: window.location.origin,
      version: '1',
      chainId,
      nonce
    });
  },
  getMessageBody: ({ message }) => {
    console.log('getMessageBody');
    return message.prepareMessage();
  },
  verify: async ({ message, signature }) => {
    console.log('verify');
    const verifyRes = await fetch('/api/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, signature })
    });
    return Boolean(verifyRes.ok);
  },
  signOut: async () => {
    await fetch('/api/logout');
  }
});
