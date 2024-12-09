import { useCallback } from "react";
import { MetaFunction } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import { API } from "@orderly.network/types";
import { Box } from "@orderly.network/ui";
import { PositionsModule } from "@orderly.network/portfolio";
import { useTradingLocalStorage } from "@orderly.network/trading";
import { updateSymbol } from "@/utils/storage";
import config from "@/utils/config";
import { generatePageTitle } from "@/utils/utils";

export const meta: MetaFunction = () => {
  return [{ title: generatePageTitle("Positions") }];
};

export default function PositionsPage() {
  const local = useTradingLocalStorage();
  const navigate = useNavigate();

  const onSymbolChange = useCallback(
    (data: API.Symbol) => {
      const symbol = data.symbol;
      updateSymbol(symbol);
      navigate(`/perp/${symbol}`);
    },
    [navigate]
  );

  return (
    <Box
      p={6}
      pb={0}
      intensity={900}
      r="xl"
      width="100%"
      style={{
        minHeight: 379,
        maxHeight: 2560,
        overflow: "hidden",
        // Make the table scroll instead of the page scroll
        height: "calc(100vh - 48px - 29px - 48px)",
      }}
    >
      <PositionsModule.PositionsPage
        sharePnLConfig={config.tradingPage.sharePnLConfig}
        pnlNotionalDecimalPrecision={local.pnlNotionalDecimalPrecision}
        calcMode={local.unPnlPriceBasis}
        onSymbolChange={onSymbolChange}
      />
    </Box>
  );
}
