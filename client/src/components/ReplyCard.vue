<template>
  <div class="row card text-start mx-4 mb-1" id="reply" style="width: 600px;">
    <div class="card-body">
      <h5 class="card-title fw-bold text-dark"> {{ reply.name }} </h5>
      <h6 class="card-subtitle mb-2 text-muted" style="font-size:80%;"> {{ timeFormatter(reply.createdAt) }} </h6>
      <p class="card-text"> {{ reply.replyValue }} </p>
      <a href="#" class="card-link" data-bs-toggle="collapse" :data-bs-target="`#editReplyPanel${reply._id}`">Edit</a>
      <a @click.prevent="deleteReply(reply._id)" href="#" class="card-link">Delete</a>
    </div>
    <!-- Space for edit reply panel -->
    <div class="row card text-start mx-5 my-3 collapse" :id="`editReplyPanel${reply._id}`" data-toggle="collapse">
      <form @submit.prevent="editReply(reply._id)" class="form-control">
        <div class="form-floating">
          <textarea class="form-control my-2" placeholder="Leave a reply here"
          v-model="replyValueEdited" :id="`floatingText${reply._id}`" style="height: 100px"></textarea>
          <label :for="`floatingText${reply._id}`">Edit reply</label>
        </div>
        <button class="btn-primary mb-3"
        data-bs-toggle="collapse" :data-bs-target="`#editReplyPanel${reply._id}`">Send</button>
      </form>
    </div>
    <!-- Space for edit reply panel -->
  </div>
</template>

<script>
export default {
  name: 'ReplyCard',
  data () {
    return {
      replyValue: '',
      replyValueEdited: ''
    }
  },
  props: ['reply'],
  methods: {
    timeFormatter (timeString) {
      const time = new Date(timeString)
      const monthsList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      const year = time.getFullYear()
      const monthIndex = time.getMonth()
      const day = time.getDate()
      let hours = time.getHours()
      let minute = time.getMinutes()
      if (hours < 10) {
        hours = `0${hours}`
      }
      if (minute < 10) {
        minute = `0${minute}`
      }
      const result = `${monthsList[monthIndex]} ${day}, ${year} at ${hours}:${minute}`
      return result
    },
    editReply (id) {
      const payload = {
        replyValue: this.replyValueEdited,
        id
      }
      this.$store.dispatch('editReply', payload)
    },
    deleteReply (id) {
      const payload = { id }
      this.$store.dispatch('deleteReply', payload)
    }
  }
}
</script>

<style>

</style>
