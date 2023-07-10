/* eslint-disable @typescript-eslint/no-floating-promises */
import "./css/App.css";
import { AiFillGoogleCircle } from "react-icons/ai";
import Credentials from "./components/credentials";
import { useGlobalContext } from "./context/context";
import { FirebaseClient } from "./firebase/setup";
import { signInWithGooglePopUp } from "./firebase/sign-in";

function App() {
	const { credentials, tenantId } = useGlobalContext();
	const handleGoogleLogin = async () => {
		FirebaseClient.init(credentials, tenantId);
		await signInWithGooglePopUp();
	};

	return (
		<>
			<Credentials />
			<div className="container">
				<button
					className="login-google-dialog"
					onClick={() => {
						handleGoogleLogin();
					}}
				>
					<AiFillGoogleCircle />
					Login com google dialog
				</button>
			</div>
		</>
	);
}

export default App;
