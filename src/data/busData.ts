// Dummy data for Punjab Government buses

export interface Bus {
  id: string;
  number: string;
  route: string;
  from: string;
  to: string;
  currentLocation: {
    lat: number;
    lng: number;
  };
  nextStop: string;
  eta: number; // minutes
  capacity: number;
  occupancy: number;
  driver: string;
  status: 'on-time' | 'delayed' | 'early';
  lastUpdated: Date;
}

export interface Route {
  id: string;
  name: string;
  number: string;
  from: string;
  to: string;
  stops: string[];
  distance: number; // km
  duration: number; // minutes
  frequency: number; // minutes
  fare: number; // rupees
  firstBus: string;
  lastBus: string;
  type: 'ordinary' | 'deluxe' | 'ac';
}

export interface Schedule {
  id: string;
  routeId: string;
  busNumber: string;
  departureTime: string;
  arrivalTime: string;
  days: string[];
  isActive: boolean;
}

// Live bus data
export const buses: Bus[] = [
  {
    id: '1',
    number: 'PB-01-AC-2023',
    route: 'Chandigarh - Amritsar',
    from: 'Chandigarh ISBT',
    to: 'Amritsar Bus Stand',
    currentLocation: { lat: 30.7333, lng: 76.7794 },
    nextStop: 'Kharar',
    eta: 8,
    capacity: 45,
    occupancy: 32,
    driver: 'Harbhajan Singh',
    status: 'on-time',
    lastUpdated: new Date()
  },
  {
    id: '2',
    number: 'PB-02-DLX-2023',
    route: 'Ludhiana - Jalandhar',
    from: 'Ludhiana Bus Stand',
    to: 'Jalandhar City',
    currentLocation: { lat: 30.9010, lng: 75.8573 },
    nextStop: 'Phillaur',
    eta: 12,
    capacity: 40,
    occupancy: 28,
    driver: 'Gurpreet Kaur',
    status: 'delayed',
    lastUpdated: new Date()
  },
  {
    id: '3',
    number: 'PB-03-ORD-2023',
    route: 'Patiala - Bathinda',
    from: 'Patiala Bus Terminal',
    to: 'Bathinda Junction',
    currentLocation: { lat: 30.3398, lng: 76.3869 },
    nextStop: 'Sangrur',
    eta: 5,
    capacity: 50,
    occupancy: 42,
    driver: 'Rajinder Singh',
    status: 'on-time',
    lastUpdated: new Date()
  },
  {
    id: '4',
    number: 'PB-04-AC-2023',
    route: 'Mohali - Ropar',
    from: 'Mohali Phase 7',
    to: 'Ropar Bus Stand',
    currentLocation: { lat: 30.7046, lng: 76.7179 },
    nextStop: 'Kurali',
    eta: 15,
    capacity: 35,
    occupancy: 20,
    driver: 'Simran Jeet',
    status: 'early',
    lastUpdated: new Date()
  },
  {
    id: '5',
    number: 'PB-05-DLX-2023',
    route: 'Ferozepur - Fazilka',
    from: 'Ferozepur Cantt',
    to: 'Fazilka Border',
    currentLocation: { lat: 30.9107, lng: 74.6140 },
    nextStop: 'Jalalabad',
    eta: 20,
    capacity: 40,
    occupancy: 35,
    driver: 'Manpreet Singh',
    status: 'on-time',
    lastUpdated: new Date()
  }
];

