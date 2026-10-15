import React, { useState, useEffect, useRef } from 'react';
import { useVenture } from '../../context/VentureContext';
import { queryCofounder, getCofounderHistory, currentActiveProvider, isSupabaseConfigured } from '../../services/api';
import { MessageSquare, X, Send, Sparkles, Bot, User, CheckCircle2, RefreshCw } from 'lucide-react';
import { ChatMessageRenderer } from './ChatMessageRenderer';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export const CofounderDrawer: React.FC = () => {
  const { venture, currentStage } = useVenture();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const ventureId = (venture as any)?.id || null;

  // Initialize greeting or load Supabase history
  useEffect(() => {
    if (messages.length === 0) {
      if (ventureId) {
        getCofounderHistory(ventureId).then(history => {
          if (history && history.length > 0) {
            setMessages(history.map(h => ({ role: h.role, content: h.content })));
            return;
          }
          initGreeting();
        });
      } else {
        initGreeting();
      }
    }
  }, [venture.startupDetails.name, ventureId]);

  const initGreeting = () => {
    const ventureName = venture.startupDetails.name || 'our venture';
    setMessages([
      {
        role: 'assistant',
        content: `Hey founder! I'm your AI Cofounder for **${ventureName}**.\n\nI have our complete Business DNA, competitor matrix, unit economics, and strategic verdict loaded. What's on your mind? We can stress-test pricing, plan our first 10 customer interviews, or brainstorm how to tackle our top risks.`
      }
    ]);
  };

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const newMessages: ChatMessage[] = [...messages, { role: 'user', content: query.trim() }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await queryCofounder(query.trim(), venture, messages);
      setMessages([...newMessages, { role: 'assistant', content: response }]);
    } catch (err) {
      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          content: "I ran into a temporary connection issue. Let's make sure your API keys are in `.env` and try again."
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const quickPrompts = [
    'How do we acquire our first 10 customers?',
    'How do we mitigate our #1 risk?',
    'How can we reduce our break-even timeline?',
    'What moat should we build first?'
  ];

  return (
    <>
      {/* Floating Toggle Pill Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#0B0B0D] dark:bg-[#0B0B0D] light:bg-[#FFF9EE] border border-[#B8A7FF]/40 dark:border-[#B8A7FF]/40 light:border-[#D6AA35]/50 shadow-2xl hover:scale-105 active:scale-95 transition-all text-xs font-mono text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32] print:hidden"
      >
        <div className="w-2 h-2 rounded-full bg-[#B8A7FF] dark:bg-[#B8A7FF] light:bg-[#D6AA35] animate-pulse" />
        <Bot className="w-4 h-4 text-[#B8A7FF] dark:text-[#B8A7FF] light:text-[#D6AA35]" />
        <span className="font-bold tracking-wider uppercase">AI COFOUNDER</span>
      </button>

      {/* Slide-out Cofounder Drawer Modal */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 sm:right-6 z-50 w-[95vw] sm:w-[440px] h-[580px] max-h-[80vh] flex flex-col rounded-3xl bg-[#0B0B0D]/95 dark:bg-[#0B0B0D]/95 light:bg-[#FFF9EE]/95 border border-white/10 dark:border-white/10 light:border-[#E6D9C4] shadow-2xl backdrop-blur-2xl overflow-hidden font-mono text-left animate-in fade-in slide-in-from-bottom-5 duration-200 print:hidden">
          
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10 dark:border-white/10 light:border-[#E6D9C4] bg-[#050505]/60 dark:bg-[#050505]/60 light:bg-[#F7F1E5]/60">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#B8A7FF]/20 dark:bg-[#B8A7FF]/20 light:bg-[#D6AA35]/20 flex items-center justify-center text-[#B8A7FF] dark:text-[#B8A7FF] light:text-[#65A30D]">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-xs font-bold text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32] uppercase">
                    AI Cofounder
                  </h3>
                  <span className="text-[9px] px-1.5 py-0.5 rounded uppercase font-semibold bg-[#B8A7FF]/20 dark:bg-[#B8A7FF]/20 light:bg-[#D6AA35]/20 text-[#B8A7FF] dark:text-[#B8A7FF] light:text-[#65A30D]">
                    {currentActiveProvider === 'gemini' ? 'Gemini Flash' : currentActiveProvider === 'groq' ? 'Groq 120B' : 'Genesis Engine'}
                  </span>
                </div>
                <span className="text-[10px] text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#7D9270] block">
                  {venture.startupDetails.name || 'Active Venture Advisor'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full text-[#A7A7AD] hover:text-[#F5F5F5] hover:bg-white/5 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-6 h-6 rounded-full bg-[#B8A7FF]/20 dark:bg-[#B8A7FF]/20 light:bg-[#D6AA35]/20 flex items-center justify-center text-[#B8A7FF] shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`p-3.5 rounded-2xl max-w-[88%] leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-[#B8A7FF] dark:bg-[#B8A7FF] light:bg-[#D6AA35] text-[#050505] font-medium rounded-tr-none'
                      : 'bg-[#050505] dark:bg-[#050505] light:bg-[#FFFFFF] border border-white/10 dark:border-white/10 light:border-[#E6D9C4] text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#1C3B2B] rounded-tl-none'
                  }`}
                >
                  <ChatMessageRenderer content={msg.content} isUser={msg.role === 'user'} />
                </div>

                {msg.role === 'user' && (
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-[#A7A7AD] shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex gap-2.5 items-center text-xs text-[#A7A7AD] p-2">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#B8A7FF]" />
                <span>Cofounder is analyzing venture context...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Suggestions */}
          <div className="px-4 py-2 border-t border-white/5 dark:border-white/5 light:border-[#E6D9C4] overflow-x-auto scrollbar-none flex gap-1.5">
            {quickPrompts.map((p, i) => (
              <button
                key={i}
                onClick={() => handleSend(p)}
                disabled={loading}
                className="whitespace-nowrap px-2.5 py-1 rounded-full text-[10px] bg-white/5 dark:bg-white/5 light:bg-[#FFFFFF] border border-white/5 dark:border-white/5 light:border-[#E6D9C4] text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#304B32] hover:text-[#B8A7FF] dark:hover:text-[#B8A7FF] light:hover:text-[#65A30D] transition-colors"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input Footer */}
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 border-t border-white/10 dark:border-white/10 light:border-[#E6D9C4] flex items-center gap-2 bg-[#050505]/60 dark:bg-[#050505]/60 light:bg-[#F7F1E5]/60"
          >
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask your cofounder anything..."
              disabled={loading}
              className="flex-1 px-3.5 py-2 rounded-xl bg-[#0B0B0D] dark:bg-[#0B0B0D] light:bg-[#FFFFFF] border border-white/10 dark:border-white/10 light:border-[#E6D9C4] text-xs text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#1C3B2B] focus:outline-none focus:border-[#B8A7FF]"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="p-2.5 rounded-xl bg-[#B8A7FF] dark:bg-[#B8A7FF] light:bg-[#D6AA35] text-[#050505] disabled:opacity-40 transition-all hover:scale-105 active:scale-95"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

        </div>
      )}
    </>
  );
};
