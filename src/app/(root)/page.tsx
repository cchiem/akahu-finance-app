import HeaderBox from "@/components/HeaderBox";
import React from "react";

import TotalBalanceBox from "@/components/TotalBalanceBox";
import RightSidebar from "@/components/RightSidebar";

const Home = () => {
    const loggedIn = {
        firstName: "Chris",
        lastName: "Chiem",
        email: "chris.chiem01@gmail.com",
    };
    return (
        <section className="home">
            <div className="home-content">
                <header className="home-header">
                    <HeaderBox
                        type="greeting"
                        title="Welcome"
                        user="Guest"
                        subtext="Access and manage your accounts and transactions effectively"
                    />

                    <TotalBalanceBox
                        accounts={[]}
                        totalBanks={1}
                        totalCurrentBalance={1250.35}
                    />
                </header>
                RECENT TRANSACTIONS
            </div>

            <RightSidebar
                user={loggedIn}
                transactions={[]}
                banks={[{ currentBalance: 123.5 }, { currentBalance: 123.5 }]}
            />
        </section>
    );
};

export default Home;
