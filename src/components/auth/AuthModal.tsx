import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  X,
  Mail,
  Lock,
  User,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Sparkles,
  ShieldCheck,
  Check,
  KeyRound
} from 'lucide-react';
import { isSupabaseConfigured } from '../../services/supabaseClient';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    authMode,
    closeAuthModal,
    openAuthModal,
    sendEmailOtp,
    verifyEmailOtp,
    signUpWithPassword,
    signInWithPassword
  } = useAuth();

  // Registration Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Sign In Tab State ('otp' | 'password')
  const [signInMethod, setSignInMethod] = useState<'otp' | 'password'>('otp');

  // OTP Verification State
  const [otpCode, setOtpCode] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Validation Flags
  const isNameValid = fullName.trim().length >= 2 && /^[a-zA-Z\s.'-]{2,50}$/.test(fullName.trim());
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const hasMinLength = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);
  const isPasswordStrong = hasMinLength && hasUpper && hasLower && hasNumber && hasSpecial;
  const isPasswordMatching = password.length > 0 && password === confirmPassword;

  // Countdown timer for resending OTP
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isOtpSent && countdown > 0) {
      timer = setTimeout(() => setCountdown(prev => prev - 1), 1000);
    } else if (countdown === 0) {
      setCanResend(true);
    }
    return () => clearTimeout(timer);
  }, [isOtpSent, countdown]);

  // Reset form when modal opens or closes
  useEffect(() => {
    if (isAuthModalOpen) {
      setErrorMessage(null);
      setSuccessMessage(null);
      setIsOtpSent(false);
      setOtpCode('');
      setCountdown(60);
      setCanResend(false);
    }
  }, [isAuthModalOpen, authMode]);

  if (!isAuthModalOpen) return null;

  // Handle Registration Submit (Validates Name, Email, Password, Confirm Password -> Dispatches OTP)
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!isNameValid) {
      setErrorMessage('Please enter a valid full name (letters only, minimum 2 characters).');
      return;
    }

    if (!isEmailValid) {
      setErrorMessage('Please enter a valid email address (e.g. founder@domain.com).');
      return;
    }

    if (!isPasswordStrong) {
      setErrorMessage('Password must be at least 8 characters and include uppercase, lowercase, number, and special character.');
      return;
    }

    if (!isPasswordMatching) {
      setErrorMessage('Passwords do not match. Please re-enter.');
      return;
    }

    setLoading(true);
    const { error } = await signUpWithPassword(email.trim(), password, fullName.trim());
    setLoading(false);

    if (error) {
      setErrorMessage(error);
    }
  };

  // Handle Sign In with Password
  const handlePasswordSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    const { error } = await signInWithPassword(email.trim(), password);
    setLoading(false);

    if (error) {
      setErrorMessage(error);
    }
  };

  // Handle Direct Gmail OTP Send (For Sign In)
  const handleSendGmailOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!isEmailValid) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    const { error } = await sendEmailOtp(email.trim());
    setLoading(false);

    if (error) {
      setErrorMessage(error);
    } else {
      setIsOtpSent(true);
      setCountdown(60);
      setCanResend(false);
      setSuccessMessage(`A 6-digit sign-in OTP was sent to ${email.trim()}`);
    }
  };

  // Handle OTP Code Verification
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpCode.trim() || otpCode.trim().length < 6) {
      setErrorMessage('Please enter the complete 6-digit OTP code.');
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    const { error } = await verifyEmailOtp(
      email.trim(),
      otpCode.trim(),
      authMode === 'register' ? 'signup' : 'email'
    );
    setLoading(false);

    if (error) {
      setErrorMessage(error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050505]/85 dark:bg-[#050505]/85 light:bg-[#F7F1E5]/85 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-lg rounded-3xl bg-[#0B0B0D] dark:bg-[#0B0B0D] light:bg-[#FFF9EE] border border-white/15 dark:border-white/15 light:border-[#E6D9C4] shadow-2xl p-6 sm:p-8 font-mono text-left space-y-5 max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-5 right-5 p-2 rounded-full text-[#A7A7AD] hover:text-[#F5F5F5] hover:bg-white/5 transition-colors"
          title="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-widest text-[#B8A7FF] dark:text-[#B8A7FF] light:text-[#D6AA35] font-bold">
              GENESIS ACCESS
            </span>
            {!isSupabaseConfigured() && (
              <span className="px-2 py-0.5 rounded text-[8px] bg-amber-500/10 text-amber-500 border border-amber-500/20">
                Preview Mode
              </span>
            )}
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32]">
            {isOtpSent
              ? 'Enter 6-Digit OTP Code'
              : authMode === 'register'
              ? 'Create Founder Account'
              : 'Sign In to Genesis'}
          </h2>
          <p className="text-xs text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#58724A] leading-relaxed">
            {isOtpSent
              ? `Check your inbox at ${email}. Enter the code below to complete verification.`
              : authMode === 'register'
              ? 'Sign up via email verification to access your AI Cofounder workspace and venture intelligence.'
              : 'Sign in to access your saved ventures and real-time signal monitoring.'}
          </p>
        </div>

        {/* Feedback Messages */}
        {errorMessage && (
          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-red-500/10 border border-red-500/25 text-xs text-red-400 animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-xs text-emerald-400 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* ============================================================ */}
        {/* VIEW 1: ENTER & VERIFY 6-DIGIT OTP CODE                     */}
        {/* ============================================================ */}
        {isOtpSent ? (
          <form onSubmit={handleVerifyOtp} className="space-y-4 pt-1">
            <div className="p-4 rounded-2xl bg-[#050505]/70 dark:bg-[#050505]/70 light:bg-[#FFFFFF] border border-white/10 dark:border-white/10 light:border-[#E6D9C4] text-center space-y-3">
              <label className="block text-[11px] uppercase tracking-wider text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#7D9270] font-medium">
                Enter 6-Digit Email OTP
              </label>

              <input
                type="text"
                maxLength={6}
                value={otpCode}
                onChange={e => setOtpCode(e.target.value.replace(/\D/g, ''))}
                placeholder="••••••"
                autoFocus
                className="w-full text-center tracking-[0.45em] text-3xl font-mono font-bold px-4 py-3 rounded-xl bg-[#0B0B0D] dark:bg-[#0B0B0D] light:bg-[#F7F1E5] border border-white/20 dark:border-white/20 light:border-[#D6AA35]/40 text-[#B8A7FF] dark:text-[#B8A7FF] light:text-[#304B32] focus:outline-none focus:ring-2 focus:ring-[#B8A7FF]/40"
              />

              <p className="text-[11px] text-[#A7A7AD]">
                Enter the 6-digit code above, or simply click the <strong>1-click login link</strong> sent to your email to sign in instantly.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading || otpCode.length < 6}
              className="w-full py-3.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase bg-[#B8A7FF] dark:bg-[#B8A7FF] light:bg-[#D6AA35] text-[#050505] dark:text-[#050505] light:text-[#1C3B2B] shadow-xl hover:scale-[1.01] active:scale-98 transition-all disabled:opacity-40 flex items-center justify-center gap-2"
            >
              {loading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  VERIFY & ENTER APPLICATION
                </>
              )}
            </button>

            <div className="flex items-center justify-between text-xs text-[#A7A7AD] pt-1">
              <button
                type="button"
                onClick={() => setIsOtpSent(false)}
                className="hover:underline text-[11px] text-[#A7A7AD]"
              >
                ← Back / Edit Info
              </button>

              <button
                type="button"
                disabled={!canResend || loading}
                onClick={() => {
                  if (authMode === 'register') {
                    handleRegisterSubmit(new Event('submit') as any);
                  } else {
                    handleSendGmailOtp();
                  }
                }}
                className={`text-[11px] font-bold ${
                  canResend
                    ? 'text-[#B8A7FF] dark:text-[#B8A7FF] light:text-[#65A30D] hover:underline cursor-pointer'
                    : 'text-[#74747B] cursor-not-allowed'
                }`}
              >
                {canResend ? 'Resend OTP Code' : `Resend in ${countdown}s`}
              </button>
            </div>
          </form>
        ) : authMode === 'register' ? (
          /* ============================================================ */
          /* VIEW 2: SINGLE MANDATORY REGISTRATION FLOW (NAME, EMAIL,     */
          /*         PASSWORD, CONFIRM PASSWORD -> OTP DISPATCH)         */
          /* ============================================================ */
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            
            {/* 1. Full Name */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-[10px] uppercase tracking-wider text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#7D9270] font-medium">
                  Full Name *
                </label>
                {fullName.length > 0 && (
                  <span className={`text-[10px] ${isNameValid ? 'text-emerald-400' : 'text-red-400'}`}>
                    {isNameValid ? 'Valid' : 'Letters only (min 2)'}
                  </span>
                )}
              </div>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A7A7AD]" />
                <input
                  type="text"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  placeholder="e.g. Alex Morgan"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#050505] dark:bg-[#050505] light:bg-[#FFFFFF] border border-white/10 dark:border-white/10 light:border-[#E6D9C4] text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32] text-xs focus:outline-none focus:border-[#B8A7FF]"
                />
              </div>
            </div>

            {/* 2. Email Address */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-[10px] uppercase tracking-wider text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#7D9270] font-medium">
                  Email Address *
                </label>
                {email.length > 0 && (
                  <span className={`text-[10px] ${isEmailValid ? 'text-emerald-400' : 'text-red-400'}`}>
                    {isEmailValid ? 'Valid Email' : 'Invalid Email'}
                  </span>
                )}
              </div>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A7A7AD]" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="founder@gmail.com"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#050505] dark:bg-[#050505] light:bg-[#FFFFFF] border border-white/10 dark:border-white/10 light:border-[#E6D9C4] text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32] text-xs focus:outline-none focus:border-[#B8A7FF]"
                />
              </div>
            </div>

            {/* 3. Password */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-[10px] uppercase tracking-wider text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#7D9270] font-medium">
                  Password *
                </label>
                {password.length > 0 && (
                  <span className={`text-[10px] ${isPasswordStrong ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {isPasswordStrong ? 'Strong' : 'Requirements pending'}
                  </span>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A7A7AD]" />
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Min 8 chars (A-Z, a-z, 0-9, symbol)"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#050505] dark:bg-[#050505] light:bg-[#FFFFFF] border border-white/10 dark:border-white/10 light:border-[#E6D9C4] text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32] text-xs focus:outline-none focus:border-[#B8A7FF]"
                />
              </div>

              {/* Password Rule Checklist */}
              {password.length > 0 && (
                <div className="grid grid-cols-2 gap-1.5 pt-1 text-[10px]">
                  <span className={`flex items-center gap-1 ${hasMinLength ? 'text-emerald-400' : 'text-[#74747B]'}`}>
                    <Check className={`w-3 h-3 ${hasMinLength ? 'opacity-100' : 'opacity-40'}`} /> 8+ Characters
                  </span>
                  <span className={`flex items-center gap-1 ${hasUpper && hasLower ? 'text-emerald-400' : 'text-[#74747B]'}`}>
                    <Check className={`w-3 h-3 ${hasUpper && hasLower ? 'opacity-100' : 'opacity-40'}`} /> Upper & Lowercase
                  </span>
                  <span className={`flex items-center gap-1 ${hasNumber ? 'text-emerald-400' : 'text-[#74747B]'}`}>
                    <Check className={`w-3 h-3 ${hasNumber ? 'opacity-100' : 'opacity-40'}`} /> Includes Number
                  </span>
                  <span className={`flex items-center gap-1 ${hasSpecial ? 'text-emerald-400' : 'text-[#74747B]'}`}>
                    <Check className={`w-3 h-3 ${hasSpecial ? 'opacity-100' : 'opacity-40'}`} /> Special Symbol
                  </span>
                </div>
              )}
            </div>

            {/* 4. Confirm Password */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-[10px] uppercase tracking-wider text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#7D9270] font-medium">
                  Confirm Password *
                </label>
                {confirmPassword.length > 0 && (
                  <span className={`text-[10px] ${isPasswordMatching ? 'text-emerald-400' : 'text-red-400'}`}>
                    {isPasswordMatching ? 'Passwords match' : 'Does not match'}
                  </span>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A7A7AD]" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder="Repeat your password"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#050505] dark:bg-[#050505] light:bg-[#FFFFFF] border border-white/10 dark:border-white/10 light:border-[#E6D9C4] text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32] text-xs focus:outline-none focus:border-[#B8A7FF]"
                />
              </div>
            </div>

            {/* Primary Submit Button */}
            <button
              type="submit"
              disabled={loading || !isNameValid || !isEmailValid || !isPasswordStrong || !isPasswordMatching}
              className="w-full py-3.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase bg-[#B8A7FF] dark:bg-[#B8A7FF] light:bg-[#D6AA35] text-[#050505] dark:text-[#050505] light:text-[#1C3B2B] shadow-xl hover:scale-[1.01] active:scale-98 transition-all disabled:opacity-40 flex items-center justify-center gap-2 pt-2"
            >
              {loading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  CREATE FOUNDER ACCOUNT
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Switch to Sign In */}
            <div className="text-center pt-2">
              <p className="text-xs text-[#A7A7AD]">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => openAuthModal('signin')}
                  className="text-[#B8A7FF] dark:text-[#B8A7FF] light:text-[#8C6D15] font-bold hover:underline"
                >
                  Sign In
                </button>
              </p>
            </div>
          </form>
        ) : (
          /* ============================================================ */
          /* VIEW 3: SIGN IN OPTIONS (PASSWORD OR GMAIL CODE & LINK)      */
          /* ============================================================ */
          <div className="space-y-4">
            
            {/* Method Switcher Tabs */}
            <div className="grid grid-cols-2 p-1 rounded-xl bg-[#050505] dark:bg-[#050505] light:bg-[#F7F1E5] border border-white/10 dark:border-white/10 light:border-[#E6D9C4] text-xs">
              <button
                type="button"
                onClick={() => { setSignInMethod('password'); setErrorMessage(null); }}
                className={`py-2 rounded-lg text-center transition-all ${
                  signInMethod === 'password'
                    ? 'bg-[#B8A7FF] dark:bg-[#B8A7FF] light:bg-[#D6AA35] text-[#050505] font-bold shadow-md'
                    : 'text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#7D9270] hover:text-[#F5F5F5]'
                }`}
              >
                Email & Password
              </button>
              <button
                type="button"
                onClick={() => { setSignInMethod('otp'); setErrorMessage(null); }}
                className={`py-2 rounded-lg text-center transition-all ${
                  signInMethod === 'otp'
                    ? 'bg-[#B8A7FF] dark:bg-[#B8A7FF] light:bg-[#D6AA35] text-[#050505] font-bold shadow-md'
                    : 'text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#7D9270] hover:text-[#F5F5F5]'
                }`}
              >
                Gmail Code & Link
              </button>
            </div>

            {/* METHOD A: EMAIL & PASSWORD FORM */}
            {signInMethod === 'password' && (
              <form onSubmit={handlePasswordSignIn} className="space-y-4">
                <div className="space-y-1">
                  <label className="block text-[10px] uppercase tracking-wider text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#7D9270] font-medium">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A7A7AD]" />
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="founder@gmail.com"
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#050505] dark:bg-[#050505] light:bg-[#FFFFFF] border border-white/10 dark:border-white/10 light:border-[#E6D9C4] text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32] text-xs focus:outline-none focus:border-[#B8A7FF]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] uppercase tracking-wider text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#7D9270] font-medium">
                    Password *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A7A7AD]" />
                    <input
                      type="password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="Enter your account password"
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#050505] dark:bg-[#050505] light:bg-[#FFFFFF] border border-white/10 dark:border-white/10 light:border-[#E6D9C4] text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32] text-xs focus:outline-none focus:border-[#B8A7FF]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || !email.trim() || !password.trim()}
                  className="w-full py-3.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase bg-[#B8A7FF] dark:bg-[#B8A7FF] light:bg-[#D6AA35] text-[#050505] dark:text-[#050505] light:text-[#1C3B2B] shadow-xl hover:scale-[1.01] active:scale-98 transition-all disabled:opacity-40 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <KeyRound className="w-4 h-4" />
                      SIGN IN WITH PASSWORD
                    </>
                  )}
                </button>
              </form>
            )}

            {/* METHOD B: GMAIL OTP & 1-CLICK LINK FORM */}
            {signInMethod === 'otp' && (
              <form onSubmit={handleSendGmailOtp} className="space-y-4">
                <div className="space-y-1">
                  <label className="block text-[10px] uppercase tracking-wider text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#7D9270] font-medium">
                    Your Gmail / Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A7A7AD]" />
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="founder@gmail.com"
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#050505] dark:bg-[#050505] light:bg-[#FFFFFF] border border-white/10 dark:border-white/10 light:border-[#E6D9C4] text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32] text-xs focus:outline-none focus:border-[#B8A7FF]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || !isEmailValid}
                  className="w-full py-3.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase bg-[#B8A7FF] dark:bg-[#B8A7FF] light:bg-[#D6AA35] text-[#050505] dark:text-[#050505] light:text-[#1C3B2B] shadow-xl hover:scale-[1.01] active:scale-98 transition-all disabled:opacity-40 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      SEND CODE & 1-CLICK LINK VIA GMAIL
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Switch to Register */}
            <div className="text-center pt-2">
              <p className="text-xs text-[#A7A7AD]">
                New founder?{' '}
                <button
                  type="button"
                  onClick={() => openAuthModal('register')}
                  className="text-[#B8A7FF] dark:text-[#B8A7FF] light:text-[#8C6D15] font-bold hover:underline"
                >
                  Create an account
                </button>
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
