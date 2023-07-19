/* eslint-disable no-mixed-spaces-and-tabs */
import { ReactNode, createContext, useContext, useState } from "react";
import {
	AppleCredentials,
	Credentials,
	FacebookCredentials,
	FirebaseCredentials,
	GoogleCredentials,
	useCredentialManager,
} from "../pages/CredentialManager/useCredentialManager";

export type CurrentCredential =
	| FacebookCredentials
	| GoogleCredentials
	| FirebaseCredentials;

export type GlobalContext = {
	globalCredentials: Credentials;

	addFacebookCredential(credential: Omit<FacebookCredentials, "id">): void;
	addGoogleCredential(credential: Omit<GoogleCredentials, "id">): void;
	addAppleCredential(credential: Omit<AppleCredentials, "id">): void;
	addFirebaseCredential(credential: Omit<FirebaseCredentials, "id">): void;
	deleteCredential(provider: keyof Credentials, id: string): void;
	resetCredentials(): void;
	currentCredential?: CurrentCredential;
	setCurrentCredential: (newCred?: CurrentCredential) => void;
	importCredentials: (creds: string) => void;
	editCredential: (
		provider: keyof Credentials,
		id: string,
		cred: any
	) => void;
};

const ctx = createContext<GlobalContext>({} as GlobalContext);

type Props = {
	children: ReactNode;
};

export const GlobalContextProvider = ({ children }: Props) => {
	const {
		credentials: globalCredentials,
		addFacebookCredential,
		addFirebaseCredential,
		addGoogleCredential,
		resetCredentials,
		addAppleCredential,
		deleteCred,
		importCredentials,
		editCredential,
	} = useCredentialManager();

	const [currentCred, setCurrentCred] = useState<
		CurrentCredential | undefined
	>();

	return (
		<ctx.Provider
			value={{
				currentCredential: currentCred,
				setCurrentCredential: setCurrentCred,
				globalCredentials,
				addAppleCredential,
				addFacebookCredential,
				deleteCredential: deleteCred,
				addFirebaseCredential,
				resetCredentials,
				addGoogleCredential,
				importCredentials,
				editCredential,
			}}
		>
			{children}
		</ctx.Provider>
	);
};

// eslint-disable-next-line react-refresh/only-export-components
export const useGlobalContext = () => useContext(ctx);
