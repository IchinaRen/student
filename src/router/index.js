import Vue from 'vue'
import VueRouter from 'vue-router'
import Student from '../views/Student.vue'
import Graduate from '../views/Graduate.vue'
import Course from '../views/Course.vue'

import ChooseCoures from "@/views/ChooseCoures";
import ShowData from "@/views/ShowData";
import StudentIntroduce from "@/views/StudentIntroduce";
Vue.use(VueRouter)

const routes = [

  {
    path:'/student',
    name: 'Student',
    component: Student
  },{
    path:'/graduate',
    name: 'Graduate',
    component: Graduate
  },
  {
    path:'/course',
    name: 'Course',
    component: Course
  },
  {
    path:'/ChooseCourse',
    name: 'ChooseCourse',
    component: ChooseCoures
  },
  {
    path:'/ShowData',
    name: 'ShowData',
    component: ShowData
  },
  {
    path:'/StudentIntroduce',
    name: 'StudentIntroduce',
    component: StudentIntroduce
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
