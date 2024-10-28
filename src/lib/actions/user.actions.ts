"use server";

import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";

export const signIn = async () => {
    try {
        // Mutation / Database / Make Fetch
    } catch (error) {
        console.error("Error", error);
    }
};

export const signUp = async (userData: SignUpParams) => {
    const { email, password, firstName, lastName } = userData;
    try {
        const { account } = await createAdminClient();

        const newUserAccount = await account.create(
            ID.unique(),
            email,
            password,
            `${firstName} ${lastName}` // name
        );
        const session = await account.createEmailPasswordSession(
            email,
            password
        );

        cookies().set("appwrite-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });

        return parseStringify(newUserAccount); // becasue u cant return large objects, first stringify it
    } catch (error) {
        console.error("Error", error);
    }
};

export async function getLoggedInUser() {
    try {
        const { account } = await createSessionClient();
        const user = await account.get();

        return parseStringify(user);
    } catch (error) {
        console.log(error);
        return null;
    }
}