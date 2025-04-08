
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, PhoneCall, Video, Search, MoreHorizontal, Paperclip } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Patient, PatientChat } from "@/types/patient";
import { useToast } from "@/components/ui/use-toast";

// Sample message history - we would replace this with real data in a production app
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

// Function to fetch patient data from Supabase
const fetchPatients = async (): Promise<PatientChat[]> => {
  const { data, error } = await supabase
    .from('Patients')
    .select('id, first_name, last_name, phone_no, email');

  if (error) throw error;

  return (data || []).map((patient: Patient) => ({
    id: patient.id,
    name: `${patient.first_name || ''} ${patient.last_name || ''}`.trim(),
    lastMessage: "No messages yet",
    avatar: undefined,
    unread: 0,
    online: Math.random() > 0.5,
  }));
};

const Chat = () => {
  const { toast } = useToast();
  const [selectedPatient, setSelectedPatient] = useState<PatientChat | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const { data: patientChats = [], isLoading, error } = useQuery({
    queryKey: ['patients'],
    queryFn: fetchPatients,
    meta: {
      onError: (err: Error) => {
        console.error('Error fetching patients:', err);
        toast({
          title: "Error fetching patients",
          description: "Could not load patient data. Please try again later.",
          variant: "destructive",
        });
      }
    }
  });

  useEffect(() => {
    if (patientChats.length > 0 && !selectedPatient) {
      setSelectedPatient(patientChats[0]);
      setMessages(messageHistory[patientChats[0].id] || []);
    }
  }, [patientChats, selectedPatient]);

  const handleSelectPatient = (patient: PatientChat) => {
    setSelectedPatient(patient);
    setMessages(messageHistory[patient.id] || []);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedPatient) return;
    
    const newMsg: Message = {
      id: messages.length + 1,
      sender: 'doctor',
      content: newMessage,
      timestamp: "Just now"
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage("");
    
    if (selectedPatient) {
      messageHistory[selectedPatient.id] = [...messages, newMsg];
    }
  };

  if (isLoading) {
    return (
      <div className="animate-fade-in h-[calc(100vh-6rem)] flex items-center justify-center">
        <p>Loading patient chat data...</p>
      </div>
    );
  }

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
                    {patientChats.map(patient => (
                      <div 
                        key={patient.id}
                        className={cn(
                          "flex items-center space-x-3 p-2 rounded-md hover:bg-secondary/80 cursor-pointer",
                          selectedPatient?.id === patient.id && "bg-secondary"
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
                    {patientChats.filter(p => p.unread > 0).map(patient => (
                      <div 
                        key={patient.id}
                        className={cn(
                          "flex items-center space-x-3 p-2 rounded-md hover:bg-secondary/80 cursor-pointer",
                          selectedPatient?.id === patient.id && "bg-secondary"
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
                    {patientChats.filter(p => p.online).map(patient => (
                      <div 
                        key={patient.id}
                        className={cn(
                          "flex items-center space-x-3 p-2 rounded-md hover:bg-secondary/80 cursor-pointer",
                          selectedPatient?.id === patient.id && "bg-secondary"
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
        
        {selectedPatient ? (
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
                            "rounded-lg px-4 py-2",
                            message.sender === 'doctor' 
                              ? "bg-primary text-primary-foreground ml-auto" 
                              : "bg-muted"
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
        ) : (
          <Card className="md:col-span-2 flex items-center justify-center">
            <div className="text-center p-8">
              <h3 className="text-lg font-medium">Select a patient to start chatting</h3>
              <p className="text-muted-foreground mt-2">Choose a patient from the list to view their conversation</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Chat;
