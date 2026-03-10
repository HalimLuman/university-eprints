'use client';
import { useState, useEffect } from "react";

export default function ManageUsers() {
  const [users, setUsers] = useState<Array<{ username: string; dept: string; role: string }>>([]);

  useEffect(() => {
    fetch("/api/admin/users").then(res => res.json()).then(setUsers);
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="bg-[#08335e] py-8 text-white">
        <div className="max-w-7xl mx-auto px-8">
          <h1 className="text-2xl font-serif font-bold uppercase">User Records</h1>
          <p className="text-blue-200 text-xs uppercase tracking-[0.2em]">Institutional Identity Management</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-8 py-10">
        <div className="bg-white border-t-4 border-slate-900 shadow-sm overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-left">
            <thead className="bg-slate-50 text-[10px] font-bold text-slate-500 uppercase">
              <tr>
                <th className="px-6 py-4">Username</th>
                <th className="px-6 py-4">Department</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {users.map(u => (
                <tr key={u.username}>
                  <td className="px-6 py-4 font-bold text-slate-900">{u.username}</td>
                  <td className="px-6 py-4 text-slate-600">{u.dept}</td>
                  <td className="px-6 py-4"><span className="text-[10px] font-bold border px-2 py-0.5">{u.role}</span></td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-[10px] font-bold text-red-600 uppercase">Reset Password</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}