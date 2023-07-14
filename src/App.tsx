/* eslint-disable @typescript-eslint/no-floating-promises */
import "./css/App.css";
import { AiFillGoogleCircle, AiFillFacebook, AiFillApple} from "react-icons/ai";
import Credentials from "./components/credentials";
import { useGlobalContext } from "./context/context";
import { FirebaseClient } from "./firebase/setup";
import { signInWithFacebookPopUp, signInWithGooglePopUp, signInWithApplePopUp  } from "./firebase/sign-in";

function App() {
	const { credentials, tenantId } = useGlobalContext();
	const handleGoogleLogin = async () => {
		FirebaseClient.init(credentials, tenantId);
		await signInWithGooglePopUp();
	};

	const handleFacebookLogin = async () => {
		FirebaseClient.init(credentials, tenantId);
		await signInWithFacebookPopUp();
	};

	const handleAppleLogin = async () => {
		FirebaseClient.init(credentials, tenantId);
		await signInWithApplePopUp();
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

				<button
					className="login-facebook-dialog"
					onClick={() => {
						handleFacebookLogin();
					}}
				>
					<AiFillFacebook />
					Login com facebook dialog
				</button>

				<button
					className="login-apple-dialog"
					onClick={() => {
						handleAppleLogin();
					}}
				>
					<AiFillApple />
					Login com Apple dialog
				</button>
			</div>
		</>
	);
}

export default App;
