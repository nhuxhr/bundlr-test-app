import '../styles/globals.css';
import { useState } from 'react';
import type { AppProps } from 'next/app';
import { createClient, WagmiConfig } from 'wagmi';
import { getDefaultProvider, utils } from 'ethers';
import { WebBundlr } from '@bundlr-network/client';
import { AppContext } from '../context';

const client = createClient({
  autoConnect: true,
  provider: getDefaultProvider(),
});

function MyApp({ Component, pageProps }: AppProps) {
  const [bundlr, setBundlr] = useState<IBundlr>({ instance: undefined });
  const [balance, setBalance] = useState<string>('0.0');

  const init = async (provider: any) => {
    const instance = new WebBundlr('https://node1.bundlr.network', 'matic', provider);
    await instance.ready();
    await refreshBalance();
    setBundlr({ instance });
  };

  const refreshBalance = async () => {
    const balance = await bundlr?.instance?.getLoadedBalance();
    console.log('Balance:', utils.formatEther(balance?.toString() || '0'));
    setBalance(utils.formatEther(balance?.toString() || '0'));
  };

  return (
    <AppContext.Provider value={{ bundlr, balance, init, refreshBalance }}>
      <WagmiConfig client={client}>
        <Component {...pageProps} />
      </WagmiConfig>
    </AppContext.Provider>
  );
}

export default MyApp;
