import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Styles/main.css";

function Navbar() {
	const navRef = useRef();

	const showNavbar = () => {
		navRef.current.classList.toggle(
			"responsive_nav"
		);
	};

	return (
		<header>
			<a className="to-home-text" href="/"><h2>My baidibek</h2></a>
			<nav ref={navRef}>
				<a href="/">Сауда-саттық</a>
				<a href="/taxi">Жол-Көлік</a>
				<a href="/service">Қызметтер</a>
				 {/* <a href="/#">Жаңа пост</a> */}

				<button
					className="nav-btn nav-close-btn"
					onClick={showNavbar}>
					<FaTimes />
				</button>

			</nav>
			<button

				className="nav-btn"
				onClick={showNavbar}>
				<FaBars />

			</button>
		</header>
	);
}

export default Navbar;
