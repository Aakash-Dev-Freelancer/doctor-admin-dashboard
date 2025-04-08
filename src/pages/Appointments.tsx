
import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock, Filter, MoreHorizontal, Plus, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface Appointment {
  id: number;
  patientName: string;
  patientImage?: string;
  date: Date;
  time: string;
  type: string;
  status: "scheduled" | "completed" | "cancelled" | "no-show";
  notes?: string;
}

const initialAppointments: Appointment[] = [
  {
    id: 1,
    patientName: "John Smith",
    patientImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
    date: new Date(2025, 3, 8),
    time: "09:00 AM",
    type: "Check-up",
    status: "scheduled",
    notes: "Regular annual check-up"
  },
  {
    id: 2,
    patientName: "Emily Johnson",
    patientImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
    date: new Date(2025, 3, 8),
    time: "10:30 AM",
    type: "Follow-up",
    status: "scheduled",
    notes: "Follow-up on medication adjustment"
  },
  {
    id: 3,
    patientName: "Michael Brown",
    patientImage: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
    date: new Date(2025, 3, 8),
    time: "11:15 AM",
    type: "Consultation",
    status: "scheduled"
  },
  {
    id: 4,
    patientName: "Sofia Martinez",
    patientImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
    date: new Date(2025, 3, 8),
    time: "01:00 PM",
    type: "Check-up",
    status: "scheduled"
  },
  {
    id: 5,
    patientName: "David Lee",
    date: new Date(2025, 3, 8),
    time: "02:30 PM",
    type: "Follow-up",
    status: "scheduled",
    notes: "Discussion about test results"
  },
  {
    id: 6,
    patientName: "Amanda Wilson",
    patientImage: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
    date: new Date(2025, 3, 9),
    time: "10:00 AM",
    type: "Consultation",
    status: "scheduled"
  },
  {
    id: 7,
    patientName: "Robert Taylor",
    date: new Date(2025, 3, 9),
    time: "11:30 AM",
    type: "Check-up",
    status: "scheduled"
  },
];

const AppointmentPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const handleStatusChange = (appointmentId: number, newStatus: Appointment['status']) => {
    setAppointments(appointments.map(appointment => {
      if (appointment.id === appointmentId) {
        return { ...appointment, status: newStatus };
      }
      return appointment;
    }));
    
    toast.success(`Appointment status updated to ${newStatus}`);
  };

  const filteredAppointments = appointments.filter(appointment => {
    // Filter by date
    const appointmentDate = appointment.date;
    const selectedDate = date;
    
    const sameDay = 
      selectedDate &&
      appointmentDate.getDate() === selectedDate.getDate() &&
      appointmentDate.getMonth() === selectedDate.getMonth() &&
      appointmentDate.getFullYear() === selectedDate.getFullYear();
    
    // Filter by status
    const statusMatch = filterStatus === "all" || appointment.status === filterStatus;
    
    return sameDay && statusMatch;
  }).sort((a, b) => {
    // Sort by time
    return a.time.localeCompare(b.time);
  });

  const handleDateSelect = (newDate: Date | undefined) => {
    setDate(newDate);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Appointments</h1>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-medical-800 hover:bg-medical-900">
              <Plus className="mr-2 h-4 w-4" /> New Appointment
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Schedule New Appointment</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="patient" className="text-right">Patient</Label>
                <Input id="patient" placeholder="Search patient..." className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">Date</Label>
                <div className="relative col-span-3">
                  <Input id="date" type="date" />
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="time" className="text-right">Time</Label>
                <Input id="time" type="time" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">Type</Label>
                <Select>
                  <SelectTrigger id="type" className="col-span-3">
                    <SelectValue placeholder="Select appointment type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="check-up">Check-up</SelectItem>
                    <SelectItem value="follow-up">Follow-up</SelectItem>
                    <SelectItem value="consultation">Consultation</SelectItem>
                    <SelectItem value="procedure">Procedure</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="notes" className="text-right">Notes</Label>
                <Input id="notes" placeholder="Optional notes" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="col-span-4 flex items-center space-x-2">
                  <Checkbox id="notify" />
                  <Label htmlFor="notify">Send notification to patient</Label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className="bg-medical-800 hover:bg-medical-900">Schedule Appointment</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Select Date</CardTitle>
            <CardDescription>Choose a date to view appointments</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
              className="rounded-md border"
              disabled={(date) => {
                // Disable past dates
                return date < new Date(new Date().setHours(0, 0, 0, 0));
              }}
            />
            
            <div className="mt-4">
              <div className="text-sm font-medium mb-2">Quick Actions</div>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  <span>View Weekly Schedule</span>
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Clock className="mr-2 h-4 w-4" />
                  <span>Set Available Hours</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="md:col-span-8 space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>
                    {date ? format(date, 'MMMM d, yyyy') : 'Today'}
                  </CardTitle>
                  <CardDescription>
                    {filteredAppointments.length} appointments scheduled
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search appointments..." className="pl-8 w-[180px] h-9" />
                  </div>
                  <Select
                    defaultValue={filterStatus}
                    onValueChange={(value) => setFilterStatus(value)}
                  >
                    <SelectTrigger className="h-9 w-[150px]">
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                      <SelectItem value="no-show">No-show</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-2">
              <Tabs defaultValue="list" className="w-full">
                <TabsList className="w-full">
                  <TabsTrigger className="flex-1" value="list">List View</TabsTrigger>
                  <TabsTrigger className="flex-1" value="timeline">Timeline</TabsTrigger>
                </TabsList>
                <TabsContent value="list" className="pt-4">
                  {filteredAppointments.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-10 text-center">
                      <CalendarIcon className="h-10 w-10 text-muted-foreground mb-2" />
                      <h3 className="font-medium text-lg">No appointments found</h3>
                      <p className="text-muted-foreground">There are no appointments scheduled for this day.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {filteredAppointments.map(appointment => (
                        <div key={appointment.id} className="flex items-center p-3 rounded-lg border hover:bg-accent/50">
                          <div className="flex items-center gap-3 flex-1">
                            <div className="bg-primary/10 p-2 rounded-full">
                              <Clock className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <div className="font-medium">{appointment.patientName}</div>
                              <div className="text-sm text-muted-foreground">
                                {appointment.time} • {appointment.type}
                              </div>
                              {appointment.notes && (
                                <div className="text-xs text-muted-foreground mt-1">{appointment.notes}</div>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={cn(
                              "text-xs px-2 py-0.5 rounded-full",
                              appointment.status === "scheduled" ? "bg-blue-100 text-blue-800" :
                              appointment.status === "completed" ? "bg-green-100 text-green-800" :
                              appointment.status === "cancelled" ? "bg-amber-100 text-amber-800" :
                              "bg-red-100 text-red-800"
                            )}>
                              {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                            </span>
                            <Select
                              onValueChange={(value) => handleStatusChange(appointment.id, value as Appointment['status'])}
                              defaultValue={appointment.status}
                            >
                              <SelectTrigger className="border-0 p-0 h-8 w-8 rounded-full focus-visible:ring-0 focus-visible:ring-offset-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="scheduled">Mark as Scheduled</SelectItem>
                                <SelectItem value="completed">Mark as Completed</SelectItem>
                                <SelectItem value="cancelled">Mark as Cancelled</SelectItem>
                                <SelectItem value="no-show">Mark as No-show</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="timeline" className="pt-4">
                  <div className="flex flex-col space-y-3">
                    <div className="grid grid-cols-12 gap-3">
                      <div className="col-span-1 text-right text-muted-foreground text-sm">9:00</div>
                      <div className="col-span-11 border-l border-muted pl-3 pb-6">
                        <div className="h-16 bg-blue-100 border-l-4 border-blue-600 p-2 rounded">
                          John Smith - Check-up
                        </div>
                      </div>
                      <div className="col-span-1 text-right text-muted-foreground text-sm">10:00</div>
                      <div className="col-span-11 border-l border-muted pl-3 pb-6"></div>
                      <div className="col-span-1 text-right text-muted-foreground text-sm">11:00</div>
                      <div className="col-span-11 border-l border-muted pl-3 pb-6">
                        <div className="h-12 bg-blue-100 border-l-4 border-blue-600 p-2 rounded mt-2">
                          Michael Brown - Consultation
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AppointmentPage;
