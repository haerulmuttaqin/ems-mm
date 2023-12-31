import NextLink from 'next/link';
import {ReactNode} from 'react';

export { Link };

function Link({
    href, children, ...props
}: {
    href: string;
    children: ReactNode;
}) {
    return (
        <NextLink href={href}>
            <a {...props}>
                {children}
            </a>
        </NextLink>
    );
}