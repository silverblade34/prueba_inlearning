<template>
    <v-data-table :headers="headers" :items="desserts" class="elevation-1 text-sm">
    </v-data-table>
</template>
<script>
import { VDataTable } from 'vuetify/labs/VDataTable';

export default ({
    props: {
        desserts: Array,
    },
    components: {
        VDataTable,
    },
    data() {
        return {
            headers: [
                {
                    title: '#',
                    align: 'start',
                    key: 'id',
                },
                { title: 'Nombres', align: 'start', key: 'nombres' },
                { title: 'Apellidos', align: 'start', key: 'apellidos' },
                { title: 'Correo', align: 'start', key: 'correo' },
                { title: 'Codigo', key: 'codigo' },
            ]
        }
    },
})
</script>