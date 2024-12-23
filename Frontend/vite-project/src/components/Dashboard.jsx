import { Coins, ArrowRight, Zap, Gift, StopCircle, BarChart } from 'lucide-react';
import Button from './ui/Button';
import Navbar from './layout/Navbar';
import axios from 'axios';
import Footer from './layout/Footer';
import { handleStartMining, handleStopMining, handleCheckStatus, handleViewProgress, handleClaimRewards } from './handlers';
function DashboardPage() {

 
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="flex-grow px-6 py-10 sm:px-8 lg:px-12">
        <section className="relative bg-[radial-gradient(circle_at_top_right,_#FFC107_0%,_transparent_35%)] py-8 px-6 rounded-lg shadow-lg">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-yellow-500 mb-4">Welcome to SigCoin Dashboard</h1>
            <p className="text-lg text-gray-300 mb-6">
              Manage your mining journey, track progress, and claim your rewards
            </p>
            <Button size="lg" variant="secondary">
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>

        <section className="my-16 bg-zinc-900 py-8 px-6 rounded-lg shadow-lg">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-semibold text-yellow-500">Mining Controls</h2>
            <p className="text-gray-400 mt-2">Interact with mining tools to manage your mining experience</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <ControlCard
              title="Start Mining"
              description="Begin your mining journey."
              icon={<Zap className="h-8 w-8 text-yellow-500" />}
              buttonText="Start"
              onClick={handleStartMining}
            />
            <ControlCard
              title="Stop Mining"
              description="Pause mining at any time."
              icon={<StopCircle className="h-8 w-8 text-red-500" />}
              buttonText="Stop"
              onClick={handleStopMining}
            />
            <ControlCard
              title="See Status"
              description="Check current mining health and status."
              icon={<BarChart className="h-8 w-8 text-blue-500" />}
              buttonText="Check Status"
              onClick={handleCheckStatus}
            />
            <ControlCard
              title="See Progress"
              description="View detailed mining progress data."
              icon={<Coins className="h-8 w-8 text-green-500" />}
              buttonText="View Progress"
              onClick={handleViewProgress}
            />
            <ControlCard
              title="Claim Rewards"
              description="Claim your earned coins and rewards."
              icon={<Gift className="h-8 w-8 text-yellow-500" />}
              buttonText="Claim"
              onClick={handleClaimRewards}
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function ControlCard({ title, description, icon, buttonText, onClick }) {
  return (
    <div className="bg-black p-6 rounded-lg shadow-lg hover:shadow-yellow-500/30 transition-all duration-300 border border-zinc-800 hover:border-yellow-500/20 cursor-pointer">
      <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-yellow-500/10 mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm mb-2">{description}</p>
      <button
        onClick={onClick}
        className="bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-2 rounded-md transition duration-200"
      >
        {buttonText}
      </button>
    </div>
  );
}

export default DashboardPage;
