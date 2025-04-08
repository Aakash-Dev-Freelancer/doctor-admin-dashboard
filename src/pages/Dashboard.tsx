
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MessageSquare, User, Clock, Check, X, Calendar as CalendarIcon } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, Dr. Chen</h1>
          <p className="text-muted-foreground">Here's what's happening with your practice today.</p>
        </div>
        <Button className="bg-medical-800 hover:bg-medical-900">
          <CalendarIcon className="mr-2 h-4 w-4" /> Add Appointment
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">3 more than yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">+2 since last login</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">684</div>
            <p className="text-xs text-muted-foreground">+8 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Wait Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14 min</div>
            <p className="text-xs text-muted-foreground">-2 min from last week</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
            <CardDescription>You have 12 appointments scheduled for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { time: "09:00 AM", patient: "John Smith", status: "Confirmed", type: "Check-up" },
                { time: "10:30 AM", patient: "Emily Johnson", status: "Confirmed", type: "Follow-up" },
                { time: "11:15 AM", patient: "Michael Brown", status: "Waiting", type: "Consultation" },
                { time: "01:00 PM", patient: "Sofia Martinez", status: "Rescheduled", type: "Check-up" },
                { time: "02:30 PM", patient: "David Lee", status: "Confirmed", type: "Follow-up" },
              ].map((appointment, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-card rounded-md border appointment-card">
                  <div className="flex gap-3 items-center">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Clock className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">{appointment.patient}</div>
                      <div className="text-sm text-muted-foreground">{appointment.time} • {appointment.type}</div>
                    </div>
                  </div>
                  <div className="flex gap-2 items-center">
                    <span className={cn(
                      "text-xs px-2 py-0.5 rounded-full",
                      appointment.status === "Confirmed" ? "bg-green-100 text-green-800" : 
                      appointment.status === "Waiting" ? "bg-blue-100 text-blue-800" :
                      "bg-amber-100 text-amber-800"
                    )}>
                      {appointment.status}
                    </span>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Messages</CardTitle>
            <CardDescription>You have 7 unread messages</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Maria Wilson", message: "When will my test results be available?", time: "10 min ago", unread: true },
                { name: "Robert Garcia", message: "I need to reschedule my appointment on...", time: "25 min ago", unread: true },
                { name: "Laura Taylor", message: "Thank you for your help yesterday, I'm feeling...", time: "1 hour ago", unread: true },
                { name: "James Anderson", message: "Is it normal to experience these side effects?", time: "2 hours ago", unread: false },
              ].map((message, i) => (
                <div key={i} className="flex gap-3 p-2 rounded-md hover:bg-secondary/50 transition-colors">
                  <div className="flex flex-col items-start gap-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{message.name}</span>
                      {message.unread && <span className="w-2 h-2 rounded-full bg-medical-600"></span>}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-1">{message.message}</p>
                    <span className="text-xs text-muted-foreground">{message.time}</span>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">View All Messages</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
