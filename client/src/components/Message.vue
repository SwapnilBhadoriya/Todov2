<template>
    <div class="container-sm w-75 p-1 text-center" :class="success?'bg-success':'bg-danger'">{{ message }}</div>
</template>

<script>
export default{
    props:['message','success'],
}
</script>
