
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Brain, SendHorizonal, RefreshCw, Loader2 } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  text: string;
}

interface RiskAssistantProps {
  companyId: number;
  companyName: string;
}

const RiskAssistant: React.FC<RiskAssistantProps> = ({ companyId, companyName }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      type: 'assistant',
      text: `Hello! I'm your AI Risk Assistant. Ask me anything about ${companyName}'s risk profile, legal cases, or director connections.`,
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      type: 'user',
      text: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate API call for AI response
    setTimeout(() => {
      const responses: Record<string, string> = {
        'why is this company risky': `${companyName} has 2 open fraud cases and a director who is linked to 3 struck-off firms. The company also has a pattern of delayed tax filings over the past 2 years.`,
        'what are the red flags': `The main red flags for ${companyName} include: 1) Multiple director connections to struck-off companies, 2) Recent legal cases related to vendor payments, 3) Inconsistent financial reporting patterns.`,
        'is it safe to work with them': `Based on the available data, working with ${companyName} involves moderate risk. I would recommend additional verification of their financial statements and implementing staged payment terms if you proceed with them.`,
        'what is their financial situation': `${companyName} reports a paid-up capital of ₹5M and annual turnover of approximately ₹80M. Their financial filings show consistent but modest growth, with some delays in tax payments noted in the previous fiscal year.`,
      };

      // Default response if no match found
      let responseText = `I've analyzed ${companyName}'s profile and found several risk indicators including inconsistent regulatory compliance and moderate director risk. I recommend reviewing their financial statements and implementing proper risk mitigation measures if you plan to work with them.`;

      // Check for partial matches in the input
      const lowerInput = input.toLowerCase();
      for (const [key, value] of Object.entries(responses)) {
        if (lowerInput.includes(key)) {
          responseText = value;
          break;
        }
      }

      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        type: 'assistant',
        text: responseText,
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const resetConversation = () => {
    setMessages([
      {
        id: 'welcome',
        type: 'assistant',
        text: `Hello! I'm your AI Risk Assistant. Ask me anything about ${companyName}'s risk profile, legal cases, or director connections.`,
      },
    ]);
  };

  return (
    <div className="flex flex-col h-[400px]">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm text-muted-foreground">Ask questions about risks</div>
        <Button variant="ghost" size="sm" onClick={resetConversation}>
          <RefreshCw className="h-3.5 w-3.5 mr-1" />
          Reset
        </Button>
      </div>
      
      <ScrollArea className="flex-1 pr-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  message.type === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                {message.type === 'assistant' && (
                  <div className="flex items-center mb-1">
                    <Brain className="h-3 w-3 mr-1" />
                    <span className="text-xs font-medium">AI Assistant</span>
                  </div>
                )}
                <p className="text-sm whitespace-pre-wrap">{message.text}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-lg px-4 py-2 bg-muted">
                <div className="flex items-center gap-2">
                  <Brain className="h-3 w-3" />
                  <Loader2 className="h-3 w-3 animate-spin" />
                  <span className="text-xs font-medium">Thinking...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      
      <div className="mt-4">
        <div className="relative">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Ask a question about this company..."
            className="resize-none pr-10"
            rows={3}
            disabled={isLoading}
          />
          <Button
            size="icon"
            variant="ghost"
            className="absolute right-2 bottom-2 h-6 w-6"
            onClick={handleSendMessage}
            disabled={isLoading || !input.trim()}
          >
            <SendHorizonal className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RiskAssistant;
