<template>
    <div class="row card text-start mb-2 mx-5" id="comment" style="width: 700px;">
      <div class="card-body">
        <div class="row">
          <h5 class="card-title fw-bold fw-bold text-dark col"> {{ comment.name }} </h5>
          <button class="btn btn-dark col align-self-end">opt</button>
        </div>
        <h6 class="card-subtitle mb-2 text-muted" style="font-size:80%;"> {{ timeFormatter(comment.createdAt) }} </h6>
        <p class="card-text"> {{ comment.commentValue }} </p>
        <a href="#" class="card-link">Reply</a>
        <a href="#" class="card-link">Edit</a>
        <a @click.prevent="deleteComment(comment._id)" href="#" class="card-link">Delete</a>
        <hr>
        <ReplyCard
          v-for="reply in comment.replies"
          :key="reply._id"
          :reply="reply"
        />
      </div>
    </div>
</template>

<script>
import ReplyCard from '@/components/ReplyCard.vue'

export default {
  name: 'CommentCard',
  props: ['comment'],
  components: {
    ReplyCard
  },
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
    postComment () {
      const payload = {
        commentValue: this.commentValue
      }
      this.$store.dispatch('createComment', payload)
      this.commentValue = ''
    },
    deleteComment (id) {
      const payload = { id }
      this.$store.dispatch('deleteComment', payload)
    }
  }
}
</script>

<style>

</style>
