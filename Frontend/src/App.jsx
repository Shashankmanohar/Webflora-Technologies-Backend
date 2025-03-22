import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import School from './school/School'
import Attendance from './school/component/attendance/Attendance'
import Teacher from './school/component/teachers/Teacher'
import Students from './school/component/students/Students'
import Notices from './school/component/notices/Notices'
import Examinations from './school/component/examinations/Examinations'
import Schedule from './school/component/schedule/Schedule'
import Subject from './school/component/subject/Subject'
import Class from './school/component/class/Class'
import Dashboard from './school/component/dashboard/Dashboard'
import Student from './student/Student'
import StudentAttendance from './student/component/attendance/StudentAttendance'
import StudentDashboard from './student/component/dashboard/StudentDashboard'
import StudentExamination from './student/component/examination/StudentExamination'
import StudentNotice from './student/component/notice/StudentNotice'
import StudentSchedule from './student/component/schedule/StudentSchedule'
import Client from './client/Client'
import Register from './client/component/register/Register'
import Login from './client/component/login/Login'
import Home from './client/component/home/Home'
import Teachers from './teacher/teacher'
import TeacherAttendance from './teacher/components/attendance/TeacherAttendance'
import TeacherDashboard from './teacher/components/dashboard/TeacherDashboard'
import TeacherExamination from './teacher/components/examination/TeacherExamination'
import TeacherNotice from './teacher/components/notice/TeacherNotice'
import TeacherSchedule from './teacher/components/schedule/TeacherSchedule'
export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
            {/* School Routes */}
            <Route path='school' element={<School/>}>
               <Route index element={<Dashboard/>}/>
               <Route path='attendance' element={<Attendance/>}/>
               <Route path='teacher' element={<Teacher/>}/>
               <Route path='student' element={<Students/>}/>
               <Route path='subject' element={<Subject/>}/>
               <Route path='notice' element={<Notices/>}/>
               <Route path='examination' element={<Examinations/>}/>
               <Route path='schedule' element={<Schedule/>}/>
               <Route path='class' element={<Class/>}/>
            </Route>
            {/* Student Route */}
            <Route path='student' element={<Student/>}>
               <Route index element={<StudentDashboard/>}/>
               <Route path='attendance' element={<StudentAttendance/>}/>
               <Route path='examination' element={<StudentExamination/>}/>
               <Route path='notice' element={<StudentNotice/>}/>
               <Route path='schedule' element={<StudentSchedule/>}/>
            </Route>
            {/* Teacher Route */}
            <Route path='teacher' element={<Teachers/>}>
               <Route index element={<TeacherDashboard/>}/>
               <Route path='attendance' element={<TeacherAttendance/>}/>
               <Route path='examination' element={<TeacherExamination/>}/>
               <Route path='notice' element={<TeacherNotice/>}/>
               <Route path='schedule' element={<TeacherSchedule/>}/>
            </Route>
            {/* Client Route */}
            <Route path='/' element={<Client/>}>
               <Route path='home' element={<Home/>}/>
               <Route path='Login' element={<Login/>}/>
               <Route path='register' element={<Register/>}/>
            </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}
