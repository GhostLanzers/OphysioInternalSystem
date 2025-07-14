export interface Service {
  id: number;
  title: string;
  description: string;
  price: number;
}

export interface BookingData {
  name: string;
  phone: string;
  email: string;
  healthIssue: string;
  selectedState: string;
  selectedCity: string;
  isOnlineRehab: boolean;
  selectedServices: Service[];
  selectedDate: Date | null;
  selectedTime: string;
}