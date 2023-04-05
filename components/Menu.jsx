import Link from "next/link";
import React from "react";
import { BsChevronDown } from "react-icons/bs"

const data = [
    { id: 1, name: "Home", url: "/" },
    { id: 2, name: "About", url: "/about" },
    { id: 3, name: "Categories", subMenu: true },
    { id: 4, name: "Contact", url: "/contact" },
];

const subMenuData = [
    { id: 1, name: "Jordan", doc_count: 11 },
    { id: 2, name: "Sneakers", doc_count: 8 },
    { id: 3, name: "Running shoes", doc_count: 64 },
    { id: 4, name: "Football shoes", doc_count: 107 },
];

const Menu = ({ showCategMenu, setShowCategMenu, categories }) => {
    return (
        <ul className="hidden md:flex items-center gap-8 font-medium text-black">
            {data.map(({ id, name, url, subMenu }) => (
                <React.Fragment key={id}>
                    {!!subMenu ? (
                        <li className="cursor-pointer flex items-center gap-2 relative"
                            onMouseEnter={() => setShowCategMenu(true)}
                            onMouseLeave={() => setShowCategMenu(false)}
                        >
                            {name}
                            <BsChevronDown size={14} />

                            {showCategMenu && (
                                <ul className="bg-white absolute top-6 left-0 min-w-[250px] px-1 py-1 shadow-lg text-black">
                                    {categories?.map(({ attributes: c, id }) => (
                                        <Link key={id} href={`/category/${c.slug}`}
                                            onClick={() => setShowCategMenu(false)}>
                                            <li className="h-12 flex justify-between items-center px-3 hover:bg-black/5 rounded-md">
                                                {c.name}
                                                <span className="opacity-50 text-sm">{`(${c.products.data.length})`}</span>
                                            </li>
                                        </Link>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ) : (
                        <li className="cursor-pointer">
                            <Link href={url}>{name}</Link>
                        </li>
                    )}
                </React.Fragment>
            ))}
        </ul>
    );
};

export default Menu;
