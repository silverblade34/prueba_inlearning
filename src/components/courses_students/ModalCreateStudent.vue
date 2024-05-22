<template>
    <v-btn size="small" class="text-none" color="blue" @click="dialog = true"><v-icon icon="mdi-plus"></v-icon>
        Nuevo</v-btn>
    <v-dialog v-model="dialog" width="500">
        <v-card>
            <v-toolbar>
                <span class="px-4 w-full text-center text-blue-400 font-bold title_views">CREAR ALUMNO</span>
            </v-toolbar>
            <v-card-text>
                <v-col cols="12">
                    <v-text-field variant="outlined" label="Nombre" prepend-inner-icon="mdi-text-box-plus" color="blue"
                        v-model="name"></v-text-field>

                    <v-text-field variant="outlined" label="Apellidos" prepend-inner-icon="mdi-text-box-plus"
                        color="blue" v-model="lastName"></v-text-field>

                    <v-text-field variant="outlined" v-model="email" class="mb-2" label="Email" color="blue"
                        :error-messages="emailError"></v-text-field>


                    <v-text-field variant="outlined" label="Codigo estudiante" prepend-inner-icon="mdi-qrcode"
                        color="blue" v-model="codeStudent"></v-text-field>
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
        const name = ref("");
        const lastName = ref("");
        const email = ref("");
        const codeStudent = ref("");
        const emailError = ref("");

        const createItem = () => {
            validateAndCreateItem();
            emit('create-item', {
                nombres: name.value,
                apellidos: lastName.value,
                correo: email.value,
                codigo: codeStudent.value,
            })
            dialog.value = false
        }

        const isValidEmail = (email) => {
            const domain = email.split('@')[1];
            return domain === 'gmail.com' || domain === 'outlook.com';
        };

        const validateAndCreateItem = () => {
            if (isValidEmail(email.value)) {
                emailError.value = "";
                emit('create-item', {
                    nombres: name.value,
                    apellidos: lastName.value,
                    correo: email.value,
                    codigo: codeStudent.value,
                });
                dialog.value = false;
            } else {
                emailError.value = "El correo debe ser de los dominios @gmail.com o @outlook.com.";
            }
        };

        return {
            dialog,
            name,
            lastName,
            email,
            codeStudent,
            emailError,
            validateAndCreateItem,
            createItem
        }
    }
}
</script>