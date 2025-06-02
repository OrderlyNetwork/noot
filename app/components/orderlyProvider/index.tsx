import { FC, ReactNode, useCallback } from "react";
import { OrderlyAppProvider } from "@orderly.network/react-app";
import { WalletConnectorPrivyProvider, Network } from '@orderly.network/wallet-connector-privy';
import config from "@/utils/config";
import { NetworkId } from "@orderly.network/types";
import { QueryClient } from "@tanstack/query-core";

const OrderlyProvider: FC<{ children: ReactNode }> = (props) => {
  const appId = import.meta.env.VITE_PRIVY_APP_ID;
	const networkId = import.meta.env.VITE_NETWORK_ID as NetworkId;
  const onChainChanged = useCallback(
		(_chainId: number, {isTestnet}: {isTestnet: boolean}) => {
      if (isTestnet && networkId === 'mainnet' || !isTestnet && networkId === 'testnet') {
        setTimeout(() => {
          const href = isTestnet ? import.meta.env.VITE_TESTNET_URL : import.meta.env.VITE_MAINNET_URL;
          if (href) {
            window.location.href = href;
          }
        }, 100);
      }
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[],
  );
  
  return (

    <WalletConnectorPrivyProvider
      network={networkId === 'mainnet' ? Network.mainnet : Network.testnet}
      abstractConfig={{
        queryClient: new QueryClient(),
      }}
      privyConfig={{
        config: {
          appearance: {
            showWalletLoginFirst: false,
          },
        },
        appid: appId,
      }}
    >
    <OrderlyAppProvider
      brokerId={import.meta.env.VITE_ORDERLY_BROKER_ID}
      brokerName={import.meta.env.VITE_ORDERLY_BROKER_NAME}
      networkId={networkId}
      onChainChanged={onChainChanged}
      appIcons={config.orderlyAppProvider.appIcons}
      chainFilter={{
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        mainnet: [{id: 2741} as any],
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        testnet: [{id: 11124} as any],
      }}
    >
      {props.children}
    </OrderlyAppProvider>
    </WalletConnectorPrivyProvider>
  );
};

export default OrderlyProvider;
