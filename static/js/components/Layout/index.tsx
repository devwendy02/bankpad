import { useEffect, useState } from 'react';
import NavBar from 'components/Layout/Navbar';
import CheckAccount from 'components/CheckAccount/CheckAccount';
import Sidebar from 'components/Layout/Sidebar';

interface Props {
  children: any
}

const Layout = ({ children }: Props) => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.querySelector('#sideMenu').classList.remove('-translate-x-full')
      document.querySelector('#menuOverlayBg').classList.remove('hidden')
    } else {
      document.querySelector('#sideMenu').classList.add('-translate-x-full')
      document.querySelector('#menuOverlayBg').classList.add('hidden')
    }

  }, [menuOpen]);

  const mainContainerClass = "flex h-screen bg-gray-100 dark:bg-dark-2"
  const leftContentClass = ""
  const meanuClass = "fixed inset-y-0 left-0 z-50 flex flex-col min-h-screen transition-all duration-200 -translate-x-full bg-white w-80 shrink-0 lg:relative dark:bg-dark-1 lg:translate-x-0 "
  const rightCotentClass = "h-screen overflow-y-auto grow pb-28"
  const manuBgClass = "fixed inset-0 z-40 hidden bg-black/50 lg:hidden"

  return (
    <>
      {/* <CheckAccount /> */}
      <div className={mainContainerClass} >
        <div className={leftContentClass}>
          <div className={manuBgClass} id="menuOverlayBg"></div>
          <div className={meanuClass} id="sideMenu">
            <Sidebar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
          </div>
        </div>

        <div className={rightCotentClass}>
          <NavBar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
          {children}
        </div>
      </div>
    </>
  )
}
export default Layout;