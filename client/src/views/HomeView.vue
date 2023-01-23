<template>
  <div class="container">
    <h1>Your task management made easy with Tasks.Do</h1>
    
    <h4 class="m-3 ">Organise your tasks with Tasks.Do easily and efficiently.</h4>
    <RouterLink to="/register"><button class="addbtn">Get Started Here</button></RouterLink>

  </div>
</template>

<script>


</script>
<style scoped>
.container {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  padding: 15px;
  color: whitesmoke;
  width: 70vw;
  min-height: 60vh;
  background-color: #212121;
  /* box-shadow: 15px 15px 30px #191919,
        -15px -15px 30px #292929; */
  transition: border-radius cubic-bezier(0.075, 0.82, 0.165, 1) 1s,
    transform cubic-bezier(0.075, 0.82, 0.165, 1) 1s;
}

.container:hover {
  border: #f2295bf0 0.2em solid;
  border-radius: 2.5rem 0 2.5rem 0;
  
  transform: scale(1.05);
}


.addbtn {
    width: 6.5em;
    
    margin: 0.5em;
    background: black;
    color: white;
    border: none;
    border-radius: 0.625em;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
    position: relative;
    z-index: 1;
    overflow: hidden;
}

.addbtn:hover {
    color: black;
}

.addbtn:after {
    content: "";
    background: white;
    position: absolute;
    z-index: -1;
    left: -20%;
    right: -20%;
    top: 0;
    bottom: 0;
    transform: skewX(-45deg) scale(0, 1);
    transition: all 0.5s;
}

button:hover:after {
    transform: skewX(-45deg) scale(1, 1);
    -webkit-transition: all 0.5s;
    transition: all 0.5s;
}
</style>