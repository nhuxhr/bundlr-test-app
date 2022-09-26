interface Window {
  ethereum: any;
}

interface IAppContext {
  bundlr: IBundlr;
  balance: string;
  init: (provider: any) => Promise<void>;
  refreshBalance: () => Promise<void>;
}

interface IBundlr {
  instance?: any;
}
