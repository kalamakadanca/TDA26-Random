export default function AccountDropdown() {
    return (
        <div
            className="account-dropdown rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
        >
            <ul className="py-1" role="none">
                <li role="none">
                    <a
                        href="/courses/me"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors whitespace-nowrap"
                        role="menuitem"
                    >
                        Moje kurzy
                    </a>
                </li>
                <li role="none">
                    <a
                        href="/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors whitespace-nowrap"
                        role="menuitem"
                    >
                        Dashboard
                    </a>
                </li>
                <li role="none">
                    <a
                        className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors whitespace-nowrap cursor-pointer"
                        role="menuitem"
                    >
                        Odhlásit se
                    </a>
                </li>
            </ul>
        </div>
    );
}
