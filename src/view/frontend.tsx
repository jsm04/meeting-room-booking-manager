/**
 * This file is the entry point for the React app, it sets up the root
 * element and renders the App component to the DOM.
 *
 * It is included in `src/index.html`.
 */

import { createRoot } from 'react-dom/client';
import { App } from './pages/Index';
import { BrowserRouter, Route, Routes } from 'react-router';
import APITestPage from './pages/APITestPage';

function start() {
	const root = createRoot(document.getElementById('root')!);
	root.render(
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<App />} />
				<Route path='test' element={<APITestPage />} />
			</Routes>
		</BrowserRouter>
	);
}

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', start);
} else {
	start();
}
