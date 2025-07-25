import '../index.css'
import { APITester } from '../components/APITester'

import logo from '../assets/logo.svg'
import reactLogo from '../assets/react.svg'

export function App() {
	return (
		<div className="max-w-7xl mx-auto p-8 text-center relative z-10">
			<div className="flex justify-center items-center gap-8 mb-8">
				<img
					src={logo}
					alt="Bun Logo"
					className="h-24 p-6 transition-all duration-300 hover:drop-shadow-[0_0_2em_#646cffaa] scale-120"
				/>
				<img
					src={reactLogo}
					alt="React Logo"
					className="h-24 p-6 transition-all duration-300 hover:drop-shadow-[0_0_2em_#61dafbaa] animate-[spin_20s_linear_infinite]"
				/>
			</div>

			<h1 className="text-5xl font-bold my-4 leading-tight">Bun + React</h1>
		</div>
	)
}

export default App
