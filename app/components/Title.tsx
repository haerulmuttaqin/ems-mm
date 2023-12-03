import React, {useEffect, useState} from "react";
import appConfig from "app-config/app-config.json"

export default function TitleApp() {
    const [menuTitle, setMenuTitle] = useState('⚡ ' + appConfig)
    useEffect(() => {
        const title = localStorage.getItem("menuNameSelected") || "Base App"
        setMenuTitle(title)
    }, [])
    return (
        <title>{menuTitle != null ? "NODE—" + menuTitle.replace(/["']/g, "") : 'NODE'}</title>
    )
}