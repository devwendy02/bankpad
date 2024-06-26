import Select from 'react-dropdown-select';

interface PropsType{
  options ?:any[]
  onChange?:any
  value?:any
}
export default function CustomDropdown({options, onChange, value}:PropsType) {
  // const [anchorEl, setAnchorEl] = React.useState(null);
  // const handleClick = (event) => {
  //   if (anchorEl && anchorEl.contains(event.target)) {
  //     setAnchorEl(null);
  //   } else {
  //     setAnchorEl(event.currentTarget);
  //   }
  // };
  // const handleClose = (param) => {
  //   setAnchorEl(null);
  //   if (props && props.onClick) {
  //     props.onClick(param);
  //   }
  // };
  // const handleCloseAway = (event) => {
  //   if (anchorEl.contains(event.target)) {
  //     return;
  //   }
  //   setAnchorEl(null);
  // };
  // const {
  //   buttonText,
  //   buttonIcon,
  //   dropdownList,
  //   buttonProps,
  //   dropup,
  //   dropdownHeader,
  //   left,
  //   caret,
  // } = props;
  // let icon = null;
  // switch (typeof buttonIcon) {
  //   case "object":
  //     icon = <props.buttonIcon className="buttonIcon" />;
  //     break;
  //   case "string":
  //     icon = <Icon className="buttonIcon">{props.buttonIcon}</Icon>;
  //     break;
  //   default:
  //     icon = null;
  //     break;
  // }
  // const onChange = ()=>{

  // }
  return (
    <Select
      options={options}
      values={[value]}
      onChange={(value) => onChange((value[0].value))}
    />
  );
}



// import React from "react";
// import PropTypes from "prop-types";

// import MenuItem from "@material-ui/core/MenuItem";
// import MenuList from "@material-ui/core/MenuList";
// import ClickAwayListener from "@material-ui/core/ClickAwayListener";
// import Paper from "@material-ui/core/Paper";
// import Grow from "@material-ui/core/Grow";
// import Divider from "@material-ui/core/Divider";
// import Icon from "@material-ui/core/Icon";
// import Popper from "@material-ui/core/Popper";
// import './customDropStyle.scss'

// export default function CustomDropdown(props) {
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const handleClick = (event) => {
//     if (anchorEl && anchorEl.contains(event.target)) {
//       setAnchorEl(null);
//     } else {
//       setAnchorEl(event.currentTarget);
//     }
//   };
//   const handleClose = (param) => {
//     setAnchorEl(null);
//     if (props && props.onClick) {
//       props.onClick(param);
//     }
//   };
//   const handleCloseAway = (event) => {
//     if (anchorEl.contains(event.target)) {
//       return;
//     }
//     setAnchorEl(null);
//   };
//   const {
//     buttonText,
//     buttonIcon,
//     dropdownList,
//     buttonProps,
//     dropup,
//     dropdownHeader,
//     left,
//     caret,
//   } = props;
//   let icon = null;
//   switch (typeof buttonIcon) {
//     case "object":
//       icon = <props.buttonIcon className="buttonIcon" />;
//       break;
//     case "string":
//       icon = <Icon className="buttonIcon">{props.buttonIcon}</Icon>;
//       break;
//     default:
//       icon = null;
//       break;
//   }
//   return (
//     <div className="w-full p-2 customDropdown">
//       <div className="w-full">
//         <button
//           aria-label="Notifications"
//           aria-owns={anchorEl ? "menu-list" : null}
//           aria-haspopup="true"
//           {...buttonProps}
//           onClick={handleClick}
//           className = {`w-full flex justify-between items-center `}
//         >
//           {icon}
//           {buttonText !== undefined ? buttonText : null}
//           {caret ? <i className="fas fa-caret-down"/> : null}
          
//         </button>
//       </div>
//       <Popper
//         open={Boolean(anchorEl)}
//         anchorEl={anchorEl}
//         transition
//         disablePortal
//         placement={
//           dropup
//             ? left
//               ? "top-start"
//               : "top"
//             : left
//             ? "bottom-start"
//             : "bottom-end"
//         }
//         className={"my_drop"}
//       >
//         {() => (
//           <Grow
//             in={Boolean(anchorEl)}
//             style={
//               dropup
//                 ? { transformOrigin: "0 100% 0" }
//                 : { transformOrigin: "0 0 0" }
//             }
//           >
//             <Paper className="dropdown dark:bg-dark-3 !border-none !rounded-md !shadow-sm !shadow-black/25">
//               <ClickAwayListener onClickAway={handleCloseAway}>
//                 <MenuList role="menu" className="menuList">
//                   {dropdownHeader !== undefined ? (
//                     <MenuItem
//                       onClick={() => handleClose(dropdownHeader)}
//                       className=""
//                     >
//                       {dropdownHeader}
//                     </MenuItem>
//                   ) : null}
//                   {dropdownList.map((prop, key) => {
//                     if (prop.divider) {
//                       return (
//                         <Divider
//                           key={key}
//                           onClick={() => handleClose("divider")}
//                           className="dropdownDividerItem"
//                         />
//                       );
//                     }
//                     return (
//                       <MenuItem
//                         key={key}
//                         onClick={() => handleClose(prop)}
//                         className="!w-full px-4 !py-2 text-sm font-medium dark:bg-dark-3 hover:dark:!bg-dark-1 dark:text-white"
//                       >
//                         {prop}
//                       </MenuItem>
//                     );
//                   })}
//                 </MenuList>
//               </ClickAwayListener>
//             </Paper>
//           </Grow>
//         )}
//       </Popper>
//     </div>
//   );
// }

// CustomDropdown.defaultProps = {
//   caret: true,
//   hoverColor: "primary",
// };

// CustomDropdown.propTypes = {
//   hoverColor: PropTypes.oneOf([
//     "black",
//     "primary",
//     "info",
//     "success",
//     "warning",
//     "danger",
//     "rose",
//   ]),
//   buttonText: PropTypes.node,
//   buttonIcon: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
//   dropdownList: PropTypes.array,
//   buttonProps: PropTypes.object,
//   dropup: PropTypes.bool,
//   dropdownHeader: PropTypes.node,
//   rtlActive: PropTypes.bool,
//   caret: PropTypes.bool,
//   left: PropTypes.bool,
//   noLiPadding: PropTypes.bool,
//   navDropdown: PropTypes.bool,
//   onClick: PropTypes.func,
//   className : PropTypes.string
// };
