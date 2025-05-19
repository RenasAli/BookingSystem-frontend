/* eslint-disable @typescript-eslint/no-explicit-any */
import { Navigate } from 'react-router-dom';
import React from 'react';
import Cookies from "js-cookie";



interface RoleGuardProps {
    allowedRoles: string[];
    children: React.ReactNode;
  }

  export const RoleGuard: React.FC<RoleGuardProps> = ({ allowedRoles, children }) => {
    const role = Cookies.get("role");
    if(!role){
      return <Navigate to="/login" /> ; 
    }
    if (!allowedRoles.includes(role)) {
      return null
    }
  
    return <>{children}</>;
  }; 

  export const RoleProtectedRoute: React.FC<RoleGuardProps> = ({ allowedRoles, children }) => {
    const role = Cookies.get("role");

    if (!role || !allowedRoles.includes(role)) {
      if (!role) {
        return <Navigate to="/login" /> ; 
      }
      if (role === "company_admin" || role === "company_staff") {
        return <Navigate to="/dashboard/bookings" />
      } else if (role === "admin") {
        return <Navigate to="/dashboard/companies" />
      }
    }
    
    return <>{children}</>;
  };

  interface RoleProtectedElementProps {
    allowedRoles: string[];
    children: React.ReactElement;
    fallback?: React.ReactElement;
  }
  
  export const RoleProtectedElement: React.FC<RoleProtectedElementProps> = ({ allowedRoles, children, fallback = null }) => {
    const role = Cookies.get("role");
  
    const isAllowed = role && allowedRoles.includes(role);
  
    if (!isAllowed) {
      if (React.isValidElement(children)) {
        const type = (children.type as any)?.displayName || children.type;
  
        const props: any = {};
        if (type === "Button" || type === "button" || type === "Select" || type === "select") {
          props.isDisabled = true;
        } else if (type === "Input" || type === "input") {
          props.isReadOnly = true;
        } else {
          return fallback;
        }
  
        return React.cloneElement(children, props);
      }
  
      return fallback;
    }
  
    return children;
  };
