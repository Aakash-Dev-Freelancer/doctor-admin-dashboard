import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, PhoneCall, Video, Search, MoreHorizontal, Paperclip } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const patients = [
  { id: 1, name: "Maria Wilson", lastMessage: "When will my test results be available?", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80", unread: 2, online: true },
  { id: 2, name: "Robert Garcia", lastMessage: "I need to reschedule my appointment.", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80", unread: 0, online: false },
  { id: 3, name: "Laura Taylor", lastMessage: "Thank you for your help yesterday.", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80", unread: 3, online: true },
  { id: 4, name: "James Anderson", lastMessage: "Is it normal to experience these side effects?", avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80", unread: 0, online: false },
  { id: 5, name: "Jennifer Lewis", lastMessage: "I'll send my insurance information today.", avatar: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80", unread: 1, online: true },
];

interface Message {
  id: number;
  sender: 'doctor' | 'patient';
  content: string;
  timestamp: string;
}

const messageHistory: Record<number, Message[]> = {
  1: [
    { id: 1, sender: 'patient', content: "Hello Dr. Chen, I've been experiencing some discomfort since taking the new medication. Is this normal?", timestamp: "10:23 AM" },
    { id: 2, sender: 'doctor', content: "Hi Maria, some minor discomfort can be expected. Could you describe your symptoms in a bit more detail?", timestamp: "10:25 AM" },
    { id: 3, sender: 'patient', content: "I have a slight headache and feel a bit nauseous, especially after meals", timestamp: "10:26 AM" },
    { id: 4, sender: 'doctor', content: "That can happen with this medication. Try taking it with food and make sure you're staying hydrated. If it persists for more than 48 hours, please let me know.", timestamp: "10:28 AM" },
    { id: 5, sender: 'patient', content: "Thank you, I'll try that. When will my test results be available?", timestamp: "10:30 AM" },
  ],
  2: [
    { id: 1, sender: 'patient', content: "Dr. Chen, I have a scheduling conflict for my appointment next week. Is it possible to reschedule?", timestamp: "Yesterday" },
    { id: 2, sender: 'doctor', content: "Of course, Robert. Let me check my availability. Would Thursday at 2pm work for you?", timestamp: "Yesterday" },
    { id: 3, sender: 'patient', content: "I need to reschedule my appointment.", timestamp: "Just now" },
  ],
};

const Chat = () => {
  const [selectedPatient, setSelectedPatient] = useState(patients[0]);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>(messageHistory[1] || []);

  const handleSelectPatient = (patient: typeof patients[0]) => {
    setSelectedPatient(patient);
    setMessages(messageHistory[patient.id] || []);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const newMsg: Message = {
      id: messages.length + 1,
      sender: 'doctor',
      content: newMessage,
      timestamp: "Just now"
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage("");
    
    // Update the messageHistory object
    messageHistory[selectedPatient.id] = [...messages, newMsg];
  };

  return (
    <div className="animate-fade-in h-[calc(100vh-6rem)]">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Patient Chat</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100%-4rem)]">
        <Card className="md:col-span-1">
          <CardHeader className="px-4 py-3">
            <div className="flex items-center space-x-2">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search patients..." 
                  className="h-9 pl-9" 
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs defaultValue="all">
              <div className="px-4">
                <TabsList className="w-full">
                  <TabsTrigger className="flex-1" value="all">All</TabsTrigger>
                  <TabsTrigger className="flex-1" value="unread">Unread</TabsTrigger>
                  <TabsTrigger className="flex-1" value="online">Online</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="all" className="m-0 mt-2">
                <ScrollArea className="h-[calc(100vh-20rem)]">
                  <div className="space-y-1 p-2">
                    {patients.map(patient => (
                      <div 
                        key={patient.id}
                        className={cn(
                          "flex items-center space-x-3 p-2 rounded-md hover:bg-secondary/80 cursor-pointer",
                          selectedPatient.id === patient.id && "bg-secondary"
                        )}
                        onClick={() => handleSelectPatient(patient)}
                      >
                        <div className="relative">
                          <Avatar>
                            <AvatarImage src={patient.avatar} />
                            <AvatarFallback>{patient.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          {patient.online && (
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="font-medium truncate">{patient.name}</p>
                            {patient.unread > 0 && (
                              <span className="ml-auto flex-shrink-0 bg-primary text-primary-foreground text-xs rounded-full h-5 min-w-[20px] flex items-center justify-center px-1">
                                {patient.unread}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground truncate">{patient.lastMessage}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
              
              <TabsContent value="unread" className="m-0 mt-2">
                <ScrollArea className="h-[calc(100vh-20rem)]">
                  <div className="space-y-1 p-2">
                    {patients.filter(p => p.unread > 0).map(patient => (
                      <div 
                        key={patient.id}
                        className={cn(
                          "flex items-center space-x-3 p-2 rounded-md hover:bg-secondary/80 cursor-pointer",
                          selectedPatient.id === patient.id && "bg-secondary"
                        )}
                        onClick={() => handleSelectPatient(patient)}
                      >
                        <div className="relative">
                          <Avatar>
                            <AvatarImage src={patient.avatar} />
                            <AvatarFallback>{patient.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          {patient.online && (
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="font-medium truncate">{patient.name}</p>
                            {patient.unread > 0 && (
                              <span className="ml-auto flex-shrink-0 bg-primary text-primary-foreground text-xs rounded-full h-5 min-w-[20px] flex items-center justify-center px-1">
                                {patient.unread}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground truncate">{patient.lastMessage}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
              
              <TabsContent value="online" className="m-0 mt-2">
                <ScrollArea className="h-[calc(100vh-20rem)]">
                  <div className="space-y-1 p-2">
                    {patients.filter(p => p.online).map(patient => (
                      <div 
                        key={patient.id}
                        className={cn(
                          "flex items-center space-x-3 p-2 rounded-md hover:bg-secondary/80 cursor-pointer",
                          selectedPatient.id === patient.id && "bg-secondary"
                        )}
                        onClick={() => handleSelectPatient(patient)}
                      >
                        <div className="relative">
                          <Avatar>
                            <AvatarImage src={patient.avatar} />
                            <AvatarFallback>{patient.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          {patient.online && (
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="font-medium truncate">{patient.name}</p>
                            {patient.unread > 0 && (
                              <span className="ml-auto flex-shrink-0 bg-primary text-primary-foreground text-xs rounded-full h-5 min-w-[20px] flex items-center justify-center px-1">
                                {patient.unread}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground truncate">{patient.lastMessage}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2 flex flex-col">
          <CardHeader className="px-6 py-3 flex flex-row items-center justify-between border-b">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={selectedPatient.avatar} />
                <AvatarFallback>{selectedPatient.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg">{selectedPatient.name}</CardTitle>
                <p className="text-xs text-muted-foreground">
                  {selectedPatient.online ? "Online" : "Offline"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <PhoneCall className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Video className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="flex-1 p-0 flex flex-col">
            <ScrollArea className="flex-1 p-6">
              <div className="space-y-4">
                {messages.map(message => (
                  <div 
                    key={message.id}
                    className={cn(
                      "flex",
                      message.sender === 'doctor' ? "justify-end" : "justify-start"
                    )}
                  >
                    <div className="flex flex-col max-w-[80%]">
                      <div 
                        className={cn(
                          message.sender === 'doctor' ? "chat-message-sent ml-auto" : "chat-message-received"
                        )}
                      >
                        {message.content}
                      </div>
                      <span className="text-xs text-muted-foreground mt-1 px-1">
                        {message.timestamp}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            <div className="p-4 border-t">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Input 
                  placeholder="Type your message here..." 
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSendMessage();
                    }
                  }}
                  className="flex-1"
                />
                <Button 
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()} 
                  size="icon" 
                  className="rounded-full bg-medical-800 hover:bg-medical-900"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Chat;
