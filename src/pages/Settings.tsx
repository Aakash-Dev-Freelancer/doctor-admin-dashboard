
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

const Settings = () => {
  const handleSave = () => {
    toast.success("Settings saved successfully!");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-2">Manage your account preferences and system settings.</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="practice">Practice</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal and professional information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6">
                <div className="flex flex-col items-center gap-2">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="Dr. Sarah Chen" />
                    <AvatarFallback>DR</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm">Change Photo</Button>
                </div>
                <div className="flex-1 space-y-4 w-full">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="Sarah" defaultValue="Sarah" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Chen" defaultValue="Chen" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="dr.chen@heartcarespecialists.com" defaultValue="dr.chen@heartcarespecialists.com" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" placeholder="(415) 555-0123" defaultValue="(415) 555-0123" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="specialization">Specialization</Label>
                      <Input id="specialization" placeholder="Cardiology" defaultValue="Cardiology" />
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="bio">Professional Bio</Label>
                <Textarea 
                  id="bio" 
                  rows={4} 
                  placeholder="Write a brief description about your professional experience and expertise..."
                  defaultValue="Board-certified cardiologist specializing in preventive cardiology and women's heart health with over 15 years of clinical experience."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="medicalLicense">Medical License Number</Label>
                  <Input id="medicalLicense" placeholder="CA12345" defaultValue="CA12345" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="npiNumber">NPI Number</Label>
                  <Input id="npiNumber" placeholder="1234567890" defaultValue="1234567890" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button variant="outline" className="mr-2">Cancel</Button>
              <Button onClick={handleSave} className="bg-medical-800 hover:bg-medical-900">Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Manage how you receive notifications.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-3">Email Notifications</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="emailAppointments" className="text-base">Appointment Reminders</Label>
                      <p className="text-sm text-muted-foreground">Receive email reminders for upcoming appointments</p>
                    </div>
                    <Switch id="emailAppointments" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="emailMessages" className="text-base">New Patient Messages</Label>
                      <p className="text-sm text-muted-foreground">Get notified when patients send you messages</p>
                    </div>
                    <Switch id="emailMessages" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="emailReports" className="text-base">Lab Results & Reports</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications for new lab results and medical reports</p>
                    </div>
                    <Switch id="emailReports" />
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-medium mb-3">System Notifications</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="browserNotifications" className="text-base">Browser Notifications</Label>
                      <p className="text-sm text-muted-foreground">Show desktop notifications when you're using the system</p>
                    </div>
                    <Switch id="browserNotifications" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="soundAlerts" className="text-base">Sound Alerts</Label>
                      <p className="text-sm text-muted-foreground">Play sound when receiving notifications</p>
                    </div>
                    <Switch id="soundAlerts" />
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-medium mb-3">SMS Notifications</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="smsAppointments" className="text-base">Appointment Alerts</Label>
                      <p className="text-sm text-muted-foreground">Receive text message alerts for upcoming or changed appointments</p>
                    </div>
                    <Switch id="smsAppointments" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="smsEmergencies" className="text-base">Emergency Notifications</Label>
                      <p className="text-sm text-muted-foreground">Get urgent patient concerns via text message</p>
                    </div>
                    <Switch id="smsEmergencies" defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button variant="outline" className="mr-2">Cancel</Button>
              <Button onClick={handleSave} className="bg-medical-800 hover:bg-medical-900">Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="practice">
          <Card>
            <CardHeader>
              <CardTitle>Practice Settings</CardTitle>
              <CardDescription>Configure your practice details and preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="practiceName">Practice Name</Label>
                <Input id="practiceName" defaultValue="Heart Care Specialists" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" defaultValue="123 Medical Center Blvd, Suite 400" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City, State, ZIP</Label>
                  <Input id="city" defaultValue="San Francisco, CA 94122" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="officePhone">Office Phone</Label>
                  <Input id="officePhone" defaultValue="(415) 555-0123" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fax">Fax Number</Label>
                  <Input id="fax" defaultValue="(415) 555-0124" />
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-medium mb-3">Business Hours</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Monday - Friday</Label>
                    <div className="flex gap-2">
                      <Input defaultValue="8:30 AM" />
                      <span className="flex items-center">to</span>
                      <Input defaultValue="5:00 PM" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Saturday</Label>
                    <div className="flex gap-2">
                      <Input defaultValue="9:00 AM" />
                      <span className="flex items-center">to</span>
                      <Input defaultValue="1:00 PM" />
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-medium mb-3">Appointment Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="allowOnlineBooking" className="text-base">Online Appointment Booking</Label>
                      <p className="text-sm text-muted-foreground">Allow patients to book appointments online</p>
                    </div>
                    <Switch id="allowOnlineBooking" defaultChecked />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="defaultDuration">Default Appointment Duration</Label>
                      <div className="flex items-center gap-2">
                        <Input id="defaultDuration" type="number" defaultValue="30" />
                        <span>minutes</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bufferTime">Buffer Time Between Appointments</Label>
                      <div className="flex items-center gap-2">
                        <Input id="bufferTime" type="number" defaultValue="10" />
                        <span>minutes</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button variant="outline" className="mr-2">Cancel</Button>
              <Button onClick={handleSave} className="bg-medical-800 hover:bg-medical-900">Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your account security and access preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-3">Password</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input id="confirmPassword" type="password" />
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Change Password</Button>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-medium mb-3">Two-Factor Authentication</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="enable2fa" className="text-base">Enable Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                    </div>
                    <Switch id="enable2fa" />
                  </div>
                  <Button variant="outline" size="sm">Set Up 2FA</Button>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-medium mb-3">Session Management</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="autoLogout" className="text-base">Automatic Logout</Label>
                      <p className="text-sm text-muted-foreground">Automatically log out after period of inactivity</p>
                    </div>
                    <Switch id="autoLogout" defaultChecked />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="logoutTime">Logout After Inactivity</Label>
                    <div className="flex items-center gap-2">
                      <Input id="logoutTime" type="number" defaultValue="30" />
                      <span>minutes</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                    Log Out All Other Devices
                  </Button>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-medium mb-3">Privacy</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="privacyMode" className="text-base">Privacy Mode</Label>
                      <p className="text-sm text-muted-foreground">Hide patient sensitive information in public areas</p>
                    </div>
                    <Switch id="privacyMode" defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button variant="outline" className="mr-2">Cancel</Button>
              <Button onClick={handleSave} className="bg-medical-800 hover:bg-medical-900">Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="integrations">
          <Card>
            <CardHeader>
              <CardTitle>Integrations</CardTitle>
              <CardDescription>Connect external services and tools to enhance your practice.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><path d="M18 6H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h13l4-3.5L18 6Z"/><path d="M12 13v9"/><path d="M12 2v4"/></svg>
                    </div>
                    <div>
                      <h4 className="text-base font-medium">Electronic Health Records</h4>
                      <p className="text-sm text-muted-foreground">Connect to your EHR system for seamless patient data</p>
                    </div>
                  </div>
                  <Button variant="outline">Connect</Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
                    </div>
                    <div>
                      <h4 className="text-base font-medium">Payment Processor</h4>
                      <p className="text-sm text-muted-foreground">Accept payments and insurance claims</p>
                    </div>
                  </div>
                  <Button variant="outline">Connect</Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
                    </div>
                    <div>
                      <h4 className="text-base font-medium">Lab Results</h4>
                      <p className="text-sm text-muted-foreground">Automatically import lab results from testing facilities</p>
                    </div>
                  </div>
                  <div>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100 mr-2">Connected</Badge>
                    <Button variant="outline">Manage</Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                    </div>
                    <div>
                      <h4 className="text-base font-medium">Email Marketing</h4>
                      <p className="text-sm text-muted-foreground">Send newsletters and health tips to patients</p>
                    </div>
                  </div>
                  <Button variant="outline">Connect</Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-600"><path d="m2 8 2 2-2 2 2 2-2 2"/><path d="m22 8-2 2 2 2-2 2 2 2"/><path d="M8 8v10c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V8"/><path d="M11 5h2v3h-2z"/></svg>
                    </div>
                    <div>
                      <h4 className="text-base font-medium">Telemedicine</h4>
                      <p className="text-sm text-muted-foreground">Integrate video consultation capabilities</p>
                    </div>
                  </div>
                  <div>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100 mr-2">Connected</Badge>
                    <Button variant="outline">Manage</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
