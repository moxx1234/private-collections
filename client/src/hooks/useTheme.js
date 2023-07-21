import { useState, useLayoutEffect } from "react"

const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches
const defaultTheme = isDark ? 'dark' : 'light'

const useTheme = () => {
	const [theme, setTheme] = useState(localStorage.getItem('app-theme') || defaultTheme)

	useLayoutEffect(() => {
		document.documentElement.setAttribute('data-theme', theme)
		localStorage.setItem('app-theme', theme)
	}, [theme])

	return (
		{
			theme, setTheme
		}
	)
}

export default useTheme