import express from 'express'
import {
  addDoctor,
  allDoctors,
  loginAdmin,
  updateDoctor,
  deleteDoctor,
  appointmentsAdmin,
  appointmentCancel,
  adminDashboard,
  addPatient,
  allPatients,
  deletePatient,
  updatePatient,
} from '../controllers/adminController.js';
import {
  addAdministrativeStaff,
  getAllAdministrativeStaff,
  updateAdministrativeStaff,
  deleteAdministrativeStaff,
  addNurse,
  getAllNurses,
  updateNurse,
  deleteNurse,
  addLabTechnician,
  getAllLabTechnicians,
  updateLabTechnician,
  deleteLabTechnician,
} from '../controllers/adminStaffController.js'
import upload from '../middlewares/multer.js'
import authAdmin from '../middlewares/authAdmin.js'

const adminRouter = express.Router()

adminRouter.post('/add-doctor', authAdmin, upload.single('image'), addDoctor)
adminRouter.post('/login', loginAdmin)
adminRouter.post('/all-doctors', authAdmin, allDoctors)
adminRouter.put('/update-doctor/:id', authAdmin, upload.single('image'), updateDoctor);
adminRouter.delete('/delete-doctor/:id', authAdmin, deleteDoctor);
adminRouter.get('/appointments', authAdmin, appointmentsAdmin)
adminRouter.post('/cancel-appointment', authAdmin, appointmentCancel)
adminRouter.get('/dashboard', authAdmin, adminDashboard)
adminRouter.post('/add-patient', authAdmin, upload.single('image'), addPatient)
adminRouter.post('/all-patient', authAdmin, allPatients)
adminRouter.delete('/delete-patient/:id', authAdmin, deletePatient)
adminRouter.put('/update-patient/:id', authAdmin, upload.single('image'), updatePatient);
// Administrative Staff routes
adminRouter.post('/administrative/add', authAdmin, upload.single('image'), addAdministrativeStaff);
adminRouter.post('/administrative', authAdmin, getAllAdministrativeStaff);
adminRouter.put('/administrative/:id', authAdmin, upload.single('image'), updateAdministrativeStaff);
adminRouter.delete('/administrative/:id', authAdmin, deleteAdministrativeStaff);
// Nurses routes
adminRouter.post('/nurses/add', authAdmin, upload.single('image'), addNurse);
adminRouter.post('/nurses', authAdmin, getAllNurses);
adminRouter.put('/nurses/:id', authAdmin, upload.single('image'), updateNurse);
adminRouter.delete('/nurses/:id', authAdmin, deleteNurse);
// Lab Technicians routes
adminRouter.post('/lab/add', authAdmin, upload.single('image'), addLabTechnician);
adminRouter.post('/lab', authAdmin, getAllLabTechnicians);
adminRouter.put('/lab/:id', authAdmin, upload.single('image'), updateLabTechnician);
adminRouter.delete('/lab/:id', authAdmin, deleteLabTechnician);

export default adminRouter