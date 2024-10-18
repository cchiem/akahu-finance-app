import HeaderBox from "@/components/HeaderBox";
import React from "react";

import TotalBalanceBox from "@/components/TotalBalanceBox";

const Home = () => {
    const loggedIn = { firstName: "Chris" };
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
            </div>
        </section>
    );
};

export default Home;
