import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import connectDB from './config/db.js';
import User from './models/User.js';
import Session from './models/Session.js';
import Review from './models/Review.js';
import Verification from './models/Verification.js';

dotenv.config();
connectDB();

const seedData = async () => {
  try {
    await User.deleteMany();
    await Session.deleteMany();
    await Review.deleteMany();
    await Verification.deleteMany();

    const hashedPass = await bcrypt.hash('password123', 12);

    // Create Admins
    const admins = await User.insertMany([
      { name: 'Admin One', email: 'admin1@edu.pk', password: hashedPass, role: 'admin' },
      { name: 'Admin Two', email: 'admin2@edu.pk', password: hashedPass, role: 'admin' }
    ]);

    // Create Tutors
    const tutors = await User.insertMany([
      {
        name: 'Umar Khan', email: 'umar@edu.pk', password: hashedPass, role: 'tutor',
        qualifications: 'MSc Mathematics', subjects: ['Math', 'Physics'], hourlyRate: 800,
        preferences: 'both', isVerified: true,
        availability: [{ day: 'Monday', timeSlots: ['10AM', '2PM'] }, { day: 'Wednesday', timeSlots: ['3PM'] }]
      },
      {
        name: 'Sara Ali', email: 'sara@edu.pk', password: hashedPass, role: 'tutor',
        qualifications: 'PhD Chemistry', subjects: ['Chemistry'], hourlyRate: 1000,
        preferences: 'online', isVerified: false,
        availability: [{ day: 'Tuesday', timeSlots: ['11AM'] }]
      },
      {
        name: 'Ahsan Raza', email: 'ahsan@edu.pk', password: hashedPass, role: 'tutor',
        qualifications: 'MPhil Biology', subjects: ['Biology'], hourlyRate: 700,
        preferences: 'in-person', isVerified: true,
        availability: [{ day: 'Friday', timeSlots: ['9AM'] }]
      },
      {
        name: 'Nida Tariq', email: 'nida@edu.pk', password: hashedPass, role: 'tutor',
        qualifications: 'MSc English Literature', subjects: ['English'], hourlyRate: 650,
        preferences: 'both', isVerified: true,
        availability: [{ day: 'Thursday', timeSlots: ['1PM'] }]
      },
      {
        name: 'Bilal Shah', email: 'bilal@edu.pk', password: hashedPass, role: 'tutor',
        qualifications: 'BSc Computer Science', subjects: ['Computer Science'], hourlyRate: 900,
        preferences: 'online', isVerified: false,
        availability: [{ day: 'Saturday', timeSlots: ['4PM'] }]
      },
      {
        name: 'Fatima Zubair', email: 'fatima@edu.pk', password: hashedPass, role: 'tutor',
        qualifications: 'MA Urdu', subjects: ['Urdu'], hourlyRate: 600,
        preferences: 'in-person', isVerified: false,
        availability: [{ day: 'Monday', timeSlots: ['11AM'] }]
      },
      {
        name: 'Kamran Iqbal', email: 'kamran@edu.pk', password: hashedPass, role: 'tutor',
        qualifications: 'MSc Geography', subjects: ['Geography'], hourlyRate: 750,
        preferences: 'both', isVerified: false,
        availability: [{ day: 'Tuesday', timeSlots: ['2PM'] }]
      },
      {
        name: 'Iqra Asif', email: 'iqra@edu.pk', password: hashedPass, role: 'tutor',
        qualifications: 'MPhil Sociology', subjects: ['Sociology'], hourlyRate: 850,
        preferences: 'online', isVerified: false,
        availability: [{ day: 'Wednesday', timeSlots: ['10AM'] }]
      }
    ]);

    // Create Students
    const students = await User.insertMany([
      { name: 'Ali Student', email: 'ali@student.pk', password: hashedPass, role: 'student' },
      { name: 'Zara Learner', email: 'zara@student.pk', password: hashedPass, role: 'student' },
      { name: 'Hamza Noor', email: 'hamza@student.pk', password: hashedPass, role: 'student' },
      { name: 'Mehwish Rafiq', email: 'mehwish@student.pk', password: hashedPass, role: 'student' },
      { name: 'Tariq Jan', email: 'tariq@student.pk', password: hashedPass, role: 'student' }
    ]);

    // Create Sessions
    await Session.insertMany([
      { student: students[0]._id, tutor: tutors[0]._id, date: new Date(), time: '10AM', type: 'online', status: 'completed', price: 800 },
      { student: students[1]._id, tutor: tutors[2]._id, date: new Date(), time: '9AM', type: 'in-person', status: 'confirmed', price: 700 },
      { student: students[0]._id, tutor: tutors[1]._id, date: new Date(), time: '11AM', type: 'online', status: 'pending', price: 1000 },
      { student: students[1]._id, tutor: tutors[3]._id, date: new Date(), time: '1PM', type: 'in-person', status: 'completed', price: 650 },
      { student: students[2]._id, tutor: tutors[4]._id, date: new Date(), time: '4PM', type: 'online', status: 'pending', price: 900 },
      { student: students[3]._id, tutor: tutors[5]._id, date: new Date(), time: '11AM', type: 'in-person', status: 'confirmed', price: 600 }
    ]);

    // Create Reviews
    await Review.insertMany([
      { student: students[0]._id, tutor: tutors[0]._id, rating: 5, reviewText: 'Amazing math tutor!' },
      { student: students[1]._id, tutor: tutors[2]._id, rating: 4, reviewText: 'Very helpful in biology.' },
      { student: students[1]._id, tutor: tutors[3]._id, rating: 3, reviewText: 'Decent but needs more examples.' },
      { student: students[2]._id, tutor: tutors[4]._id, rating: 4, reviewText: 'Interactive and friendly.' }
    ]);

    // Create Verification Requests
    await Verification.insertMany([
      { tutor: tutors[1]._id, documents: ['doc1.pdf'], status: 'pending' },
      { tutor: tutors[4]._id, documents: ['doc2.pdf'], status: 'pending' },
      { tutor: tutors[5]._id, documents: ['doc3.pdf'], status: 'pending' }
    ]);

    console.log('✅ Full dummy data seeded successfully!');
    process.exit();
  } catch (error) {
    console.error('❌ Seeder error:', error);
    process.exit(1);
  }
};

seedData();
