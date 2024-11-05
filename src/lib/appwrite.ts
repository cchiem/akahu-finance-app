// src/lib/server/appwrite.js
"use server";
import { Client, Account, Databases, Users } from "node-appwrite";
import { cookies } from "next/headers";

// Creates a regular person client
export async function createSessionClient() {
    const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
    const project = process.env.NEXT_PUBLIC_APPWRITE_PROJECT;

    if (!endpoint || !project) {
        throw new Error(
            "Appwrite endpoint or project ID is missing from environment variables."
        );
    }

    const client = new Client().setEndpoint(endpoint).setProject(project);

    const session = cookies().get("appwrite-session");
    if (!session || !session.value) {
        throw new Error("No session cookie found. Please log in.");
    }

    client.setSession(session.value);

    return {
        get account() {
            return new Account(client);
        },
    };
}

// Creates an admin client with full permissions using API key
export async function createAdminClient() {
    const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
    const project = process.env.NEXT_PUBLIC_APPWRITE_PROJECT;
    const apiKey = process.env.NEXT_APPWRITE_KEY;

    if (!endpoint || !project || !apiKey) {
        throw new Error(
            "Appwrite endpoint, project ID, or API key is missing from environment variables."
        );
    }

    const client = new Client()
        .setEndpoint(endpoint)
        .setProject(project)
        .setKey(apiKey);

    return {
        get account() {
            return new Account(client);
        },
        get database() {
            return new Databases(client);
        },
        get user() {
            return new Users(client);
        },
    };
}
