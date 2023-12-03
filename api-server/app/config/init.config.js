const db = require("../models");

const User = db.user
const Role = db.role
const UserRole = db.userRole
const MainMenu = db.mainMenu
const Menu = db.menu
const MenuItem = db.menuItem

let bcrypt = require("bcryptjs");

exports.initial = () => {
    Role.create({
        roleSid: "c7162c48-f804-446e-9dc7-3b3bb5ba3f3c",
        roleName: "operator",
        roleLabel: "Operator",
        roleLevel: 2
    });

    Role.create({
        roleSid: "06509cbd-2f68-4084-9e3f-8a46d2644266",
        roleName: "supervisor",
        roleLabel: "Supervisor",
        roleLevel: 1
    });

    Role.create({
        roleSid: "4e49bb54-1196-49ee-9a01-8f4b4154fc2d",
        roleName: "root",
        roleLabel: "Administrator",
        roleLevel: 0
    });

    User.create({
        userSid: 'b720a0c0-1ddf-447b-8b33-20bb7e4db378',
        userCode: 'ROOT-001',
        userFirstName: 'Root',
        userLastName: 'SuperAdmin',
        userEmail: 'root@superadmin.com',
        userPhone: '620000000000',
        userAddress: 'Cloud Host',
        userLoginName: '00000',
        userLoginPassword: bcrypt.hashSync("master000000##", 8),
        userActivation: 1
    })

    UserRole.create({
        roleSid: "4e49bb54-1196-49ee-9a01-8f4b4154fc2d",
        userSid: "b720a0c0-1ddf-447b-8b33-20bb7e4db378"
    })

    const mainMenuSid = "7a5e370e-f70d-4689-aa4c-d90209c3d969"
    const menuSidDash = "01729056-e162-4f4a-aa4d-cc7aaca6067f"
    const menuUser = "7a5e370e-f70d-4689-aa4c-d90209c3d977"
    const menuConfig = "19ee9464-2635-499c-99ea-4cd58e8f04b3"

    MainMenu.create({
        mainMenuSid: mainMenuSid,
        mainMenuName: "Menu Principal",
        menuType: "Default"
    })

    Menu.create({
        menuSid: menuSidDash,
        menuName: "Home",
        mainMenuSid: mainMenuSid,
        menuHref: '/',
        isOpen: 1,
        menuOrder: 0
    })

    Menu.create({
        menuSid: menuUser,
        menuName: "User Accounts",
        mainMenuSid: mainMenuSid,
        menuHref: '/users',
        menuOrder: 1,
    })

    MenuItem.create({
        menuItemName: "Users Data",
        menuSid: menuUser,
        menuItemHref: '/users',
        menuItemIcon: 'users',
    })

    MenuItem.create({
        menuItemName: "Users Logs",
        menuSid: menuUser,
        menuItemHref: '/users/logs',
        menuItemIcon: 'file-text',
    })

    MenuItem.create({
        menuItemName: "Dashboard",
        menuSid: menuSidDash,
        menuItemHref: '/dashboard',
        menuItemIcon: 'home',
    })

    //config
    Menu.create({
        menuSid: menuConfig,
        menuName: "Configs",
        mainMenuSid: mainMenuSid,
        menuHref: '/configs',
        menuOrder: 2,
    })

    MenuItem.create({
        menuItemName: "Generics References",
        menuSid: menuConfig,
        menuItemHref: '/configs/refs',
        menuItemIcon: 'database',
    })

    MenuItem.create({
        menuItemName: "Menu Modules",
        menuSid: menuConfig,
        menuItemHref: '/modules',
        menuItemIcon: 'hard-drive',
    })

}