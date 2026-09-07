// src/dashboards/admin/AdminDashboard.tsx
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { SidebarLayout } from '../components/SidebarLayout';
import RoleDashboard from '../RoleDashboard';
import ContentManagement from './ContentManagement';
import Courses from './Courses';
import Podcasts from './Podcasts';
import Messages from './Messages';
import Settings from './Settings';
import Analytics from './Analytics';
import Promotions from './Promotions';
import UserManagement from './UserManagement';
import YoutubeArchiveManager from './YoutubeArchiveManager';

const AdminDashboard: React.FC = () => {
  const location = useLocation();
  const locationState = (location.state as { userName?: string; userEmail?: string }) || {};

  return (
    <SidebarLayout
      userRole="admin"
      userName={locationState.userName}
      userEmail={locationState.userEmail}
      activeView="admin"
    >
      <Routes>
        <Route index element={<RoleDashboard defaultRole="admin" />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="content" element={<ContentManagement />} />
        <Route path="courses" element={<Courses />} />
        <Route path="podcasts" element={<Podcasts />} />
        <Route path="youtube-archive" element={<YoutubeArchiveManager />} />
        <Route path="promotions" element={<Promotions />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="profile" element={
          <div className="p-8 space-y-4">
            <h1 className="text-3xl font-bold">Profile</h1>
            <p className="text-sm text-slate-600">Manage your admin profile details and preferences.</p>
          </div>
        } />
      </Routes>
    </SidebarLayout>
  );
};

export default AdminDashboard;