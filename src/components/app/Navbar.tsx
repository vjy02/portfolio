"use client"
import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { useTheme } from "next-themes";
import { useEffect, useState } from "react"

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
	width: 62,
	height: 34,
	padding: 7,
	'& .MuiSwitch-switchBase': {
		margin: 1,
		padding: 0,
		transform: 'translateX(6px)',
		'&.Mui-checked': {
			transform: 'translateX(22px)',
			'& .MuiSwitch-thumb:before': {
				backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
					'#000',
				)}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
			},
			'& + .MuiSwitch-track': {
				opacity: 1,
				backgroundColor: "#4b4b4b"
			},
		},
	},
	'& .MuiSwitch-thumb': {
		backgroundColor: theme.palette.mode === 'dark' ? '#000' : '#fff',
		width: 32,
		height: 32,
		'&::before': {
			content: "''",
			position: 'absolute',
			width: '100%',
			height: '100%',
			left: 0,
			top: 0,
			backgroundRepeat: 'no-repeat',
			backgroundPosition: 'center',
			backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
				'#000',
			)}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
		},
	},
	'& .MuiSwitch-track': {
		opacity: 1,
		backgroundColor: "#ccc",
		borderRadius: 20 / 2,
	},
}));



export default function Navbar(): JSX.Element {
	const [prevScrollPos, setPrevScrollPos] = useState(0);
	const [visible, setVisible] = useState(true)
	const { setTheme, resolvedTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
	  setMounted(true)
	  setTheme("light")
	}, [setTheme]);
	
	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll)
	})


	if (!mounted) return <></>;

	function handleScroll() {
		const currentScrollPos = window.scrollY
		if (currentScrollPos > prevScrollPos) {
			setVisible(false)
		}
		else {
			setVisible(true)
		}
		setPrevScrollPos(currentScrollPos)
	}

	const scrolltoHash = function (element_id: string) {
		const element = document.getElementById(element_id)
		element?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
	}

	return (
		<nav className={`${visible ? 'md:opacity-100' : 'md:opacity-0 pointer-events-none'} z-10 h-[12vh] transition ease-in-out delay-100 w-screen max-w-full flex justify-center items-center absolute md:fixed`}>
			<div className="flex w-[100%] md:w-[97%] justify-between items-center pl-5 md:pl-0">
				<FormControlLabel
					control={<MaterialUISwitch onClick={() => {setTheme(resolvedTheme === "light" ? "dark" : "light")}} sx={{ m: 1 }} />}
					label=""
				/>
				{/* MOBILE */}
				<button className=" md:hidden"></button>

				{/* DESKTOP */}
				<div className="hidden md:flex justify-between gap-10 items-center">
					<div onClick={() => scrolltoHash('hero')} className={`${resolvedTheme === "light" || !resolvedTheme ? "after:bg-black" : "after:bg-white"} hover:cursor-pointer underline-animation`}>Home</div>
					<div onClick={() => scrolltoHash('featured')} className={`${resolvedTheme === "light" || !resolvedTheme ? "after:bg-black" : "after:bg-white"} hover:cursor-pointer underline-animation`}>Projects</div>
					<div onClick={() => scrolltoHash('contact-me')} className={`${resolvedTheme === "light" || !resolvedTheme ? "after:bg-black" : "after:bg-white"} hover:cursor-pointer underline-animation`}>Contact Me</div>
				</div>
			</div>
		</nav>
	);
}
