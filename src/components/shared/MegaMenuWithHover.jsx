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
import {
  Bars4Icon,
  GlobeAmericasIcon,
  PhoneIcon,
  SquaresPlusIcon,
  SunIcon,
  TagIcon,
  UserGroupIcon,
  UserCircleIcon,
  PowerIcon,
  LifebuoyIcon,
  InboxArrowDownIcon,
  Cog6ToothIcon,

} from "@heroicons/react/24/solid";
import { Link, NavLink, useNavigate } from "react-router-dom";
import '../shared/MegaMenuWithHover.css'
import useAuth from "../../customHooks/useAuth";
import { UserCircle2Icon } from "lucide-react";
import useAxios from "../../customHooks/useAxios";
import useProfileMenu from "../../customHooks/useProfileMenu";
// const [axiosSecure] = useAxios();
const navListMenuItems = [
  {
    title: "Products",
    icon: SquaresPlusIcon,
    link: '/'
  },
  {
    title: "About Us",
    icon: UserGroupIcon,
    link: '/'
  },
  {
    title: "Services",
    icon: SunIcon,
    link: '/'
  },
  {
    title: "Contact",
    icon: PhoneIcon,
    link: '/contact'
  }
];

function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const renderItems = navListMenuItems.map(
    ({ icon, title, link }, key) => (
      <MenuItem key={key} className="flex items-center gap-3 rounded-lg p-0">
        <div className="flex items-center justify-center rounded-lg !bg-blue-gray-50 p-2 ">
          {" "}
          {React.createElement(icon, {
            strokeWidth: 2,
            className: "h-6 text-gray-900 w-6",
          })}
        </div>
        <div>
          <Typography
            variant="h6"
            color="blue-gray"
            className="flex items-center text-sm font-bold"
          >
            <Link to={link}>{title}</Link>
          </Typography>
        </div>
      </MenuItem>

    ),
  );

  return (
    <React.Fragment>
      <Menu
        open={isMenuOpen}
        handler={setIsMenuOpen}
        offset={{ mainAxis: 20 }}
        placement="bottom"
        allowHover={true}
      >
        <MenuHandler>
          <Typography as="div" variant="small" className="font-medium">
            <ListItem
              className="flex items-center gap-2 py-2 pr-4 font-medium text-gray-900"
              selected={isMenuOpen || isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((cur) => !cur)}
            >
              Resources
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`hidden h-3 w-3 transition-transform lg:block ${isMenuOpen ? "rotate-180" : ""
                  }`}
              />
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`block h-3 w-3 transition-transform lg:hidden ${isMobileMenuOpen ? "rotate-180" : ""
                  }`}
              />
            </ListItem>
          </Typography>
        </MenuHandler>
        <MenuList className="hidden max-w-screen-xl rounded-xl lg:block">
          <ul className="grid grid-cols-1 gap-y-2 outline-none outline-0">
            {renderItems}
          </ul>
        </MenuList>
      </Menu>
      <div className="block lg:hidden">
        <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
      </div>
    </React.Fragment>
  );
}

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
      <NavListMenu />
      <Typography
        as="div"
        href="#"
        variant="small"
        color="blue-gray"
        className="font-medium"
      >
        <ListItem className="flex items-center gap-2 py-2 pr-4"><NavLink to={dashboard}>dashboard</NavLink></ListItem>

      </Typography>
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
  const [axiosSecure] = useAxios();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { user, logOut } = useAuth();
  const [userInfo, setUserInfo] = useState();
  const profileMenuItems = useProfileMenu();
  useEffect(() => {
    axiosSecure.get(`/users?email=${user.email}`)
      .then(res => {
        setUserInfo(res.data);
        //console.log(res.data);
      });
  }, [user]);

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




  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);
  return (
    <Navbar className="mx-auto max-w-screen-xl px-4 py-2">
      <div className="flex items-center justify-between text-blue-gray-900">
        <div className="flex">
          <IconButton
            variant="text"
            color="blue-gray"
            className="lg:hidden"
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <XMarkIcon className="h-6 w-6" strokeWidth={2} />
            ) : (
              <Bars3Icon className="h-6 w-6" strokeWidth={2} />
            )}
          </IconButton>
          <Typography
            onClick={() => { navigate('/') }}
            variant="h6"
            className="mr-4 cursor-pointer py-1.5 lg:ml-2"
          >
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
    </Navbar>
  );
}