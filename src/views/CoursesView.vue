<template>
    <div class="p-10">
        <div class="w-full flex justify-between pb-5">
            <span class="font-bold text-2xl text-gray-500">Cursos</span>
            <ModalCreateCourses @create-item="onCreateItem" />
        </div>
        <div class="w-full">
            <div class="lg:w-[30%] pb-4 w-full">
                <v-text-field variant="underlined" color="blue" v-model="search" append-icon="mdi-magnify"
                    label="Buscar" hide-details density="compact"></v-text-field>
            </div>
        </div>
        <TableCourses :desserts="dataCourses" :search="search" @edit-item="onEditItem"
            @admin-students="onAdminStudents" />
    </div>

    <ModalEditCourse :itemEdit="itemEdit" :openModal="dialogEdit" @cancel-item="dialogEdit = false"
        @edit-item="onUpdateItem" />

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
import ModalEditCourse from '@/components/courses/ModalEditCourse.vue';
import ModalCreateCourses from '@/components/courses/ModalCreateCourses.vue';
import { basicAlert } from '@/helpers/SweetAlert';
import TableCourses from '@/components/courses/TableCourses.vue';
import { findAllCoursesApi, createCourseApi, updateCourseApi } from '@/api/CoursesService';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

export default ({
    components: {
        ModalEditCourse,
        ModalCreateCourses,
        TableCourses
    },
    setup() {
        const itemEdit = ref({});
        const dialogEdit = ref(false);
        const dialogLoader = ref(false);
        const dataCourses = ref([]);
        const search = ref('');
        const router = useRouter();

        onMounted(async () => {
            dialogLoader.value = true;
            await reloadData();
            dialogLoader.value = false;
        })

        const reloadData = async () => {
            await findAllCoursesApi()
                .then(response => {
                    console.log(response.data)
                    dataCourses.value = response.data;
                })
                .catch(error => {
                    console.log(error)
                })
        }

        const onCreateItem = async (course) => {
            await createCourseApi(course)
                .then(() => {
                    basicAlert(() => {
                        reloadData()
                    }, 'success', 'Logrado', "Se ha creado el curso correctamente")
                })
                .catch(error => {
                    console.log(error)
                })
        }

        const onEditItem = (item) => {
            dialogEdit.value = true
            itemEdit.value = item
        }

        const onUpdateItem = async (data) => {
            dialogEdit.value = false
            if (data.nombre != "" && data.descripcion != "") {
                await updateCourseApi(itemEdit.value.item.id, data)
                    .then(() => {
                        basicAlert(() => {
                            reloadData()
                        }, 'success', 'Logrado', "Se ha editado correctamente")
                    })
                    .catch(error => {
                        basicAlert(() => { }, 'error', 'Error', error.response.data.message)
                    })
            } else {
                basicAlert(() => { }, 'warning', 'Error', "Los campos no deben estar vacios")
            }
        }

        const onAdminStudents = (item) => {
            const id = item.item.id;
            console.log(id)
            router.push({
                name: 'course-students',
                params: { id }
            });
        }

        return {
            onAdminStudents,
            onEditItem,
            itemEdit,
            dialogLoader,
            dialogEdit,
            dataCourses,
            onCreateItem,
            onUpdateItem,
            search
        }
    }
})
</script>