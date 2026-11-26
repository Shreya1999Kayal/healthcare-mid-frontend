import type { HospitalDoctor, HospitalExtra } from "../../types/type/public/Hospital.type"

// Placeholder data, replace with real data from the API later.
// hospitalId must match an id in hospitalsList. doctorId must match an id in doctorsList.
export const hospitalDoctors: HospitalDoctor[] = [
  { id: "hd1", hospitalId: "1", doctorId: "2", name: "Dr. Kathryn Murphy", department: "Pediatric Medicine", designation: "Senior Doctor", chamberDays: "Mon, Wed, Fri", chamberTime: "10:00 AM - 2:00 PM" },
  { id: "hd2", hospitalId: "1", doctorId: "3", name: "Dr. Robert Fox", department: "Gastroenterology", designation: "Consultant", chamberDays: "Tue, Thu, Sat", chamberTime: "11:00 AM - 3:00 PM" },
  { id: "hd3", hospitalId: "1", name: "Dr. Anirban Sen", department: "Cardiology", designation: "Senior Doctor", chamberDays: "Mon to Sat", chamberTime: "9:00 AM - 1:00 PM" },
  { id: "hd4", hospitalId: "1", name: "Dr. Riya Das", department: "Orthopaedics", designation: "Junior Doctor", chamberDays: "Mon, Thu", chamberTime: "4:00 PM - 7:00 PM" },
  { id: "hd5", hospitalId: "2", doctorId: "6", name: "Dr. Cody Fisher", department: "Neurology", designation: "Senior Doctor", chamberDays: "Mon, Tue, Thu", chamberTime: "10:00 AM - 1:00 PM" },
  { id: "hd6", hospitalId: "2", doctorId: "8", name: "Dr. Guy Hawkins", department: "Orthopaedics", designation: "Consultant", chamberDays: "Wed, Fri, Sat", chamberTime: "12:00 PM - 4:00 PM" },
  { id: "hd7", hospitalId: "2", name: "Dr. Sameer Khan", department: "Emergency Medicine", designation: "Junior Doctor", chamberDays: "Mon to Sun", chamberTime: "Shift based, 24 hours" },
  { id: "hd8", hospitalId: "3", doctorId: "7", name: "Dr. Darlene Robertson", department: "Paediatrics", designation: "Senior Doctor", chamberDays: "Mon to Fri", chamberTime: "10:00 AM - 2:00 PM" },
  { id: "hd9", hospitalId: "3", name: "Dr. Pallavi Roy", department: "Neonatology", designation: "Consultant", chamberDays: "Tue, Thu, Sat", chamberTime: "11:00 AM - 3:00 PM" },
  { id: "hd10", hospitalId: "3", name: "Dr. Ishaan Gupta", department: "Child Nutrition", designation: "Junior Doctor", chamberDays: "Mon, Wed", chamberTime: "3:00 PM - 6:00 PM" },
  { id: "hd11", hospitalId: "4", name: "Dr. Meena Iyer", department: "Ophthalmology", designation: "Senior Doctor", chamberDays: "Mon to Sat", chamberTime: "9:00 AM - 1:00 PM" },
  { id: "hd12", hospitalId: "4", name: "Dr. Rohan Basu", department: "Retina Care", designation: "Consultant", chamberDays: "Tue, Fri", chamberTime: "2:00 PM - 6:00 PM" },
  { id: "hd13", hospitalId: "4", name: "Dr. Tania Ghosh", department: "Cornea Care", designation: "Junior Doctor", chamberDays: "Mon, Wed, Sat", chamberTime: "10:00 AM - 1:00 PM" },
  { id: "hd14", hospitalId: "5", doctorId: "4", name: "Dr. Esther Howard", department: "Thoracic Surgery", designation: "Senior Doctor", chamberDays: "Mon, Wed, Fri", chamberTime: "10:00 AM - 2:00 PM" },
  { id: "hd15", hospitalId: "5", doctorId: "5", name: "Dr. Jenny Wilson", department: "Cardiology", designation: "Consultant", chamberDays: "Tue, Thu, Sat", chamberTime: "11:00 AM - 4:00 PM" },
  { id: "hd16", hospitalId: "5", name: "Dr. Vikram Nair", department: "Cardiac Anaesthesia", designation: "Junior Doctor", chamberDays: "Mon to Fri", chamberTime: "9:00 AM - 12:00 PM" },
  { id: "hd17", hospitalId: "6", doctorId: "1", name: "Dr. Leslie Alexander", department: "Dental Surgery", designation: "Consultant", chamberDays: "Mon, Wed, Fri", chamberTime: "10:00 AM - 1:00 PM" },
  { id: "hd18", hospitalId: "6", name: "Dr. Subhra Paul", department: "General Medicine", designation: "Senior Doctor", chamberDays: "Mon to Fri", chamberTime: "9:00 AM - 1:00 PM" },
  { id: "hd19", hospitalId: "6", name: "Dr. Aman Verma", department: "General Surgery", designation: "Junior Doctor", chamberDays: "Tue, Thu", chamberTime: "3:00 PM - 6:00 PM" },
  { id: "hd20", hospitalId: "3", doctorId: "2", name: "Dr. Kathryn Murphy", department: "Pediatric Medicine", designation: "Consultant", chamberDays: "Tue, Thu", chamberTime: "11:00 AM - 3:00 PM" },
  { id: "hd21", hospitalId: "6", doctorId: "3", name: "Dr. Robert Fox", department: "Gastroenterology", designation: "Senior Doctor", chamberDays: "Mon, Fri", chamberTime: "4:00 PM - 7:00 PM" },
  { id: "hd22", hospitalId: "2", doctorId: "4", name: "Dr. Esther Howard", department: "Thoracic Surgery", designation: "Consultant", chamberDays: "Tue, Thu", chamberTime: "3:00 PM - 6:00 PM" },
  { id: "hd23", hospitalId: "1", doctorId: "4", name: "Dr. Esther Howard", department: "Thoracic Surgery", designation: "Consultant", chamberDays: "Sat", chamberTime: "10:00 AM - 1:00 PM" },
  { id: "hd24", hospitalId: "1", doctorId: "5", name: "Dr. Jenny Wilson", department: "Cardiology", designation: "Consultant", chamberDays: "Mon, Wed", chamberTime: "5:00 PM - 8:00 PM" },
  { id: "hd25", hospitalId: "5", doctorId: "6", name: "Dr. Cody Fisher", department: "Neurology", designation: "Consultant", chamberDays: "Wed, Fri", chamberTime: "2:00 PM - 5:00 PM" },
  { id: "hd26", hospitalId: "1", doctorId: "8", name: "Dr. Guy Hawkins", department: "Orthopaedics", designation: "Senior Doctor", chamberDays: "Mon", chamberTime: "5:00 PM - 8:00 PM" },
  { id: "hd27", hospitalId: "1", doctorId: "1", name: "Dr. Leslie Alexander", department: "Dental Surgery", designation: "Senior Doctor", chamberDays: "Tue, Thu", chamberTime: "4:00 PM - 7:00 PM" },
  { id: "hd28", hospitalId: "3", doctorId: "1", name: "Dr. Leslie Alexander", department: "Dental Surgery", designation: "Consultant", chamberDays: "Sat", chamberTime: "10:00 AM - 1:00 PM" },
]

