import {HashLink} from "react-router-hash-link";
import {useLocation, matchPath} from "react-router-dom";
import MenuItem from "./MenuItem";
import ThemeSwitch from "components/Butttons/ThemeSwitch";
import {
    AirdropIcon,
    CloseIcon,
    Website,
    DocIcon,
    HomeIcon,
    LaunchpadIcon,
    LockerIcon,
    OtcdIcon,
    PrivasaleIcon,
    StakingIcon,
    Telegram,
    TwitterX,
    Youtube,
    FireWall,
    LockIcon1,
    MigrationIcon,
} from "components/Icons";
import Label1 from "components/Typography/Label1";

type MenuType = {
    menuOpen?: boolean;
    setMenuOpen?: any;
};

export default function Sidebar({menuOpen, setMenuOpen}: MenuType) {
    const location = useLocation();
    const matchRoute = matchPath(location.pathname, {
        path: [
            "/launchpad",
            "/private_sale",
            "/otc_offerings",
            "/staking",
            "/docs",
        ],
    });
    const isHomeRoute = matchPath(location.pathname, {
        path: "/",
        exact: true,
    });

    const logoTextCalss = "font-medium text-3xl/10 dark:text-white";
    const logoLinkClass = "flex items-center space-x-4";
    const menuContentClass = "py-5 overflow-y-auto lg:overflow-y-hidden";
    const menuListClass = "mb-4 space-y-4";
    const footerClass = "px-6";
    const footerContentClass = "pt-4 border-t dark:border-gray-1/40";
    const socialLinksContentClass = "flex items-center";
    const socialLinksClass = "flex items-center space-x-3";
    const linkClass =
        "text-gray-600 hover:dark:text-white dark:text-gray-2 hover:text-dark-1";
    const iconClass = "text-yellow-2 dark:text-yellow-1";
    return (
        <>
            <div className="flex flex-row items-center px-4 py-3 border-b-2 dark:border-dark-2 border-gray-100 relative h-[75px]">
                <HashLink to={""} smooth className={logoLinkClass}>
                    <img src={"/assets/logo.png"} alt="" className="w-12 h-12"/>
                    <span className={logoTextCalss}>BankPad</span>
                </HashLink>
                <button
                    className="lg:hidden dark:text-gray-2 hover:dark:text-yellow-1 ml-4"
                    onClick={() => setMenuOpen(false)}
                >
                    <CloseIcon/>
                </button>
            </div>
            <div className={menuContentClass} onClick={() => setMenuOpen(false)}>
                <ul className={menuListClass}>
                    <MenuItem
                        label="Home"
                        icon={<HomeIcon className={iconClass}/>}
                        isActive={Boolean(isHomeRoute)}
                        href="/launchpad"
                        // href="/"
                    />
                    <MenuItem
                        label="Launchpad"
                        icon={<LaunchpadIcon className={iconClass}/>}
                        isActive={matchRoute?.path === "/launchpad"}
                        href="/launchpad"
                    />
                    <MenuItem
                        label="Private Sale"
                        icon={<PrivasaleIcon className={iconClass}/>}
                        isActive={matchRoute?.path === "/private_sale"}
                        href="/private_sale"
                    />
                    <MenuItem
                        label="Locker"
                        icon={<LockerIcon className={iconClass}/>}
                        isActive={matchRoute?.path === "/locker"}
                        href="/locker"
                    />
                    <MenuItem
                        label="Airdrop"
                        icon={<AirdropIcon className={iconClass}/>}
                        isActive={matchRoute?.path === "/airdrop"}
                        href="/airdrop"
                    />
                    <MenuItem
                        label="OTC Offerings"
                        icon={<OtcdIcon className={iconClass}/>}
                        isActive={matchRoute?.path === "/otc_offerings"}
                        href="/otc_offerings"
                    />
                    <MenuItem
                        label="Staking"
                        icon={<StakingIcon className={iconClass}/>}
                        isActive={matchRoute?.path === "/staking"}
                        href="/staking"
                    />
                    <MenuItem
                        label="Migration"
                        icon={<MigrationIcon className={iconClass}/>}
                        isActive={matchRoute?.path === "/migration"}
                        href="/migration"
                    />
                    <MenuItem
                        label="Docs"
                        icon={<DocIcon className={iconClass}/>}
                        isActive={matchRoute?.path === "/docs"}
                        href="https://docs.bankai.app"
                        isLink={true}
                    />
                </ul>
                <div className={footerClass}>
                    <div className={footerContentClass}>
                        <Label1 text="Follow us"/>
                        <div className={socialLinksContentClass}>
                            <div className={socialLinksClass}>
                                <a
                                    href="https://t.me/bankaieth"
                                    target="_blank"
                                    rel="noreferrer"
                                    className={linkClass}
                                >
                                    <Telegram/>
                                </a>
                                <a
                                    href="https://twitter.com/Bank_AIETH"
                                    target="_blank"
                                    rel="noreferrer"
                                    className={linkClass}
                                >
                                    <TwitterX/>
                                </a>
                                <a
                                    href="https://bankai.app"
                                    target="_blank"
                                    rel="noreferrer"
                                    className={linkClass}
                                >
                                    <Website/>
                                </a>
                                <a
                                    href="www.youtube.com/@BANK_AIETH"
                                    target="_blank"
                                    rel="noreferrer"
                                    className={linkClass}
                                >
                                    <Youtube/>
                                </a>
                            </div>
                            <div className="flex items-center ml-auto">
                                <ThemeSwitch/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
