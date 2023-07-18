import { createBrowserRouter } from "react-router-dom";
import { Home } from "../pages/Home/index";
import { FirebaseLogin } from "../pages/FirebaseLogin";
import { FacebookSDKLoginComponent } from "../pages/FacebookSDKLogin";
import { Page404 } from "../pages/404";
import { GoogleSDKLoginComponent } from "../pages/GoogleSDKLogin";
import { AppleSDKLoginComponent } from "../pages/AppleSDKLogin";
import { CredentialManagerComponent } from "../pages/CredentialManager";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
		errorElement: <Page404 />,
	},
	{
		path: "/firebase-login",
		element: <FirebaseLogin />,
	},
	{
		path: "/sdk-login/facebook",
		element: <FacebookSDKLoginComponent />,
	},
	{
		path: "/sdk-login/google",
		element: <GoogleSDKLoginComponent />,
	},
	{
		path: "/sdk-login/apple",
		element: <AppleSDKLoginComponent />,
	},
	{
		path: "/credential-manager",
		element: <CredentialManagerComponent />,
	},
]);
