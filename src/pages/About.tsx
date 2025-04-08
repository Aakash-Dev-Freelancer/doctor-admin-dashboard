
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const About = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">About Dr. Sarah Chen</h1>
        <p className="text-muted-foreground mt-2">Board-certified Cardiologist with over 15 years of experience</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-32 w-32">
                <AvatarImage 
                  src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                  alt="Dr. Sarah Chen"
                />
                <AvatarFallback>DR</AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-bold mt-4">Dr. Sarah Chen, M.D., FACC</h2>
              <p className="text-muted-foreground">Cardiologist</p>
              
              <div className="flex flex-wrap gap-2 justify-center mt-4">
                <Badge variant="outline" className="bg-medical-100">Cardiology</Badge>
                <Badge variant="outline" className="bg-medical-100">Heart Health</Badge>
                <Badge variant="outline" className="bg-medical-100">Preventive Care</Badge>
              </div>
              
              <div className="border-t w-full my-6 pt-6">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold">15+</p>
                    <p className="text-muted-foreground text-sm">Years Experience</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">2,500+</p>
                    <p className="text-muted-foreground text-sm">Patients</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">30+</p>
                    <p className="text-muted-foreground text-sm">Publications</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">12+</p>
                    <p className="text-muted-foreground text-sm">Awards</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Professional Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">Biography</h3>
              <p className="text-muted-foreground">
                Dr. Sarah Chen is a board-certified cardiologist specializing in preventive cardiology and women's heart health. With over 15 years of clinical experience, she has dedicated her career to improving cardiovascular outcomes through personalized care, education, and innovative treatment approaches.
              </p>
              <p className="text-muted-foreground mt-2">
                After completing her medical degree at Stanford University School of Medicine, Dr. Chen pursued her residency at Massachusetts General Hospital and a cardiology fellowship at Johns Hopkins Medicine. Her passion for patient-centered care and medical education has made her a respected leader in the field.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Education & Training</h3>
              <ul className="space-y-3">
                <li className="flex justify-between">
                  <span className="font-medium">Cardiology Fellowship</span>
                  <span className="text-muted-foreground">Johns Hopkins Medicine</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium">Residency, Internal Medicine</span>
                  <span className="text-muted-foreground">Massachusetts General Hospital</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium">Doctor of Medicine</span>
                  <span className="text-muted-foreground">Stanford University School of Medicine</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium">Bachelor of Science, Biochemistry</span>
                  <span className="text-muted-foreground">Yale University</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Certifications & Affiliations</h3>
              <ul className="space-y-3">
                <li className="flex justify-between">
                  <span className="font-medium">Board Certification in Cardiovascular Disease</span>
                  <span className="text-muted-foreground">American Board of Internal Medicine</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium">Fellow</span>
                  <span className="text-muted-foreground">American College of Cardiology (FACC)</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium">Member</span>
                  <span className="text-muted-foreground">American Heart Association</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium">Member</span>
                  <span className="text-muted-foreground">Women in Cardiology</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Practice Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-lg mb-3">Office Hours</h3>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Monday - Friday</span>
                  <span>8:30 AM - 5:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Saturday</span>
                  <span>9:00 AM - 1:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Sunday</span>
                  <span>Closed</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-3">Contact Information</h3>
              <address className="not-italic space-y-2">
                <p className="flex justify-between">
                  <span className="text-muted-foreground">Address:</span>
                  <span>123 Medical Center Blvd, Suite 400, San Francisco, CA 94122</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-muted-foreground">Phone:</span>
                  <span>(415) 555-0123</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-muted-foreground">Email:</span>
                  <span>dr.chen@heartcarespecialists.com</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-muted-foreground">Fax:</span>
                  <span>(415) 555-0124</span>
                </p>
              </address>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-3">Services Offered</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                "Cardiac Consultations", 
                "Echocardiograms", 
                "Stress Testing",
                "Holter Monitoring",
                "Preventive Cardiology",
                "Women's Heart Health",
                "Cardiac Rehabilitation",
                "Telehealth Appointments"
              ].map((service, index) => (
                <div key={index} className="bg-accent p-3 rounded-md text-sm">
                  {service}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default About;
