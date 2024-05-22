import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            name: "courses",
            path: "/",
            component: () => import("@/views/CoursesView.vue"),
        },
        {
            name: "course-students",
            path: "/course-students/:id",
            component: () => import("@/views/CoursesStudentsView.vue"),
        }
    ]
})

export default router;


