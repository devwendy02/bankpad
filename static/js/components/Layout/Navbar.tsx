// @ts-nocheck
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { matchPath, useLocation } from "react-router-dom";
import {
  AirdropIcon,
  DocIcon,
  HomeIcon,
  LaunchpadIcon,
  LockerIcon,
  OtcdIcon,
  PrivasaleIcon,
  StakingIcon,
  ThreeBar,
  WalletIcon,
  MigrationIcon
} from "components/Icons";

const contentClass =
  "sticky inset-x-0 top-0 z-20 bg-white border-b dark:bg-dark-1 border-white dark:border-dark-1";
const wrapClass =
  "flex items-center justify-between bg-gray-100 dark:bg-dark-2 lg:rounded-tl-[2rem] py-1 px-3 sm:px-6";
const leftContentClass = "flex items-center space-x-3";
const iconBtnClass = "lg:hidden dark:text-gray-2 hover:dark:text-yellow-1";
const navClass = "flex items-center md:space-x-3";
const labelClass1 = "text-lg font-semibold text-gray-600 dark:text-gray-3";
const labelClass2 =
  "hidden text-sm text-gray-400 dark:text-gray-10 sm:text-base md:inline-block";
const rightContentClass = "flex items-center space-x-3 md:space-x-8";
const iconClass =
  "icon-md hidden md:inline-block text-yellow-2 dark:text-yellow-1 ";

type MenuType = {
  menuOpen?: boolean;
  setMenuOpen?: any;
};

const NavBar = ({ menuOpen, setMenuOpen }: MenuType) => {
  const location = useLocation();

  const icon = (id: string) => {
    if (id === "/") return <HomeIcon className={iconClass} />;
    if (id === "/launchpad") return <LaunchpadIcon className={iconClass} />;
    if (id === "/private_sale") return <PrivasaleIcon className={iconClass} />;
    if (id === "/otc_offerings") return <OtcdIcon className={iconClass} />;
    if (id === "/staking") return <StakingIcon className={iconClass} />;
    if (id === "/docs") return <DocIcon className={iconClass} />;
    if (id === "/locker") return <LockerIcon className={iconClass} />;
    if (id === "/migration") return <MigrationIcon className={iconClass} />;
    if (id === "/airdrop") return <AirdropIcon className={iconClass} />;
  };

  const navTitle = {
    "/": "Home",
    "/launchpad": "Launchpad",
    "/private_sale": "Private Sale",
    "/otc_offerings": "OTC Offerings",
    "/staking": "Staking",
    "/docs": "Docs",
    "/locker": "Locker",
    "/migration": "Migration",
    "/airdrop": "Airdrop",
  };

  const navSubTitle = {
    "/launchpad": {
      token_details: "Token Details",
      distribution: "Distribution",
      antibot: "AntiBot",
      taxes: "Taxes",
      liquidity: "Liquidity",
      review: "Review & Launch",
      view: "View",
    },
  };

  const matchedPrimaryRoute = matchPath(location.pathname, {
    path: [
      "/launchpad",
      "/private_sale",
      "/locker",
      "/airdrop",
      "/otc_offerings",
      "/staking",
      "/migration",
      "/docs",
      "/",
    ],
  });
  const launchpadStepRoute = matchPath(location.pathname, {
    path: ["/launchpad/:uuid/:step", "/launchpad/:uuid"],
  });

  const getNavTitle = (navId) => {
    if (!navId) return "Home";
    return navTitle[navId];
  };

  const getNavSubTitle = (primaryRoute, subRouteParams) => {
    if (!subRouteParams) return "";
    if (!(primaryRoute in navSubTitle)) return "";
    if (primaryRoute == "/launchpad") {
      if (subRouteParams.step)
        return `${navSubTitle[primaryRoute][subRouteParams.step]}`;
      if (subRouteParams.uuid) return `${navSubTitle[primaryRoute]["view"]}`;
    }
    return "";
  };

  return (
    <>
      <header className={contentClass}>
        <div className={wrapClass}>
          {matchedPrimaryRoute && (
            <div className={leftContentClass}>
              <button
                className={iconBtnClass}
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <ThreeBar className="w-6 h-6" />
              </button>

              <div className={navClass}>
                {icon(matchedPrimaryRoute.path)}
                <span className={labelClass1}>
                  {getNavTitle(matchedPrimaryRoute.path)}
                </span>
                {getNavSubTitle(
                  matchedPrimaryRoute.path,
                  launchpadStepRoute?.params
                ) !== "" && (
                  <>
                    <span className={"hidden md:inline-block " + labelClass1}>
                      /
                    </span>
                    <span className={labelClass2}>
                      {getNavSubTitle(
                        matchedPrimaryRoute.path,
                        launchpadStepRoute?.params
                      )}
                    </span>
                  </>
                )}
              </div>
            </div>
          )}

          <div className={rightContentClass}>
            <div className="connect_btn_div py-2 md:py-3">
              <ConnectButton
                chainStatus="icon"
                label={
                  <>
                    <p className="flex items-center gap-2 whitespace-nowrap">
                      <WalletIcon /> Connect
                    </p>
                  </>
                }
              />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
export default NavBar;
