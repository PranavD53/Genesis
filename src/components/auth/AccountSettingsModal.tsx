import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useVenture } from '../../context/VentureContext';
import {
  X,
  User,
  Mail,
  ShieldCheck,
  Calendar,
  LogOut,
  Trash2,
  AlertTriangle,
  RefreshCw,
  Sparkles
} from 'lucide-react';

export const AccountSettingsModal: React.FC = () => {
  const {
    user,
    isAccountSettingsOpen,
    closeAccountSettings,
    signOut,
    deleteAccount
  } = useAuth();
  const { resetVenture } = useVenture();

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isAccountSettingsOpen || !user) return null;

  const displayName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'Founder';
  const email = user.email || 'founder@venture.com';
  const provider = user.app_metadata?.provider || (user.email?.includes('gmail') ? 'Google / Gmail' : 'Email');
  const userInitial = displayName.charAt(0).toUpperCase();

  const createdDate = user.created_at
    ? new Date(user.created_at).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    : 'Recent';

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    setErrorMessage(null);
    const { error } = await deleteAccount();
    setIsDeleting(false);

    if (error) {
      setErrorMessage(error);
    } else {
      setConfirmDelete(false);
      resetVenture('opening');
      closeAccountSettings();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050505]/85 dark:bg-[#050505]/85 light:bg-[#F7F1E5]/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#0B0B0D] dark:bg-[#0B0B0D] light:bg-[#FFF9EE] border border-white/15 dark:border-white/15 light:border-[#E6D9C4] shadow-2xl p-6 sm:p-8 font-mono text-left space-y-6">
        
        {/* Close Button */}
        <button
          onClick={() => {
            setConfirmDelete(false);
            closeAccountSettings();
          }}
          className="absolute top-5 right-5 p-2 rounded-full text-[#A7A7AD] hover:text-[#F5F5F5] hover:bg-white/5 transition-colors"
          title="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-widest text-[#B8A7FF] dark:text-[#B8A7FF] light:text-[#D6AA35] font-bold">
              FOUNDER ACCOUNT
            </span>
          </div>
          <h2 className="text-2xl font-medium tracking-tight text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32]">
            Personal Account Settings
          </h2>
          <p className="text-xs text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#58724A]">
            Manage your Genesis founder identity, cloud sessions, and venture data.
          </p>
        </div>

        {errorMessage && (
          <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-400">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Profile Details Card */}
        <div className="p-4 rounded-2xl bg-[#050505]/80 dark:bg-[#050505]/80 light:bg-[#FFFFFF] border border-white/10 dark:border-white/10 light:border-[#E6D9C4] space-y-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#74747B] via-[#B8A7FF] to-[#9180FF] flex items-center justify-center text-lg font-bold text-black uppercase shadow-lg">
              {userInitial}
            </div>
            <div>
              <h3 className="text-base font-bold text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32] leading-tight">
                {displayName}
              </h3>
              <p className="text-xs text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#7D9270] flex items-center gap-1.5 mt-0.5">
                <Mail className="w-3.5 h-3.5" />
                {email}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10 dark:border-white/10 light:border-[#E6D9C4] text-xs">
            <div className="space-y-0.5">
              <span className="text-[10px] uppercase tracking-wider text-[#74747B]">Auth Method</span>
              <div className="flex items-center gap-1.5 text-xs text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#B8A7FF] dark:text-[#B8A7FF] light:text-[#65A30D]" />
                <span className="capitalize">{provider}</span>
              </div>
            </div>

            <div className="space-y-0.5">
              <span className="text-[10px] uppercase tracking-wider text-[#74747B]">Member Since</span>
              <div className="flex items-center gap-1.5 text-xs text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32]">
                <Calendar className="w-3.5 h-3.5 text-[#A7A7AD]" />
                <span>{createdDate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sign Out Action */}
        <div className="space-y-2">
          <button
            onClick={async () => {
              await signOut();
              resetVenture('opening');
              closeAccountSettings();
            }}
            className="w-full py-3 px-4 rounded-xl text-xs font-mono font-medium tracking-wider uppercase bg-white/5 hover:bg-white/10 dark:bg-white/5 dark:hover:bg-white/10 light:bg-[#F7F1E5] light:hover:bg-[#E6D9C4] text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32] border border-white/10 dark:border-white/10 light:border-[#E6D9C4] transition-all flex items-center justify-center gap-2"
          >
            <LogOut className="w-4 h-4 text-[#A7A7AD]" />
            SIGN OUT OF THIS DEVICE
          </button>
        </div>

        {/* Danger Zone: Delete Account */}
        <div className="p-4 rounded-2xl border border-red-500/25 bg-red-500/5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h4 className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
                <Trash2 className="w-3.5 h-3.5" />
                Delete Account
              </h4>
              <p className="text-[11px] text-[#A7A7AD] leading-relaxed">
                Permanently delete your profile and wipe all venture data.
              </p>
            </div>

            {!confirmDelete && (
              <button
                type="button"
                onClick={() => setConfirmDelete(true)}
                className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-red-400 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 transition-colors shrink-0"
              >
                Delete
              </button>
            )}
          </div>

          {confirmDelete && (
            <div className="p-3.5 rounded-xl bg-[#050505] dark:bg-[#050505] light:bg-[#FFF9EE] border border-red-500/40 space-y-3 text-xs animate-in fade-in duration-150">
              <p className="text-red-300 text-[11px] font-medium leading-relaxed">
                ⚠️ Are you sure? This will delete your account and all associated ventures permanently. This cannot be undone.
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={isDeleting}
                  onClick={handleDeleteAccount}
                  className="flex-1 py-2 rounded-lg text-xs font-bold bg-red-600 hover:bg-red-700 text-white shadow-md flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50"
                >
                  {isDeleting ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : 'Yes, Delete Permanently'}
                </button>
                <button
                  type="button"
                  disabled={isDeleting}
                  onClick={() => setConfirmDelete(false)}
                  className="px-3 py-2 rounded-lg text-xs font-medium text-[#A7A7AD] hover:text-[#F5F5F5] bg-white/5 border border-white/10 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
