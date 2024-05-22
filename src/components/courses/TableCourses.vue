<template>
    <v-data-table :headers="headers" :items="desserts" :search="search" class="elevation-1 text-sm">
        <template v-slot:[`item.inicio`]="{ item }">
            <div class="flex justify-center">
                <span v-if="typeof item.inicio === 'string' && item.inicio.includes('-')"
                    class="text-sm text-gray-500">{{ item.inicio }}</span>
                <span v-else-if="item.inicio === null">

                </span>
                <span v-else>
                    {{ new Date(item.inicio * 1000).toLocaleDateString('es-ES') }}
                </span>
            </div>
        </template>
        <template v-slot:[`item.fin`]="{ item }">
            <div class="flex justify-center">
                <span v-if="typeof item.inicio === 'string' && item.fin.includes('-')" class="text-sm text-gray-500">{{
                    item.fin }}</span>
                <span v-else-if="item.fin === null">

                </span>
                <span v-else>
                    {{ new Date(item.fin * 1000).toLocaleDateString('es-ES') }}
                </span>
            </div>
        </template>
        <template v-slot:[`item.alumnos`]="{ item }">
            <div class="flex justify-center">
                <span @click="goToAdminStudents(item)">
                    <v-btn icon="mdi-account-multiple" size="small" color="indigo" variant="text"></v-btn>
                </span>
            </div>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
            <div class="flex justify-center">
                <span @click="editItem(item)">
                    <v-btn icon="mdi-pencil" size="small" variant="text" color="green"></v-btn>
                </span>
            </div>
        </template>
    </v-data-table>
</template>
<script>
import { VDataTable } from 'vuetify/labs/VDataTable';

export default ({
    props: {
        desserts: Array,
        search: String
    },
    components: {
        VDataTable,
    },
    emits: ['edit-item', 'admin-students'],
    data() {
        return {
            headers: [
                {
                    title: '#',
                    align: 'start',
                    key: 'id',
                },
                { title: 'Nombre', align: 'start', key: 'nombre' },
                { title: 'Cant. Alumnos', align: 'start', key: 'cantidadAlumnos' },
                { title: 'Inicio', align: 'start', key: 'inicio' },
                { title: 'Fin', key: 'fin' },
                { title: 'Precio', key: 'precio' },
                { title: 'Alumnos', key: 'alumnos', align: 'center' },
                { title: 'Acciones', align: 'center', key: 'actions' },
            ]
        }
    },
    setup(_, { emit }) {

        const editItem = (item) => {
            emit('edit-item', { item })
        }

        const goToAdminStudents = (item) => {
            console.log(item)
            console.log("--------------------------6");
            emit('admin-students', { item })
        }

        return {
            goToAdminStudents,
            editItem,
        }
    }
})
</script>