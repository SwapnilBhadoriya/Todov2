<template>

    <div class="card">

        <p class="list-item m-2"><strong>{{ todo.task }}</strong></p>
        <!-- <input /> -->

        <div class="utils">
            <div class="d-flex flex-row justify-content-between align-items-center " v-if="showEdit">
                <input type="text" class="form-control m-0" v-model="updatedTodo">

                <button @click="$emit('updateTodo',updates)" class="btn btn-primary m-1"><i class="bi bi-check-circle"></i></button>
                <button class="btn btn-dark" style="margin:0;" @click="showEdit = !showEdit"><i
                        class="bi bi-x-circle-fill"></i></button>


            </div>

            <button v-if="!showEdit" @click="showEdit = !showEdit" class="btn btn-secondary m-1"><i
                    class="bi bi-pencil-square"></i></button>
            <button v-if="!showEdit" @click="$emit('deleteTodo', todo.task_id)" class="btn btn-danger m-0"><i
                    class="bi bi-trash"></i></button>
        </div>
    </div>

</template>

<script>
export default {
    props: ['todo','val'],
    data: function () {
        return {
            updatedTodo: '',
            showEdit: false
        }
    },
    computed: {
        updates: function () {
            return { task: this.updatedTodo, task_id: this.todo.task_id }
        }
    }
}
</script>
<style scoped>
.card {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    margin: 5px;
    width: 60%;
    height: fit-content;
    color: white;
    background-color: black;
    border-radius: 1rem;
    border: #212121 0.2rem solid;
    transition: all 0.4s ease-in;
    box-shadow: 0.4rem 0.4rem 0.6rem #00000040;
}

.card:hover {
    /* transform: translateY(-1.5rem); */
    border: #f2295bf0 0.2em solid;
    border-radius: 2.5rem 0 2.5rem 0;
}
</style>