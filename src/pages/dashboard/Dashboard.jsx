import React from "react";
import DashboardStats from "../../components/Dashboard/Stats";
import DashboardCharts from "../../components/Dashboard/Charts";
import DashboardQuickActions from "../../components/Dashboard/QuicAction";
import RecentActivities from "../../components/Dashboard/RecentActivities";

function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-6">
      <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-8">
        Dashboard
      </h1>

      {/* Step 1: Stats Cards */}
      <DashboardStats />
      <DashboardCharts />
      <DashboardQuickActions />
      <RecentActivities />
    </div>
  );
}

export default DashboardPage;
