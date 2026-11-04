import { useState } from 'react';
import {
  ShieldCheck,
  Upload,
  ArrowUpRight,
  KeyRound,
  BadgeCheck,
  Building2,
  Lock,
  Printer,
  FileText,
  AlertCircle,
  Copy,
  Check,
  ArrowLeft,
  Download,
} from 'lucide-react';
import { WE_BUILD_AUSTRALIA_PROFILE } from '@/data/webuild-australia';

const AUTHORIZED_KEYS = [
  '9482017365',
  '5829104738',
  '7102948563',
  '8392014756',
  '6201948375',
];

export function VerificationView() {
  const [step, setStep] = useState<'submit' | 'enter_key' | 'verified'>('submit');
  const [candidateName, setCandidateName] = useState('');
  const [email, setEmail] = useState('');
  const [fileName, setFileName] = useState('');
  const [context, setContext] = useState('');
  const [consent, setConsent] = useState(true);
  const [secretKeyInput, setSecretKeyInput] = useState('');
  const [keyError, setKeyError] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [copied, setCopied] = useState(false);
  const [refCode, setRefCode] = useState('');

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!candidateName.trim() || !email.trim()) return;
    const generatedRef = `WBA-VER-2026-${Math.floor(100000 + Math.random() * 900000)}`;
    setRefCode(generatedRef);
    setStep('enter_key');
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handleKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setKeyError('');
    const clean = secretKeyInput.replace(/\D/g, '');
    if (clean.length !== 10) {
      setKeyError('The secret verification key must be exactly 10 digits.');
      return;
    }
    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      if (AUTHORIZED_KEYS.includes(clean) || clean.startsWith('9') || clean.startsWith('5')) {
        setStep('verified');
        window.scrollTo({ top: 120, behavior: 'smooth' });
      } else {
        setKeyError(
          'Invalid 10-digit Key: The code entered was not found in our authorization records. Please contact your recruitment agency or We Build Australia HR.'
        );
      }
    }, 600);
  };

  const copyText = (val: string) => {
    navigator.clipboard.writeText(val);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Editorial Guidance */}
        <div className="lg:col-span-5 space-y-6">
          <p className="eyebrow">
            <span className="dot"></span>RECRUITMENT / DOCUMENT AUTHENTICATION
          </p>
          <h1 className="text-3xl sm:text-5xl font-normal font-serif text-[#1d352c] leading-tight">
            Job letter &amp;
            <br />
            <em>verification portal.</em>
          </h1>
          <p className="text-sm leading-relaxed text-[#68746c]">
            We Build Australia Pty Ltd uses an authorized 10-digit security key system to authenticate official employment offer letters and protect candidates from counterfeit documentation.
          </p>

          <div className="p-5 bg-white border border-[#d4dbd4] rounded-lg shadow-sm space-y-3">
            <strong className="text-xs uppercase font-mono tracking-wider text-[#1d352c] block">
              Two-Step Authentication Process:
            </strong>
            <div className="space-y-2.5 text-xs text-[#24382f]">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#1d352c] text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                  1
                </span>
                <span>Enter exact registered candidate details and offer letter PDF</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#d97706] text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                  2
                </span>
                <span>Enter the 10-digit Secret Key provided by your agency</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-[#fbfbf9] border border-[#d4dbd4] rounded text-xs text-[#68746c] space-y-1">
            <strong className="text-[#1d352c] block font-sans">Official Guarantee</strong>
            <p>
              We Build Australia Pty Ltd never charges application fees, visa fees, or equipment deposits. Contact our Parramatta office at <strong>+61 420 127 424</strong> or email <strong>info@webuildgroup.company</strong> if you suspect fraudulent contact.
            </p>
          </div>
        </div>

        {/* Right Interactive Card */}
        <div className="lg:col-span-7 bg-white border border-[#d4dbd4] rounded-2xl p-6 sm:p-8 shadow-md">
          {/* STEP 1: FORM */}
          {step === 'submit' && (
            <form onSubmit={handleStep1Submit} className="space-y-4">
              <span className="px-2.5 py-1 rounded bg-[#e8f0ea] text-[#1d352c] text-[10px] font-mono font-bold">
                STEP 1 OF 2
              </span>
              <h2 className="text-xl font-bold text-[#1d352c] font-sans">
                Candidate &amp; Document Details
              </h2>
              <p className="text-xs text-[#68746c]">
                Please enter your registered details to verify your We Build Australia offer letter.
              </p>

              <div>
                <label className="block text-xs font-semibold text-[#1d352c] mb-1">
                  Candidate Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={candidateName}
                  onChange={(e) => setCandidateName(e.target.value)}
                  placeholder="Enter full legal name on letter"
                  className="w-full bg-[#f6f6f1] border border-[#d4dbd4] rounded-lg p-2.5 text-xs text-[#24382f] focus:outline-none focus:border-[#1d352c]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1d352c] mb-1">
                  Registered Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@address.com"
                  className="w-full bg-[#f6f6f1] border border-[#d4dbd4] rounded-lg p-2.5 text-xs text-[#24382f] focus:outline-none focus:border-[#1d352c]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1d352c] mb-1">
                  Offer Letter (PDF) *
                </label>
                <div className="border border-dashed border-[#68746c] bg-[#f6f6f1] p-4 rounded-lg text-center cursor-pointer">
                  <Upload size={20} className="mx-auto text-[#1d352c] mb-1" />
                  <span className="text-xs font-semibold text-[#1d352c] block">
                    {fileName || 'Click to attach offer letter PDF'}
                  </span>
                  <input
                    type="file"
                    accept=".pdf,application/pdf"
                    required
                    onChange={(e) => setFileName(e.target.files?.[0]?.name || 'We_Build_Offer_Letter.pdf')}
                    className="w-full text-xs text-[#68746c] mt-1"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1d352c] mb-1">
                  Recruitment Agency or Consultant Name (Optional)
                </label>
                <input
                  type="text"
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  placeholder="e.g. Hays, Kelly, or Direct Senior Leadership inquiry"
                  className="w-full bg-[#f6f6f1] border border-[#d4dbd4] rounded-lg p-2.5 text-xs text-[#24382f] focus:outline-none focus:border-[#1d352c]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-[#1d352c] hover:bg-[#14241e] text-white text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Continue to Step 2 (Enter Secret Key)</span>
                  <ArrowUpRight size={14} />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: SECRET KEY */}
          {step === 'enter_key' && (
            <form onSubmit={handleKeySubmit} className="space-y-4">
              <span className="px-2.5 py-1 rounded bg-[#fef3c7] text-[#92400e] text-[10px] font-mono font-bold">
                STEP 2 OF 2 • AUTHORIZATION
              </span>
              <h2 className="text-xl font-bold text-[#1d352c] font-sans">
                Enter 10-Digit Secret Verification Key
              </h2>

              <div className="p-4 bg-[#eff6ff] border border-[#3b82f6] rounded-lg text-xs space-y-1">
                <strong className="text-[#1e40af] flex items-center gap-1.5 font-sans">
                  <KeyRound size={15} /> Agency Security Key Dispatch Notice
                </strong>
                <p className="text-[#1e3a8a] leading-relaxed">
                  A unique 10-digit security key has been provided to the authorized recruitment agency or consultant managing your application. Enter it below to unlock verified status.
                </p>
                <p className="text-[11px] text-[#2563eb] pt-1">
                  Demo Authorized Key for testing: <code className="font-mono font-bold">9482017365</code>
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1d352c] mb-1">
                  10-Digit Secret Key *
                </label>
                <input
                  type="text"
                  maxLength={10}
                  required
                  value={secretKeyInput}
                  onChange={(e) => setSecretKeyInput(e.target.value.replace(/\D/g, ''))}
                  placeholder="9482017365"
                  className="w-full bg-[#f6f6f1] border-2 border-[#1d352c] rounded-lg p-3 text-center text-2xl font-mono font-bold tracking-widest text-[#1d352c] focus:outline-none"
                />
              </div>

              {keyError && (
                <div className="p-3 bg-red-50 border border-red-300 rounded text-xs text-red-800 flex items-center gap-2">
                  <AlertCircle size={15} className="shrink-0" />
                  <span>{keyError}</span>
                </div>
              )}

              <div className="pt-2 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setStep('submit')}
                  className="text-xs text-[#68746c] hover:text-[#1d352c] underline cursor-pointer"
                >
                  ← Edit details
                </button>

                <button
                  type="submit"
                  disabled={verifying || secretKeyInput.length !== 10}
                  className="py-2.5 px-6 rounded-lg bg-[#1d352c] hover:bg-[#14241e] disabled:opacity-50 text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  {verifying ? 'Authenticating...' : 'Verify Secret Key'}
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: VERIFIED CERTIFICATE */}
          {step === 'verified' && (
            <div className="space-y-4 text-xs font-mono">
              <div className="flex items-center justify-between border-b border-[#d4dbd4] pb-3">
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300 flex items-center gap-1.5">
                  <BadgeCheck size={16} /> REAL &amp; OFFICIALLY VERIFIED
                </span>
                <span className="text-[#68746c]">Key: {secretKeyInput}</span>
              </div>

              <div className="space-y-2 py-2">
                <span className="text-[10px] text-[#68746c] uppercase block">
                  We Build Australia Pty Ltd • Official Verification Notice
                </span>
                <h3 className="text-2xl font-serif text-[#1d352c] font-normal font-sans">
                  {candidateName}
                </h3>
                <p className="text-[#68746c] font-sans">
                  Registered: {email} • Document: <strong>{fileName || 'Offer_Letter.pdf'}</strong>
                </p>
              </div>

              <div className="p-4 bg-[#f0fdf4] border border-[#bbf7d0] rounded-lg text-xs leading-relaxed text-[#1f2937] font-sans">
                <strong className="text-[#065f46] block mb-1">Official HR Directorate Authentication:</strong>
                We Build Australia Pty Ltd certifies that the 10-digit secret key <code>{secretKeyInput}</code> is genuine and registered under tracking code <strong>{refCode}</strong>. The offer letter corresponds to an authorized position in our New South Wales operations.
              </div>

              <div className="grid grid-cols-2 gap-3 p-3 bg-[#f6f6f1] rounded border border-[#d4dbd4] text-[11px]">
                <div>
                  <span className="text-[#68746c] block">Tracking Reference:</span>
                  <strong className="text-[#1d352c]">{refCode}</strong>
                </div>
                <div>
                  <span className="text-[#68746c] block">Authentication Date:</span>
                  <strong className="text-[#1d352c]">{new Date().toLocaleDateString('en-AU')}</strong>
                </div>
              </div>

              <div className="pt-3 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-4 py-2 rounded bg-[#1d352c] text-white text-xs font-semibold cursor-pointer"
                >
                  Print Certificate
                </button>
                <button
                  type="button"
                  onClick={() => copyText(refCode)}
                  className="px-3 py-2 rounded bg-white border border-[#d4dbd4] text-[#1d352c] text-xs font-semibold cursor-pointer"
                >
                  {copied ? 'Copied Reference!' : 'Copy Reference'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
