import {Box, BoxProps, Collapse, Flex, FlexProps, HStack, Icon, Spacer, Text, useDisclosure,} from "@chakra-ui/react";
import FeatherIcon from "feather-icons-react";
import {IconType} from "react-icons";
import React, {ReactText} from "react";
import {useRecoilState} from "recoil";
import {titleState,} from "@Data/state";
import ActiveLink from "../ActiveLink";
import {ChevronDownIcon, ChevronUpIcon} from "@chakra-ui/icons";
import {Link} from "@Components/Link";

interface MenuProps {
  menuSid: string;
  menuName: string;
  menuLabel: string;
  menuIcon: IconType;
  menuHref: string;
  MenuItems: Array<any>;
  isOpen: any;
}

let LinkItemsMenu: Array<MenuProps> = [];

export default function Sidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <SidebarContent
      onClose={() => onClose}
      display={{ base: "none", md: "block" }}
    />
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box>
      <Flex
        alignItems="center"
        pl="6"
        paddingTop="5"
        paddingBottom="4"
        textOverflow="true"
        justifyContent="space-between"
        bg={"gray.700"}
      >
        <Text
          fontSize="1md"
          fontFamily="sans-serif"
          color={"primary.200"}
          fontWeight="bold"
          isTruncated
        >
          UP3 YOGYAKARTA
        </Text>
        <Text color={"gray.500"} fontSize={"xs"} mr={4}>
          v2.0.0-2022
        </Text>
      </Flex>
      {LinkItemsMenu.map((menu, index) => (
        <CollapseMenu key={index + 2} keyId={index + 4} menu={menu} />
      ))}
    </Box>
  );
};
const CollapseMenu = ({
  menu,
  keyId,
  ...rest
}: {
  menu: MenuProps;
  keyId: number;
}) => {
  const [show, setShow] = React.useState(menu.isOpen);
  const handleToggle = (item) => {
    item.isOpen = !item.isOpen;
    setShow(item.isOpen);
  };
  return (
    <>
      <Box
        key={keyId + 3}
        className="noselect"
        pl="6"
        color={"white"}
        _focus={{ boxShadow: "none" }}
        _hover={{
          bg: "gray.900",
          color: "white",
        }}
      >
        <Box
          isTruncated
          flex="1"
          pt="2"
          pb="2"
          pr="3"
          mb="1"
          fontWeight="500"
          textAlign="left"
          onClick={() => handleToggle(menu)}
          cursor="pointer"
        >
          <HStack>
            <Box>{menu.menuName}</Box>
            <Spacer />
            <Icon
              as={show ? ChevronUpIcon : ChevronDownIcon}
              marginRight="4"
              marginTop="1"
              marginBottom="1"
              color="gray.500"
            />
          </HStack>
        </Box>
      </Box>
      <Box px="0" className="noselect" key={keyId + 4}>
        <Collapse in={show}>
          {menu.MenuItems.map((link) => (
            <NavItem
              fontWeight="400"
              menu={link}
              key={link.menuItemSid}
              icon={link.menuItemIcon}
              href={link.menuItemHref}
            >
              {link.menuItemName}
            </NavItem>
          ))}
        </Collapse>
      </Box>
    </>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
  href: string;
  menu: any;
}

const NavItem = ({ menu, icon, children, href, ...rest }: NavItemProps) => {
  const [title, setTitle] = useRecoilState(titleState);

  const handleMenuItemSelected = (e) => {
    localStorage.setItem("menuItemSelected", JSON.stringify(menu));
    localStorage.setItem("menuNameSelected", JSON.stringify(children));
    setTitle(children);
  };

  const handleRightClick = (e) => {
    if (e.type === "contextmenu") {
      console.log("Right click");
    }
  };

  return (
    <Link href={href}>
      <ActiveLink href={href} activeClassName={"active-link-dark"}>
        <Flex
          isTruncated
          onClick={(e) => handleMenuItemSelected(e)}
          onContextMenu={(e) => handleRightClick(e)}
          align="center"
          py="2"
          pl="4"
          pr="2"
          mx="4"
          borderRadius="md"
          role="group"
          cursor="pointer"
          textColor={"gray.500"}
          _hover={{
            bg: "gray.700",
            color: "gray.200",
          }}
          _focus={{
            bg: "gray.600",
            color: "gray.200",
          }}
          {...rest}
        >
          {icon && <FeatherIcon icon={icon} size={18} />}
          <Flex marginLeft="2" isTruncated>
            {children}
          </Flex>
        </Flex>
      </ActiveLink>
    </Link>
  );
};
