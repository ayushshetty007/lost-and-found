import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import DashboardHome from './DashboardHome';
import UploadItem from './UploadItem';
import LostItems from './LostItems';
import FoundItems from './FoundItems';
import Profile from './Profile';

const Dashboard = () => {
  return (
    <div className="pt-20 min-h-screen flex">
      <Sidebar />
      <div className="flex-1 p-6 overflow-y-auto h-[calc(100vh-80px)]">
        <Routes>
          <Route path="/" element={<DashboardHome />} />
          <Route path="/lost" element={<LostItems />} />
          <Route path="/found" element={<FoundItems />} />
          <Route path="/upload" element={<UploadItem />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
