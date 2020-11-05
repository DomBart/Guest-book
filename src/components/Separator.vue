<template>
<div class="separator_wrap">
<h1 class="form_title"><slot></slot></h1>
<div class="form_separator"></div>
</div>
</template>

<script>
export default {
    
}
</script>

<style>
.separator_wrap{
    padding: 2rem 0rem;
}
.form_title{
  font-weight: 400;
  color: #828282;
  margin: 1rem 0 1rem 0;
}
.form_separator{
  border-bottom: 1px solid #828282;
  width: 100%;
  margin-bottom: 1rem;
}
</style>