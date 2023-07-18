import React from "react";
import ReactDOM from "react-dom/client";
import { GlobalContextProvider } from "./context/context.tsx";
import { ChakraProvider } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/index.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<ChakraProvider>
			<GlobalContextProvider>
				<RouterProvider router={router} />
			</GlobalContextProvider>
		</ChakraProvider>
	</React.StrictMode>
);
