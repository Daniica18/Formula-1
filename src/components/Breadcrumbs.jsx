import { useLocation, Link } from "react-router";

export default function Breadcrumbs() {
    const location = useLocation("");
    const pathnames = location.pathname.split("/").filter((x) => x);
    const breadcrumbPath = "";

    return(
        <ul className="breadcrumNav">
            <li>
                <Link to="/" >Home</Link>
            </li>
            {pathnames.map((value, i) => {
                const last = i === pathnames.length - 1;
                const to = `/${pathnames.slice(0, i + 1).join("/")}`;
                const title = value.toUpperCase().replace(/_/g, " ");

                return (
                    <li>
                        {last ? (
                            <span>{title}</span>
                        ) : (
                            <Link to ={to}>{title}</Link>
                        )}
                    </li>
                );
            })}
        </ul>
    )
}