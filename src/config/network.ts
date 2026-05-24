import type { NetworkConfig } from '../types';

export const CELO_MAINNET: NetworkConfig = {
  chainId: 42220,
  name: 'Celo Mainnet',
  rpcUrl: 'https://forno.celo.org',
  explorerUrl: 'https://celoscan.io',
  nativeCurrency: { name: 'CELO', symbol: 'CELO', decimals: 18 },
};

export const SUPPORTED_CHAIN_ID = 42220;

export const getTxExplorerUrl = (txHash: string): string =>
  `${CELO_MAINNET.explorerUrl}/tx/${txHash}`;

export const getAddressExplorerUrl = (address: string): string =>
  `${CELO_MAINNET.explorerUrl}/address/${address}`;
