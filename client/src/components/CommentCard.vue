<template>
    <div class="row card text-start mb-2 mx-5" id="comment" style="width: 700px;">
      <div class="card-body">
        <div class="row">
          <h5 class="card-title fw-bold fw-bold text-dark col"> {{ comment.name }} </h5>
        </div>
        <h6 class="card-subtitle mb-2 text-muted" style="font-size:80%;"> {{ timeFormatter(comment.createdAt) }} </h6>
        <p class="card-text"> {{ comment.commentValue }} </p>
        <a href="#" class="card-link" data-bs-toggle="collapse" :data-bs-target="`#replyPanel${comment._id}`">Reply</a>
        <a href="#" class="card-link" data-bs-toggle="collapse" :data-bs-target="`#editCommentPanel${comment._id}`">Edit</a>
        <a @click.prevent="deleteComment(comment._id)" href="#" class="card-link">Delete</a>
        <hr>
        <!-- Space for reply panel -->
        <div class="row card text-start mx-5 my-3 collapse" :id="`replyPanel${comment._id}`" data-toggle="collapse">
          <form @submit.prevent="postReply(comment._id)" class="form-control">
            <div class="form-floating">
              <textarea class="form-control my-2" placeholder="Leave a comment here"
              v-model="replyValue" :id="`floatingTextarea${comment._id}`" style="height: 100px"></textarea>
              <label :for="`floatingTextarea${comment._id}`">Comment</label>
            </div>
            <button class="btn-primary mb-3"
            data-bs-toggle="collapse" :data-bs-target="`#replyPanel${comment._id}`">Send</button>
          </form>
        </div>
        <!-- Space for reply panel -->
        <!-- Space for edit comment panel -->
        <div class="row card text-start mx-5 my-3 collapse" :id="`editCommentPanel${comment._id}`" data-toggle="collapse">
          <form @submit.prevent="editComment(comment._id)" class="form-control">
            <div class="form-floating">
              <textarea class="form-control my-2" placeholder="Leave a comment here"
              v-model="commentValueEdited" :id="`floatingText${comment._id}`" style="height: 100px"></textarea>
              <label :for="`floatingText${comment._id}`">Edit comment</label>
            </div>
            <button class="btn-primary mb-3"
            data-bs-toggle="collapse" :data-bs-target="`#editCommentPanel${comment._id}`">Send</button>
          </form>
        </div>
        <!-- Space for edit comment panel -->
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
  data () {
    return {
      replyValue: '',
      commentValueEdited: ''
    }
  },
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
    postReply (id) {
      const payload = {
        replyValue: this.replyValue,
        commentId: id
      }
      this.$store.dispatch('createReply', payload)
      this.replyValue = ''
    },
    editComment (id) {
      const payload = {
        commentValue: this.commentValueEdited,
        id
      }
      this.$store.dispatch('editComment', payload)
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
