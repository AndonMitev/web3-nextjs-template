import {
  sepolia,
  baseSepolia,
  scrollSepolia,
  optimismSepolia,
  arbitrumSepolia,
  zkSyncSepoliaTestnet,
  polygonMumbai
} from 'viem/chains';
import { cookieStorage, createConfig, createStorage, http } from 'wagmi';

export default createConfig({
  chains: [
    sepolia,
    baseSepolia,
    scrollSepolia,
    optimismSepolia,
    arbitrumSepolia,
    zkSyncSepoliaTestnet,
    polygonMumbai
  ],
  ssr: true,
  storage: createStorage({
    storage: cookieStorage
  }),
  transports: {
    [sepolia.id]: http(),
    [baseSepolia.id]: http(),
    [scrollSepolia.id]: http(),
    [optimismSepolia.id]: http(),
    [arbitrumSepolia.id]: http(),
    [zkSyncSepoliaTestnet.id]: http(),
    [polygonMumbai.id]: http()
  }
});
