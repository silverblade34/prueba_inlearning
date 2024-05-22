<template>
    <v-dialog v-model="dialog" width="550" @click:outside="closeItem">
        <v-card>
            <v-toolbar>
                <span class="px-4 w-full text-center text-blue-400 font-bold title_views">EDITAR CURSO</span>
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
                <v-btn color="blue-grey-lighten-2" variant="tonal" @click="closeItem">
                    Cancelar
                </v-btn>
                <v-btn color="blue-lighten-1" variant="tonal" @click="editItem">
                    Aceptar
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
import { ref, watch } from 'vue';

export default {
    props: {
        itemEdit: Object,
        openModal: Boolean
    },
    emits: ['edit-item', 'cancel-item'],
    setup(props, { emit }) {
        const dialog = ref(false);
        const name = ref("");
        const items = ref(['Categoria 1', 'Categoria 2', 'Categoria 3', 'Categoria 4', 'Categoria 5', 'Categoria 6']);
        const value = ref([]);
        const description = ref("");
        const studentCapacity = ref(0);
        const dateStart = ref("");
        const dateEnd = ref("");
        const price = ref(0);



        watch(() => props.openModal, async (newVal) => {
            dialog.value = newVal
        })

        watch(() => props.itemEdit, (newVal) => {
            if (Object.keys(newVal).length !== 0) {
                name.value = newVal?.item?.nombre || '';
                if (newVal?.item?.categoria) {
                    if (typeof newVal?.item?.categoria === 'string') {
                        if (!value.value.includes(newVal?.item?.categoria)) {
                            value.value.push(newVal?.item?.categoria);
                        }
                    } else if (Array.isArray(newVal?.item?.categoria)) {
                        newVal?.item?.categoria.forEach(category => {
                            if (!value.value.includes(category)) {
                                value.value.push(category);
                            }
                        });
                    }
                }
                description.value = newVal?.item?.descripcion || '';
                studentCapacity.value = newVal?.item?.cantidadAlumnos || 0;
                dateStart.value = parseDate(newVal?.item?.inicio) || getTodayString();
                dateEnd.value = parseDate(newVal?.item?.fin) || getTodayString();
                price.value = newVal?.item?.precio || 0;
            }
        });


        const parseDate = (dateValue) => {
            if (dateValue === null) {
                return null;
            } else if (typeof dateValue === 'number') {
                return new Date(dateValue * 1000).toLocaleDateString('es-ES');
            } else if (typeof dateValue === 'string') {
                return dateValue;
            } else {
                console.warn('Invalid date format for', dateValue);
                return null;
            }
        };

        const getTodayString = () => {
            const today = new Date();
            return today.toLocaleDateString('es-ES');
        };


        const editItem = () => {
            const startDateUnix = new Date(dateStart.value).getTime() / 1000;
            const endDateUnix = new Date(dateEnd.value).getTime() / 1000;
            emit("edit-item", {
                nombre: name.value,
                categoria: value.value,
                descripcion: description.value,
                cantidadAlumnos: studentCapacity.value,
                inicio: startDateUnix,
                fin: endDateUnix,
                alumnos: props.itemEdit.alumnos,
                precio: price.value,
            })
            closeItem();
        }

        const closeItem = () => {
            emit('cancel-item')
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
            editItem,
            closeItem,
        }
    }
}
</script>