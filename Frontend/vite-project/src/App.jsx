import React from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { Coins, ArrowRight, Zap, Gift } from 'lucide-react';
import Button from './components/ui/Button';
import LoginPage from './components/Login';
import RegisterPage from './components/Register';
import DashboardPage from './components/Dashboard';
import Start from './components/Start';
import Stop from './components/Stop';
import Status from './components/Status';
import Progress from './components/Progress';

function App() {
  const path = window.location.pathname;

  if (path === '/login') {
    return <LoginPage />;
  }

  if (path === '/register') {
    return <RegisterPage />;
  }
  if (path === '/dashboard') {
    return <DashboardPage />;
  }
  if (path==='/start'){
    return <Start/>
  }
  if (path==='/stop'){
    return <Stop/>
  }
  if (path==='/status'){
    return <Status/>
  }
  if (path==='/progress'){
    return <Progress/>
  }



  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#FFC107_0%,_transparent_35%)]"></div>
          <div className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8 relative">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-500 to-yellow-200 bg-clip-text text-transparent">
                Mine Smarter with SigCoin
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-300">
                The next generation cryptocurrency platform that rewards you for your time
              </p>
              <div className="flex justify-center space-x-4">
                <Button size="lg">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="secondary" size="lg">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-zinc-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white">
                Why Choose <span className="text-yellow-500">SigCoin</span>?
              </h2>
              <p className="mt-4 text-xl text-gray-300">
                Discover the benefits of mining with us
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                title="Watch Ads"
                description="Earn coins by watching targeted advertisements"
                icon={<Zap className="h-8 w-8 text-yellow-500" />}
              />
              <FeatureCard
                title="Mine Coins"
                description="Start mining with just one click"
                icon={<Coins className="h-8 w-8 text-yellow-500" />}
              />
              <FeatureCard
                title="Claim Rewards"
                description="Get instant rewards for your mining efforts"
                icon={<Gift className="h-8 w-8 text-yellow-500" />}
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function FeatureCard({ title, description, icon }) {
  return (
    <div className="bg-black p-6 rounded-lg shadow-xl hover:shadow-yellow-500/10 transition-all duration-300 border border-zinc-800 hover:border-yellow-500/20">
      <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-yellow-500/10 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}

export default App;
