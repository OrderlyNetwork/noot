import { TradingPageProps } from "@orderly.network/trading";
import { FooterProps, MainNavWidgetProps } from "@orderly.network/ui-scaffold";
import { AppLogos } from "@orderly.network/react-app";
import { OrderlyActiveIcon, OrderlyIcon } from "../components/icons/orderly";

export type OrderlyConfig = {
  orderlyAppProvider: {
    appIcons: AppLogos;
  };
  scaffold: {
    mainNavProps: MainNavWidgetProps;
    footerProps: FooterProps;
  };
  tradingPage: {
    tradingViewConfig: TradingPageProps["tradingViewConfig"];
    sharePnLConfig: TradingPageProps["sharePnLConfig"];
  };
};

const config: OrderlyConfig = {
  scaffold: {
    mainNavProps: {
      initialMenu: "/",
      mainMenus: [
        { name: "Trading", href: "/" },
        { name: "Portfolio", href: "/portfolio" },
        { name: "Markets", href: "/markets" },
        { name: "Website ↗", href: "https://nootonabstract.xyz/", target: "_blank" },
      ],
      campaigns: {
        name: "Reward",
        href: "/rewards",
        children: [
          {
            name: "Trading rewards",
            href: "https://app.orderly.network/tradingRewards",
            description: "Trade with Orderly to earn ORDER",
            icon: <OrderlyIcon size={14} />,
            activeIcon: <OrderlyActiveIcon size={14} />,
            target: "_blank",
          },

          {
            name: "Staking",
            href: "https://app.orderly.network/staking",
            description: "Stake ORDER/esORDER to acquire VALOR",
            icon: <OrderlyIcon size={14} />,
            activeIcon: <OrderlyActiveIcon size={14} />,
            target: "_blank",
          },
        ],
      },
    },
    footerProps: {
      telegramUrl: "https://t.me/nootonabstract",
      // discordUrl: "https://discord.com/invite/orderlynetwork",
      twitterUrl: "https://x.com/nootonabstract?s=21",
      trailing: <span className="oui-text-2xs oui-text-base-contrast-54">Charts powered by <a href="https://tradingview.com" target="_blank" rel="noopener noreferrer">TradingView</a></span>
    },
  },
  orderlyAppProvider: {
    appIcons: {
      main: {
        component: <img src="/logo.webp" alt="logo" style={{ height: "42px" }} />,
      },
      secondary: {
        img: "/logo-secondary.webp",
      },
    },
  },
  tradingPage: {
    tradingViewConfig: {
      scriptSRC: "/tradingview/charting_library/charting_library.js",
      library_path: "/tradingview/charting_library/",
      customCssUrl: "/tradingview/chart.css",
    },
    sharePnLConfig: {
      backgroundImages: [
        "/pnl/poster_bg_1.png",
        "/pnl/poster_bg_2.png",
        "/pnl/poster_bg_3.png",
        "/pnl/poster_bg_4.png",
      ],

      color: "rgba(255, 255, 255, 0.98)",
      profitColor: "rgba(41, 223, 169, 1)",
      lossColor: "rgba(245, 97, 139, 1)",
      brandColor: "rgba(255, 255, 255, 0.98)",
    },
  },
};

export default config;
