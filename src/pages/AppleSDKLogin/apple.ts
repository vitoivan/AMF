/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// import crypto from "crypto";
export class AppleSDK {
  // Generate a new random string for each sign-in
  static generateNonce = async (length: number) => {
    const rand = Math.random().toString(16).substring(2, length);
    console.log(`rawNonce: ${rand}`)
    const utf8 = new TextEncoder().encode(rand);
    const hashBuffer = await crypto.subtle.digest('SHA-256', utf8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
    .map((bytes) => bytes.toString(16).padStart(2, '0'))
    .join('');
  return hashHex;
  };

  static async init(
    clientId: string,
    scope: string,
    redirectURI: string,
    usePopup = true
  ): Promise<void> {
    const nonce = await this.generateNonce(10);
    console.log({clientId,scope,redirectURI,usePopup,nonce})
    //@ts-ignore
    await AppleID.auth.init({ clientId, scope, redirectURI, nonce, usePopup });

  }

  static async login(): Promise<any> {
    try {
      //@ts-ignore
      const data = await AppleID.auth.signIn();

      console.log(data);
      return data;
    } catch (error) {
      console.log({ error });
    }
  }
}
