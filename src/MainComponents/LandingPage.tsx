// src/pages/LandingPage.tsx

import React, { useState } from "react";
import Header from "../components/Header";
import Moto from "../components/Moto";
import Card from "../components/Card";
import Footer from "../components/Footer";

const LandingPage: React.FC = () => {
  const [showLastMonth, setShowLastMonth] = useState(true);

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Header />
      <main className="px-4 sm:px-10 flex-grow">
        <Moto />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card title="About Us" width="col-span-1 sm:col-span-1 lg:col-span-1">
            <p>
              Welcome to the Personal Expense Tracker! This application allows you
              to track your daily expenses and manage your financial activities
              efficiently.
            </p>
          </Card>
          <Card title="Expenses" width="col-span-1 sm:col-span-1 lg:col-span-2">
            <div className="flex gap-3 justify-center mb-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => setShowLastMonth(true)}
              >
                Last Month Expense
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => setShowLastMonth(false)}
              >
                This Month Expense
              </button>
            </div>
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Category</th>
                  <th className="py-2 px-4 border-b">Amount</th>
                </tr>
              </thead>
              <tbody>
                {showLastMonth ? (
                  <>
                    <tr>
                      <td className="py-2 px-4 border-b">Food</td>
                      <td className="py-2 px-4 border-b">$200</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b">Transport</td>
                      <td className="py-2 px-4 border-b">$50</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b">Entertainment</td>
                      <td className="py-2 px-4 border-b">$75</td>
                    </tr>
                  </>
                ) : (
                  <>
                    <tr>
                      <td className="py-2 px-4 border-b">Food</td>
                      <td className="py-2 px-4 border-b">$180</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b">Transport</td>
                      <td className="py-2 px-4 border-b">$60</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b">Entertainment</td>
                      <td className="py-2 px-4 border-b">$90</td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
