
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Terms = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Terms & Conditions</h1>
        <p className="text-muted-foreground mt-2">Last updated: April 1, 2025</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Office Policies</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <h2 className="text-lg font-semibold text-foreground">Appointment Scheduling</h2>
          <p>
            Appointments can be scheduled through our online portal, by phone, or in person at our office. We recommend booking appointments at least 2 weeks in advance for routine visits and check-ups.
          </p>
          <p>
            For urgent matters, please call our office directly. We reserve same-day appointments for urgent cases as determined by our clinical staff.
          </p>
          
          <h2 className="text-lg font-semibold text-foreground mt-6">Cancellation Policy</h2>
          <p>
            We understand that situations arise when you must cancel your appointment. We request that if you must cancel your appointment, please provide at least 24 hours notice. This allows us to offer the appointment time to another patient.
          </p>
          <p>
            Appointments canceled with less than 24 hours notice may be subject to a cancellation fee of $50. Repeated late cancellations or no-shows may result in discharge from the practice.
          </p>
          
          <h2 className="text-lg font-semibold text-foreground mt-6">Insurance and Billing</h2>
          <p>
            We participate with most major insurance carriers. As a courtesy, we will file claims with your insurance company on your behalf. However, please note that you are ultimately responsible for payment of services rendered.
          </p>
          <p>
            Co-payments are due at the time of service. For patients with high-deductible plans, payment for the visit may be collected at the time of service and adjusted once insurance processing is complete.
          </p>
          
          <h2 className="text-lg font-semibold text-foreground mt-6">Medical Records</h2>
          <p>
            Medical records are available to patients upon request. Please allow 5-7 business days for processing. A fee may apply for copying and mailing records in accordance with state regulations.
          </p>
          <p>
            Records can be accessed electronically through our patient portal at no charge. We encourage all patients to sign up for portal access for convenient communication and record retrieval.
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Privacy Practices</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <h2 className="text-lg font-semibold text-foreground">HIPAA Compliance</h2>
          <p>
            Our practice complies with all requirements of the Health Insurance Portability and Accountability Act (HIPAA). We are committed to protecting your medical information and privacy.
          </p>
          <p>
            A detailed Notice of Privacy Practices is available in our office and on our website. This document explains how medical information about you may be used and disclosed and how you can access this information.
          </p>
          
          <h2 className="text-lg font-semibold text-foreground mt-6">Electronic Communications</h2>
          <p>
            Our patient portal and messaging system are secure, HIPAA-compliant platforms for communication. Standard email and text messages are not secure forms of communication and should not be used for sensitive medical information.
          </p>
          <p>
            By providing your email address and phone number, you consent to receive appointment reminders and general office communications through these channels. You may opt out at any time.
          </p>
          
          <h2 className="text-lg font-semibold text-foreground mt-6">Telehealth Services</h2>
          <p>
            Telehealth services are provided through a secure, encrypted platform that complies with all privacy regulations. By participating in telehealth visits, you acknowledge the inherent limitations and risks of virtual care.
          </p>
          <p>
            We recommend using a private, secure internet connection when participating in telehealth visits. Public Wi-Fi networks may compromise the security of your information.
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Patient Responsibilities</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <h2 className="text-lg font-semibold text-foreground">Providing Information</h2>
          <p>
            Patients are responsible for providing accurate and complete information about their health status, medications, allergies, and previous medical history. Withholding information may lead to adverse outcomes for which the practice cannot be held responsible.
          </p>
          
          <h2 className="text-lg font-semibold text-foreground mt-6">Following Treatment Plans</h2>
          <p>
            Patients are expected to follow the treatment plans prescribed by their healthcare providers, including medication regimens, lifestyle modifications, and follow-up appointments. Non-adherence may result in suboptimal outcomes.
          </p>
          <p>
            If you are unable to follow recommendations due to financial constraints or other reasons, please discuss this with your provider so alternative approaches can be considered.
          </p>
          
          <h2 className="text-lg font-semibold text-foreground mt-6">Respectful Behavior</h2>
          <p>
            We strive to maintain a safe, respectful environment for all patients and staff. Abusive behavior, harassment, or discrimination will not be tolerated and may result in termination of the doctor-patient relationship.
          </p>
          <p>
            Patients are expected to respect the privacy and confidentiality of others while in our office.
          </p>
          
          <h2 className="text-lg font-semibold text-foreground mt-6">Acceptance of Terms</h2>
          <p>
            By receiving care at our practice, you acknowledge that you have read, understood, and agree to abide by these terms and conditions. These policies are subject to change, and the current version will always be available upon request and on our website.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Terms;
