import React, { useEffect, useState } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
  Avatar
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link, NavLink, useNavigate } from "react-router-dom";
import '../shared/MegaMenuWithHover.css'
import useAuth from "../../customHooks/useAuth";
import { UserCircle2Icon } from "lucide-react";
import useProfileMenu from "../../customHooks/useProfileMenu";


function NavList() {
  const { userInfo } = useAuth();
  let dashboard = '';
  if (userInfo.role === 'employee') {
    dashboard = '/dashboard/work-sheet';
  } else if (userInfo.role === 'hr') {
    dashboard = '/dashboard/employee-list';
  } else {
    dashboard = '/dashboard/all-employee';
  }

  return (
    <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
      <Typography
        as="div"
        href="#"
        variant="small"
        color="blue-gray"
        className="font-medium"
      >
        <ListItem className="flex items-center gap-2 py-2 pr-4"><NavLink to={'/'}>Home</NavLink></ListItem>
      </Typography>
      <Typography
        as="div"
        href="#"
        variant="small"
        color="blue-gray"
        className="font-medium"
      >
        <ListItem className="flex items-center gap-2 py-2 pr-4"><NavLink to={dashboard}>Dashboard</NavLink></ListItem>

      </Typography>
      {userInfo.role === 'admin' &&
        <Typography
          as="div"
          href="#"
          variant="small"
          color="blue-gray"
          className="font-medium"
        >
          <ListItem className="flex items-center gap-2 py-2 pr-4"><NavLink to={'/inbox'}>Inbox</NavLink></ListItem>

        </Typography>
      }
      <Typography
        as="div"
        href="#"
        variant="small"
        color="blue-gray"
        className="font-medium"
      >
        <ListItem className="flex items-center gap-2 py-2 pr-4"><NavLink to={'/contact'}>Contact</NavLink></ListItem>

      </Typography>
    </List>
  );
}


function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, userInfo, logOut } = useAuth();
  const profileMenuItems = useProfileMenu();


  const closeMenu = () => setIsMenuOpen(false);
  //console.log(user.email);
  //console.log(userInfo.image);
  const handleSignOut = (label) => {
    if (label === 'Sign Out') {
      logOut();
    }
    closeMenu();
  }

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">

      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          {user && userInfo ?
            <Avatar
              variant="circular"
              size="sm"
              alt={userInfo.name}
              className="border border-gray-900 p-0.5"
              src={userInfo.image}
            />
            :
            <UserCircle2Icon className="w-10"></UserCircle2Icon>
          }
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""
              }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon, link }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <Link to={link} key={key}>
              <MenuItem
                key={label}
                onClick={() => handleSignOut(label)}
                className={`flex items-center gap-2 rounded ${isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
                  }`}
              >
                {React.createElement(icon, {
                  className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                  strokeWidth: 2,
                })}
                <Typography
                  as="span"
                  variant="small"
                  className="font-normal"
                  color={isLastItem ? "red" : "inherit"}
                >
                  {label}
                </Typography>
              </MenuItem>
            </Link>
          );
        })}
      </MenuList>
    </Menu>
  );
}

export function MegaMenuWithHover() {
  const { user } = useAuth();
  const [openNav, setOpenNav] = React.useState(false);
  const navigate = useNavigate();



  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);
  return (
    <div className="block shadow-md backdrop-saturate-200 backdrop-blur-2xl bg-opacity-80 border border-white/80 bg-white text-white  px-4 py-2">
      <div className="flex items-center justify-between text-blue-gray-900 mx-auto max-w-screen-xl w-full">
        <div className="flex">
          <IconButton variant="text" color="blue-gray" className="lg:hidden" onClick={() => setOpenNav(!openNav)}>
            {openNav ? (
              <XMarkIcon className="h-6 w-6" strokeWidth={2} />
            ) : (
              <Bars3Icon className="h-6 w-6" strokeWidth={2} />
            )}
          </IconButton>
          <Typography onClick={() => { navigate('/') }} variant="h6" className="mr-4 cursor-pointer py-1.5 lg:ml-2" >
            STAFF SYNC
          </Typography>
        </div>
        <div className="hidden lg:block">
          <NavList />
        </div>
        <div>
          {
            user ? <ProfileMenu /> : <Button onClick={() => navigate('/signin')}>Get Start</Button>
          }
        </div>
      </div>
      <Collapse open={openNav}>
        <NavList />
      </Collapse>
    </div>
  );
}