import React from 'react';
import { AlertTriangle, KeyRound, RefreshCw } from 'lucide-react';

const ApiKeyChecker: React.FC = () => {
    return (
        <div className="fixed inset-0 bg-gray-950 text-white flex items-center justify-center z-[100] p-4 animate-subtle-fade-in">
            <div className="w-full max-w-3xl bg-slate-900 border border-red-500/50 rounded-2xl shadow-2xl p-8 text-center glassmorphic">
                <div className="mx-auto w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mb-4 border-2 border-red-500/50">
                    <AlertTriangle className="w-8 h-8 text-red-400" />
                </div>
                <h1 className="text-3xl font-bold text-red-400 mb-2">Configuration Required</h1>
                <h2 className="text-xl font-semibold mb-4">Gemini API Key is Missing or Invalid</h2>
                
                <p className="text-gray-300 mb-6">
                    Nihara can't connect to the AI without your Gemini API key. Please add it to your deployment environment variables to proceed.
                </p>

                <div className="text-left bg-black/30 p-6 rounded-lg border border-white/10 mb-6">
                    <h3 className="text-lg font-bold mb-3 flex items-center">
                        <KeyRound className="mr-2 text-blue-400"/>
                        How to Add Your Key (e.g., on Netlify)
                    </h3>
                    <ol className="list-decimal list-inside space-y-2 text-gray-300">
                        <li>Go to your <strong className="text-white">Netlify Site Dashboard</strong>.</li>
                        <li>Navigate to <strong className="text-white">Site configuration</strong> &rarr; <strong className="text-white">Build & deploy</strong> &rarr; <strong className="text-white">Environment variables</strong>.</li>
                        <li>Click <strong className="text-white">Add a variable</strong> and enter the following:
                            <div className="bg-gray-800 p-3 rounded-md my-2 text-sm font-mono">
                                <div><span className="text-gray-400">Key:</span> <span className="text-yellow-300">API_KEY</span></div>
                                <div><span className="text-gray-400">Value:</span> <span className="text-green-300">[Paste your actual Gemini API key here]</span></div>
                            </div>
                        </li>
                        <li>Click <strong className="text-white">Save</strong>.</li>
                    </ol>
                </div>

                <div className="text-left bg-yellow-900/50 p-6 rounded-lg border border-yellow-500/50">
                    <h3 className="text-lg font-bold mb-3 flex items-center text-yellow-300">
                        <RefreshCw className="mr-2"/>
                        CRITICAL: Redeploy Required!
                    </h3>
                    <p className="text-yellow-200">
                        Environment variables are injected at <strong className="text-white">build time</strong>. After adding your key, you <strong className="text-white underline">must</strong> trigger a new deploy for the change to take effect. Go to your "Deploys" tab and redeploy your latest production branch.
                    </p>
                </div>
                 <div className="mt-6 text-sm text-gray-500">
                    <p className="font-semibold text-gray-400">Why not just put the key in the code?</p>
                    <p>
                        Adding secrets directly to code is a major security risk. Environment variables keep your API key secure on the server, preventing it from being exposed in your public-facing code.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ApiKeyChecker;