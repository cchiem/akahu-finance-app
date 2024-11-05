import HeaderBox from "@/components/HeaderBox";
import React from "react";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import RightSidebar from "@/components/RightSidebar";
import { getLoggedInUser } from "@/lib/actions/user.actions";

const Home = async () => {
    let loggedIn;
    try {
        loggedIn = await getLoggedInUser();
    } catch (error) {
        console.error("Error fetching logged-in user:", error);
    }

    const banks = [
        { id: 1, currentBalance: 123.5 },
        { id: 2, currentBalance: 123.5 },
    ];

    return (
        <section className="home">
            <div className="home-content">
                <header className="home-header">
                    <HeaderBox
                        type="greeting"
                        title="Welcome"
                        user={loggedIn?.firstName || "Guest"}
                        subtext="Access and manage your accounts and transactions effectively"
                    />

                    <TotalBalanceBox
                        accounts={[]}
                        totalBanks={banks.length}
                        totalCurrentBalance={1250.35}
                    />
                </header>

                <div className="recent-transactions">
                    <h2>RECENT TRANSACTIONS</h2>
                    {/* Transaction data can be mapped here if available */}
                </div>
            </div>

            <RightSidebar
                user={loggedIn}
                transactions={[]} // Replace with actual transaction data
                banks={banks}
            />
        </section>
    );
};

export default Home;
