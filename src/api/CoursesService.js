import axios from 'axios';

const baseURL = process.env.VUE_APP_BASE_URL;

export function findAllCoursesApi() {
    return axios.get(`${baseURL}/cursos`)
}

export function createCourseApi(course) {
    return axios.post(`${baseURL}/cursos`, course)
}

export function updateCourseApi(id, course) {
    return axios.put(`${baseURL}/cursos/${id}`, course)
}

export function findOneCourseApi(id) {
    return axios.get(`${baseURL}/cursos/${id}`)
}


