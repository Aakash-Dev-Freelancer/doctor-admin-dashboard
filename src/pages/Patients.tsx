
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Filter, Plus, Search, SlidersHorizontal, UserPlus } from "lucide-react";

const patients = [
  { id: 1, name: "John Smith", age: 45, gender: "Male", status: "Active", condition: "Hypertension", lastVisit: "Apr 1, 2025", phone: "(415) 555-1234", email: "john.smith@example.com", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80" },
  { id: 2, name: "Emily Johnson", age: 36, gender: "Female", status: "Active", condition: "Arrhythmia", lastVisit: "Mar 24, 2025", phone: "(415) 555-2345", email: "emily.johnson@example.com", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80" },
  { id: 3, name: "Michael Brown", age: 58, gender: "Male", status: "Active", condition: "Coronary Artery Disease", lastVisit: "Mar 15, 2025", phone: "(415) 555-3456", email: "michael.brown@example.com", avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80" },
  { id: 4, name: "Sofia Martinez", age: 29, gender: "Female", status: "New", condition: "Heart Palpitations", lastVisit: "Never", phone: "(415) 555-4567", email: "sofia.martinez@example.com", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80" },
  { id: 5, name: "David Lee", age: 52, gender: "Male", status: "Inactive", condition: "Post-Stroke", lastVisit: "Dec 10, 2024", phone: "(415) 555-5678", email: "david.lee@example.com" },
  { id: 6, name: "Amanda Wilson", age: 41, gender: "Female", status: "Active", condition: "Mitral Valve Prolapse", lastVisit: "Mar 30, 2025", phone: "(415) 555-6789", email: "amanda.wilson@example.com", avatar: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80" },
  { id: 7, name: "Robert Taylor", age: 63, gender: "Male", status: "Active", condition: "Congestive Heart Failure", lastVisit: "Mar 28, 2025", phone: "(415) 555-7890", email: "robert.taylor@example.com" },
  { id: 8, name: "Jennifer Lewis", age: 38, gender: "Female", status: "Active", condition: "Hyperlipidemia", lastVisit: "Mar 22, 2025", phone: "(415) 555-8901", email: "jennifer.lewis@example.com", avatar: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80" },
];

const Patients = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredPatients = patients.filter(patient => {
    // Filter by search query
    const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.condition.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by status
    const matchesStatus = statusFilter === "all" || patient.status.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Patients</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-medical-800 hover:bg-medical-900">
              <UserPlus className="mr-2 h-4 w-4" /> Add Patient
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Patient</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="text-sm font-medium mb-1 block">First Name</label>
                  <Input id="firstName" placeholder="John" />
                </div>
                <div>
                  <label htmlFor="lastName" className="text-sm font-medium mb-1 block">Last Name</label>
                  <Input id="lastName" placeholder="Smith" />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="text-sm font-medium mb-1 block">Email</label>
                <Input id="email" type="email" placeholder="john.smith@example.com" />
              </div>
              <div>
                <label htmlFor="phone" className="text-sm font-medium mb-1 block">Phone Number</label>
                <Input id="phone" placeholder="(415) 555-1234" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label htmlFor="birthdate" className="text-sm font-medium mb-1 block">Date of Birth</label>
                  <Input id="birthdate" type="date" />
                </div>
                <div>
                  <label htmlFor="gender" className="text-sm font-medium mb-1 block">Gender</label>
                  <Select>
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label htmlFor="status" className="text-sm font-medium mb-1 block">Status</label>
                  <Select defaultValue="new">
                    <SelectTrigger id="status">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <label htmlFor="condition" className="text-sm font-medium mb-1 block">Primary Condition</label>
                <Input id="condition" placeholder="e.g., Hypertension" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className="bg-medical-800 hover:bg-medical-900">Add Patient</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle>Patient Directory</CardTitle>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search patients..." 
                  className="pl-8 w-full sm:w-[250px]" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select
                defaultValue={statusFilter}
                onValueChange={setStatusFilter}
              >
                <SelectTrigger className="w-full sm:w-[150px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="table">
            <TabsList className="mb-4">
              <TabsTrigger value="table">Table View</TabsTrigger>
              <TabsTrigger value="cards">Card View</TabsTrigger>
            </TabsList>
            
            <TabsContent value="table">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Patient</TableHead>
                      <TableHead>Age</TableHead>
                      <TableHead>Gender</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Condition</TableHead>
                      <TableHead>Last Visit</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPatients.map((patient) => (
                      <TableRow key={patient.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-9 w-9">
                              <AvatarImage src={patient.avatar} />
                              <AvatarFallback>{patient.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div className="font-medium">{patient.name}</div>
                          </div>
                        </TableCell>
                        <TableCell>{patient.age}</TableCell>
                        <TableCell>{patient.gender}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={
                            patient.status === "Active" ? "bg-green-100 text-green-800 hover:bg-green-100" :
                            patient.status === "New" ? "bg-blue-100 text-blue-800 hover:bg-blue-100" :
                            "bg-gray-100 text-gray-800 hover:bg-gray-100"
                          }>
                            {patient.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{patient.condition}</TableCell>
                        <TableCell>{patient.lastVisit}</TableCell>
                        <TableCell className="text-sm">
                          <div>{patient.phone}</div>
                          <div className="text-muted-foreground">{patient.email}</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm" className="h-8 px-2">View</Button>
                            <Button variant="ghost" size="sm" className="h-8 px-2">Edit</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="cards">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredPatients.map((patient) => (
                  <Card key={patient.id} className="overflow-hidden">
                    <CardHeader className="p-4">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={patient.avatar} />
                          <AvatarFallback>{patient.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{patient.name}</CardTitle>
                          <div className="text-sm text-muted-foreground">
                            {patient.age} years • {patient.gender}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status:</span>
                        <Badge variant="outline" className={
                          patient.status === "Active" ? "bg-green-100 text-green-800 hover:bg-green-100" :
                          patient.status === "New" ? "bg-blue-100 text-blue-800 hover:bg-blue-100" :
                          "bg-gray-100 text-gray-800 hover:bg-gray-100"
                        }>
                          {patient.status}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Condition:</span>
                        <span>{patient.condition}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Last Visit:</span>
                        <span>{patient.lastVisit}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Contact:</span>
                        <span className="text-right">{patient.phone}</span>
                      </div>
                      <div className="pt-3 flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">View Profile</Button>
                        <Button variant="outline" size="sm" className="flex-1">Schedule</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Patients;
