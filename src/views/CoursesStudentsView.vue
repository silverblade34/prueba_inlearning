<template>
    <div class="p-10">
        <div class="w-full flex justify-between pb-5">
            <span class="font-bold text-2xl text-gray-500">Alumnos del curso</span>
            <ModalCreateStudent @create-item="onCreateItem" />
        </div>
        <TableCoursesStudents :desserts="dataAlumnos" />
    </div>
    <v-dialog v-model="dialogLoader" :scrim="false" persistent width="auto">
        <v-card color="blue">
            <v-card-text>
                Procesando...
                <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>
<script>
import { ref, watch } from 'vue';
import TableCoursesStudents from '@/components/courses_students/TableCoursesStudents.vue';
import ModalCreateStudent from '@/components/courses_students/ModalCreateStudent.vue';
import { updateCourseApi, findOneCourseApi } from '@/api/CoursesService';
import { useRouter } from 'vue-router';
import { basicAlert } from '@/helpers/SweetAlert';

export default ({
    components: {
        ModalCreateStudent,
        TableCoursesStudents
    },
    setup() {
        const router = useRouter();
        const id = ref(null);
        const dataAlumnos = ref([]);
        const dataCourse = ref({});

        const loadData = async () => {
            await findOneCourseApi(id.value)
                .then(response => {
                    console.log(response)
                    console.log(response.data.alumnos)
                    dataCourse.value = response.data;
                    dataAlumnos.value = response.data.alumnos ? response.data.alumnos : [];
                })
        }

        watch(
            () => router.currentRoute.value.params,
            async (newParams) => {
                id.value = newParams.id;
                await loadData();
            },
            { immediate: true }
        );


        const onCreateItem = async (student) => {
            if (!Array.isArray(dataCourse.value.alumnos)) {
                dataCourse.value.alumnos = [];
            }

            dataCourse.value.alumnos.push(student);

            await updateCourseApi(id.value, { alumnos: dataCourse.value.alumnos })
                .then(() => {
                    basicAlert(async () => {
                        await loadData();
                    }, 'success', 'Logrado', "Se ha agregado el alumno correctamente");
                })
                .catch(error => {
                    console.log(error);
                });
        };


        return {
            dataAlumnos,
            onCreateItem
        }
    }
})
</script>