// Route information
export const routes: Route[] = [
  {
    id: '1',
    name: 'Chandigarh - Amritsar Express',
    number: 'CHD-ASR-01',
    from: 'Chandigarh ISBT',
    to: 'Amritsar Bus Stand',
    stops: ['Chandigarh ISBT', 'Kharar', 'Kurali', 'Ropar', 'Morinda', 'Khanna', 'Ludhiana', 'Phillaur', 'Jalandhar', 'Kapurthala', 'Sultanpur Lodhi', 'Goindwal Sahib', 'Amritsar'],
    distance: 230,
    duration: 300,
    frequency: 30,
    fare: 280,
    firstBus: '05:00',
    lastBus: '22:00',
    type: 'ac'
  },
  {
    id: '2',
    name: 'Ludhiana - Jalandhar Local',
    number: 'LDH-JLD-02',
    from: 'Ludhiana Bus Stand',
    to: 'Jalandhar City',
    stops: ['Ludhiana', 'Sahnewal', 'Machhiwara', 'Samrala', 'Phillaur', 'Nakodar', 'Jalandhar'],
    distance: 85,
    duration: 120,
    frequency: 20,
    fare: 95,
    firstBus: '05:30',
    lastBus: '21:30',
    type: 'deluxe'
  },
  {
    id: '3',
    name: 'Patiala - Bathinda Highway',
    number: 'PTL-BTI-03',
    from: 'Patiala Bus Terminal',
    to: 'Bathinda Junction',
    stops: ['Patiala', 'Nabha', 'Sangrur', 'Sunam', 'Dirba', 'Bathinda'],
    distance: 110,
    duration: 150,
    frequency: 45,
    fare: 120,
    firstBus: '06:00',
    lastBus: '20:00',
    type: 'ordinary'
  },
  {
    id: '4',
    name: 'Mohali - Ropar Circuit',
    number: 'MOH-RUP-04',
    from: 'Mohali Phase 7',
    to: 'Ropar Bus Stand',
    stops: ['Mohali', 'Kurali', 'Kharar', 'Nangal', 'Ropar'],
    distance: 45,
    duration: 75,
    frequency: 25,
    fare: 55,
    firstBus: '06:30',
    lastBus: '21:00',
    type: 'ac'
  },
  {
    id: '5',
    name: 'Ferozepur - Fazilka Border',
    number: 'FZR-FAZ-05',
    from: 'Ferozepur Cantt',
    to: 'Fazilka Border',
    stops: ['Ferozepur', 'Zira', 'Jalalabad', 'Fazilka'],
    distance: 65,
    duration: 90,
    frequency: 60,
    fare: 75,
    firstBus: '07:00',
    lastBus: '19:00',
    type: 'deluxe'
  }
];

// Bus schedules
export const schedules: Schedule[] = [
  {
    id: '1',
    routeId: '1',
    busNumber: 'PB-01-AC-2023',
    departureTime: '08:00',
    arrivalTime: '13:00',
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    isActive: true
  },
  {
    id: '2',
    routeId: '2',
    busNumber: 'PB-02-DLX-2023',
    departureTime: '09:30',
    arrivalTime: '11:30',
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    isActive: true
  },
  {
    id: '3',
    routeId: '3',
    busNumber: 'PB-03-ORD-2023',
    departureTime: '07:15',
    arrivalTime: '09:45',
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    isActive: true
  },
  {
    id: '4',
    routeId: '4',
    busNumber: 'PB-04-AC-2023',
    departureTime: '10:00',
    arrivalTime: '11:15',
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    isActive: true
  },
  {
    id: '5',
    routeId: '5',
    busNumber: 'PB-05-DLX-2023',
    departureTime: '14:30',
    arrivalTime: '16:00',
    days: ['Monday', 'Wednesday', 'Friday', 'Sunday'],
    isActive: true
  }
];

export const emergencyContacts = [
  { name: 'Police Emergency', number: '100', type: 'emergency' },
  { name: 'Women Helpline', number: '1091', type: 'safety' },
  { name: 'Punjab Transport Authority', number: '181', type: 'transport' },
  { name: 'Medical Emergency', number: '108', type: 'medical' },
  { name: 'Fire Department', number: '101', type: 'fire' },
];

// Function to simulate real-time updates
export const updateBusLocations = () => {
  buses.forEach(bus => {
    // Simulate small movements
    bus.currentLocation.lat += (Math.random() - 0.5) * 0.001;
    bus.currentLocation.lng += (Math.random() - 0.5) * 0.001;
    bus.eta = Math.max(1, bus.eta + Math.floor(Math.random() * 3 - 1));
    bus.lastUpdated = new Date();
  });
};