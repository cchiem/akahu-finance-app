import React from "react";
import { Button } from "./ui/button";
import { AkahuClient } from "akahu";
import Link from "next/link";

const appTokenEnv = process.env.NEXT_PUBLIC_AKAHU_APP_TOKEN;
if (!appTokenEnv) {
    throw new Error("Missing app token");
}

const akahu = new AkahuClient({
    // Configure your app token here.
    // App secret is not required and should not be included client-side.
    appToken: appTokenEnv,
});

const akahuOAuthRedirectUri = process.env.NEXT_PUBLIC_SITE_URL;
if (!akahuOAuthRedirectUri) {
    throw new Error("Missing app token");
}

const AkahuLink = ({ user, variant }: AkahuLinkProps) => {
    const authUrl = akahu.auth.buildAuthorizationUrl({
        redirect_uri: akahuOAuthRedirectUri,
        email: user.email, // Optionally prefill the users email address
    });
    return (
        <>
            {variant === "primary" ? (
                <Link className="plaidlink-primary" href={authUrl}>
                    Connect Bank
                </Link>
            ) : variant === "ghost" ? (
                <Button>Connect Bank</Button>
            ) : (
                <Button>Connect Bank</Button>
            )}
        </>
    );
};

export default AkahuLink;
