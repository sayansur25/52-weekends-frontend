'use client';

import React, { ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth';

interface RoleGuardProps {
  allowedRoles: string[];
  children: ReactNode;
  fallback?: ReactNode;
}

export const RoleGuard: React.FC<RoleGuardProps> = ({
  allowedRoles,
  children,
  fallback = <div className="p-8 text-center text-red-600">Access Denied</div>
}) => {
  const { role, loading, isAuthenticated } = useAuth();

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  if (!isAuthenticated || !role) {
    return (
      <div className="p-8 text-center text-red-600">
        Please log in to access this page
      </div>
    );
  }

  if (!allowedRoles.includes(role)) {
    return fallback;
  }

  return <>{children}</>;
};
