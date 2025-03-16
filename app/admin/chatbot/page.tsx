"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Bot, Send, User } from "lucide-react";

// Types for our chat
type MessageRole = "user" | "assistant";

interface ChatMessage {
  id: string;
  content: string;
  role: MessageRole;
  timestamp: Date;
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      content:
        "¡Hola! Soy tu asistente de restaurante. ¿Cómo puedo ayudarte hoy?",
      role: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input on load
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Mock AI response based on user input
  const getMockResponse = (userMessage: string): string => {
    const lowerCaseMessage = userMessage.toLowerCase();

    // Restaurant-specific mock responses
    if (
      lowerCaseMessage.includes("hours") ||
      lowerCaseMessage.includes("schedule")
    ) {
      return "Nuestras horas de restaurante varían por sucursal. Puedes ver y editar el horario para cada sucursal en la pestaña de Horarios.";
    }

    if (
      lowerCaseMessage.includes("sales") ||
      lowerCaseMessage.includes("revenue")
    ) {
      return "Based on recent data, our highest sales are on Friday and Saturday evenings. The most popular items are Margherita Pizza and Grilled Salmon.";
    }

    if (
      lowerCaseMessage.includes("popular") ||
      lowerCaseMessage.includes("best seller")
    ) {
      return "Our most popular items are Margherita Pizza, Grilled Salmon, and Tiramisu. These account for approximately 45% of our total sales.";
    }

    if (
      lowerCaseMessage.includes("inventory") ||
      lowerCaseMessage.includes("stock")
    ) {
      return "Current inventory shows we're running low on fresh salmon and tiramisu ingredients. I recommend restocking these items soon.";
    }

    if (
      lowerCaseMessage.includes("customer") ||
      lowerCaseMessage.includes("feedback")
    ) {
      return "Recent customer feedback has been positive with an average rating of 4.7/5. Most compliments mention food quality and service speed.";
    }

    if (
      lowerCaseMessage.includes("staff") ||
      lowerCaseMessage.includes("employee")
    ) {
      return "We currently have 24 active staff members across all branches. The downtown branch has reported being understaffed on weekends.";
    }

    if (
      lowerCaseMessage.includes("order") ||
      lowerCaseMessage.includes("delivery")
    ) {
      return "We've processed 128 orders in the past week with an average delivery time of 32 minutes. 78% of orders were delivered on time.";
    }

    if (
      lowerCaseMessage.includes("menu") ||
      lowerCaseMessage.includes("item")
    ) {
      return "Our menu currently has 32 active items across 5 categories. The 'Mains' category generates the highest revenue.";
    }

    if (
      lowerCaseMessage.includes("promotion") ||
      lowerCaseMessage.includes("discount")
    ) {
      return "Our current promotion '2 for 1 Desserts' has increased dessert sales by 35%. I recommend extending this promotion for another week.";
    }

    if (
      lowerCaseMessage.includes("help") ||
      lowerCaseMessage.includes("support")
    ) {
      return "I can help with information about sales, inventory, customers, orders, menu items, and staff. What specific information are you looking for?";
    }

    // Generic responses for other queries
    const genericResponses = [
      "I'm analyzing our restaurant data to find that information for you.",
      "Based on our restaurant records, I'd recommend focusing on improving our weekend staffing.",
      "Our data shows that customer satisfaction increases when we reduce wait times.",
      "According to our sales data, we might want to consider expanding our dessert menu options.",
      "I've noticed that delivery orders have increased by 15% in the last month.",
      "Would you like me to prepare a detailed report on this topic?",
      "I can help you optimize your restaurant operations based on our historical data.",
      "Is there any specific data point you'd like me to analyze further?",
    ];

    return genericResponses[
      Math.floor(Math.random() * genericResponses.length)
    ];
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI thinking time (0.5-2 seconds)
    const thinkingTime = Math.floor(Math.random() * 1500) + 500;

    setTimeout(() => {
      // Add AI response
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: getMockResponse(userMessage.content),
        role: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, thinkingTime);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="container mx-auto py-6 px-6">
      <Card className="border shadow-md">
        <CardHeader className="bg-primary/5">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Bot className="h-6 w-6" />
            Asistente de Restaurante
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="flex h-[calc(100vh-13rem)] flex-col">
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div className="flex max-w-[80%] items-start gap-3">
                      {message.role === "assistant" && (
                        <Avatar className="mt-0.5 h-8 w-8 border">
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            <Bot className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div>
                        <div
                          className={`rounded-lg px-4 py-2 ${
                            message.role === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                      {message.role === "user" && (
                        <Avatar className="mt-0.5 h-8 w-8 border">
                          <AvatarFallback className="bg-zinc-800 text-zinc-50">
                            <User className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="flex max-w-[80%] items-start gap-3">
                      <Avatar className="mt-0.5 h-8 w-8 border">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex w-16 items-center gap-1.5 rounded-lg bg-muted px-4 py-3">
                          <Skeleton className="h-2 w-2 rounded-full bg-muted-foreground/30" />
                          <Skeleton className="h-2 w-2 rounded-full bg-muted-foreground/30" />
                          <Skeleton className="h-2 w-2 rounded-full bg-muted-foreground/30" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
            <div className="border-t p-4">
              <div className="flex gap-2">
                <Input
                  ref={inputRef}
                  placeholder="Escribe tu mensaje..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!input.trim() || isLoading}
                  size="icon"
                >
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Enviar mensaje</span>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