export const hospitalExtras: HospitalExtra[] = [
  {
    hospitalId: "1",
    email: "info@sevacityhospital.com",
    ambulancesAvailable: 8,
    bedsAvailable: 62,
    reviews: [
      { id: "r1", name: "Riya S.", rating: 5, comment: "Quick admission and very caring staff. The doctors explained everything clearly.", date: "2026-10-18" },
      { id: "r2", name: "Arjun M.", rating: 5, comment: "Clean wards and the emergency team reacted within minutes.", date: "2026-09-03" },
    ],
  },
  {
    hospitalId: "2",
    email: "care@lifelinetrauma.com",
    ambulancesAvailable: 12,
    bedsAvailable: 35,
    reviews: [
      { id: "r3", name: "Imran H.", rating: 5, comment: "The ambulance reached us fast and the trauma team took over at once.", date: "2026-10-27" },
      { id: "r4", name: "Sneha D.", rating: 4, comment: "Excellent emergency care. The waiting area can get crowded.", date: "2026-08-14" },
    ],
  },
  {
    hospitalId: "3",
    email: "hello@littlestepshospital.com",
    ambulancesAvailable: 3,
    bedsAvailable: 28,
    reviews: [
      { id: "r5", name: "Pooja R.", rating: 5, comment: "Doctors were gentle with my child and the NICU staff were wonderful.", date: "2026-10-05" },
      { id: "r6", name: "Subhajit B.", rating: 5, comment: "Child-friendly rooms and a very patient paediatric team.", date: "2026-07-21" },
    ],
  },
  {
    hospitalId: "4",
    email: "appointments@clearvieweye.com",
    ambulancesAvailable: 0,
    bedsAvailable: 14,
    reviews: [
      { id: "r7", name: "Meghna T.", rating: 5, comment: "My cataract surgery went smoothly and the follow-up care was great.", date: "2026-09-19" },
      { id: "r8", name: "Debashis K.", rating: 4, comment: "Modern equipment and short waiting time. Parking is limited.", date: "2026-06-30" },
    ],
  },
  {
    hospitalId: "5",
    email: "contact@heartcareinstitute.com",
    ambulancesAvailable: 6,
    bedsAvailable: 40,
    reviews: [
      { id: "r9", name: "Rakesh P.", rating: 5, comment: "The cardiac team handled my father's surgery with great skill.", date: "2026-10-09" },
      { id: "r10", name: "Anita G.", rating: 4, comment: "Very professional doctors. The billing process was a little slow.", date: "2026-08-02" },
    ],
  },
  {
    hospitalId: "6",
    email: "support@greencrossmedical.com",
    ambulancesAvailable: 4,
    bedsAvailable: 31,
    reviews: [
      { id: "r11", name: "Nabanita C.", rating: 5, comment: "Friendly staff and a very comfortable dental department.", date: "2026-09-26" },
      { id: "r12", name: "Farhan A.", rating: 4, comment: "Good doctors and reasonable fees. Appointments run a bit late.", date: "2026-07-11" },
    ],
  },
]