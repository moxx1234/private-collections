import { createContext, useContext } from "react"
import useTheme from "../hooks/useTheme"

const ThemeContext = createContext()
const ThemeUpdateContext = createContext()

export function useThemeContext() {
	return useContext(ThemeContext)
}

export function useThemeUpdateContext() {
	return useContext(ThemeUpdateContext)
}

export const ThemeProvider = ({ children }) => {
	const { theme, setTheme } = useTheme()

	const toggleTheme = () => {
		theme === 'light' ? setTheme('dark') : setTheme('light')
	}

	return (
		<ThemeContext.Provider value={theme}>
			<ThemeUpdateContext.Provider value={toggleTheme}>
				{children}
			</ThemeUpdateContext.Provider>
		</ThemeContext.Provider>
	)
}