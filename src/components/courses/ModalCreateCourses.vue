<template>
    <v-btn size="small" class="text-none" color="blue" @click="dialog = true"><v-icon icon="mdi-plus"></v-icon>
        Nuevo</v-btn>
    <v-dialog v-model="dialog" width="500">
        <v-card>
            <v-toolbar>
                <span class="px-4 w-full text-center text-blue-400 font-bold title_views">CREAR CURSO</span>
            </v-toolbar>
            <v-card-text>
                <v-col cols="12">
                    <v-text-field variant="outlined" label="Nombre" prepend-inner-icon="mdi-text-box-plus" color="blue"
                        v-model="name"></v-text-field>
                    <v-textarea variant="outlined" label="Descripción" prepend-inner-icon="mdi-text-box-outline"
                        color="blue" v-model="description" rows="2"></v-textarea>

                    <v-select v-model="value" :items="items" label="Categorias" multiple variant="outlined"
                        color="blue">
                        <template v-slot:selection="{ item, index }">
                            <v-chip v-if="index < 2">
                                <span>{{ item.title }}</span>
                            </v-chip>
                            <span v-if="index === 2" class="text-grey text-caption align-self-center">
                                (+{{ value.length - 2 }} others)
                            </span>
                        </template>
                    </v-select>


                    <v-text-field type="number" variant="outlined" label="Capacidad de alumnos"
                        prepend-inner-icon="mdi-numeric" color="blue" v-model="studentCapacity"></v-text-field>
                    <div class="flex gap-1 justify-between mb-5">
                        <v-text-field label="Fecha inicio" type="date" hide-details density="compact"
                            v-model="dateStart" variant="outlined" color="blue"></v-text-field>
                        <v-text-field label="Fecha fin" type="date" hide-details density="compact" v-model="dateEnd"
                            variant="outlined" color="blue"></v-text-field>
                    </div>
                    <v-text-field type="number" variant="outlined" label="Precio" prepend-inner-icon="mdi-cash"
                        color="blue" v-model="price"></v-text-field>
                </v-col>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-grey-lighten-2" variant="tonal" @click="dialog = false">
                    Cancelar
                </v-btn>
                <v-btn color="blue-lighten-1" variant="tonal" @click="createItem">
                    Aceptar
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
import { ref } from 'vue';

export default {
    emits: ['create-item'],
    setup(_, { emit }) {
        const dialog = ref(false);
        const items = ref(['Categoria 1', 'Categoria 2', 'Categoria 3', 'Categoria 4', 'Categoria 5', 'Categoria 6']);
        const value = ref([]);
        const name = ref("");
        const description = ref("");
        const studentCapacity = ref(0);
        const dateStart = ref("");
        const dateEnd = ref("");
        const price = ref(0);

        const createItem = () => {
            const startDateUnix = new Date(dateStart.value).getTime() / 1000;
            const endDateUnix = new Date(dateEnd.value).getTime() / 1000;
            emit('create-item', {
                nombre: name.value,
                categoria: value.value,
                descripcion: description.value,
                cantidadAlumnos: studentCapacity.value,
                inicio: startDateUnix,
                fin: endDateUnix,
                alumnos: [],
                precio: price.value,
            })
            dialog.value = false
        }

        return {
            dialog,
            items,
            value,
            name,
            description,
            dateEnd,
            dateStart,
            studentCapacity,
            price,
            createItem
        }
    }
}
</script>