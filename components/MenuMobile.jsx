import Link from "next/link";
import React from "react";
import { BsChevronDown } from "react-icons/bs"
import { BsChevronUp } from "react-icons/bs"

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

const MenuMobile = ({ showCategMenu, setShowCategMenu, setMobileMenu, categories }) => {
    return (
        <ul className="flex flex-col md:hidden font-bold absolute top-[50px] left-0 w-full h-[calc(100vh-50px)] bg-white border-t text-black ">
            {data.map(({ id, name, url, subMenu }) => (
                <React.Fragment key={id}>
                    {!!subMenu ? (
                        <li className="cursor-pointer py-4 px-5 border-b flex flex-col relative"
                            onMouseEnter={() => setShowCategMenu(true)}
                            onMouseLeave={() => setShowCategMenu(false)}
                            onClick={() => setShowCategMenu(!showCategMenu)}
                        >
                            <div className="flex justify-between items-center">
                                {name}

                                {!showCategMenu ? <BsChevronDown size={14} /> : <BsChevronUp size={14} />}
                            </div>

                            {showCategMenu && (
                                <ul className="bg-black/5 -mx-5 mt-4 -mb-4">
                                    {categories?.map(({ attributes: c, id }) => (
                                        <Link
                                            key={id}
                                            href={`/category/${c.slug}`}
                                            onClick={() => setShowCategMenu(!showCategMenu)}
                                        >
                                            <li className="py-4 px-8 border-t flex justify-between">
                                                {c.name}
                                                <span className="opacity-50 text-sm">{`(${c.products.data.length})`}</span>
                                            </li>
                                        </Link>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ) : (
                        <li className="py-4 px-5 border-b">
                            <Link href={url} onClick={() => setMobileMenu(false)}>{name}</Link>
                        </li>
                    )}
                </React.Fragment>
            ))}
        </ul>
    );
};

export default MenuMobile;
