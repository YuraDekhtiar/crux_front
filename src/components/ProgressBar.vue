<template>
  <div class="progress">
    <div class="progress-bar bg-success"
         role="progressbar"
         :style="{width: data.good * 100 + '%'}"
         aria-valuenow="100"
         aria-valuemin="0"
         aria-valuemax="100"
         :title="Math.round(data.good * 100)+' %'"

    />
    <div class="progress-bar bg-warning"
         role="progressbar"
         :style="{width: data.needs_improvement * 100 + '%'}"
         aria-valuenow="100"
         aria-valuemin="0"
         aria-valuemax="100"
         :title="Math.round(data.needs_improvement * 100)+' %'"

    />
    <div class="progress-bar bg-danger"
         role="progressbar"
         :style="{width: data.poor * 100 + '%'}"
         aria-valuenow="100"
         aria-valuemin="0"
         aria-valuemax="100"
         :title="Math.round(data.poor * 100)+' %'"

    />
  </div>
</template>

<script>
export default {
  name: 'ProgressBar',
  props:{
    data:{
      type: Object,
    },
  },
}
</script>

