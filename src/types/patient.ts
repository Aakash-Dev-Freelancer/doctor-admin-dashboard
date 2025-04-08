
export interface Patient {
  id: number;
  first_name: string | null;
  last_name: string | null;
  phone_no: number | null;
  email: string | null;
  created_at: string;
}

export interface PatientChat {
  id: number;
  name: string;
  lastMessage: string;
  avatar?: string;
  unread: number;
  online: boolean;
}
