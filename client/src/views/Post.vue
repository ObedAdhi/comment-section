<template>
  <div class="container-fluid">
    <div class="row mt-5 mx-5 text-start" id="post">
      <p>Lorem ipsum.</p>
      <p>End of article.</p>
    </div>
    <button class="row btn-primary text-left mx-5 mt-3"
    data-bs-toggle="collapse" data-bs-target="#commentPanel">Comment</button>
    <hr>
    <!-- Space for comment -->
    <div class="row card text-start mx-5 my-3 collapse" id="commentPanel" data-toggle="collapse">
      <form @submit.prevent="postComment" class="form-control">
        <div class="form-floating">
          <textarea class="form-control my-2" placeholder="Leave a comment here"
          v-model="commentValue" id="floatingTextarea" style="height: 100px"></textarea>
          <label for="floatingTextarea">Comments</label>
        </div>
        <button class="btn-primary mb-3"
        data-bs-toggle="collapse" data-bs-target="#commentPanel">Send</button>
      </form>
    </div>
    <!-- Space for comment -->

    <CommentCard
      v-for="comment in allComments"
      :key="comment._id"
      :comment="comment"
    />

  </div>
</template>

<script>
import CommentCard from '@/components/CommentCard.vue'

export default {
  name: 'Post',
  data () {
    return {
      commentValue: ''
    }
  },
  components: {
    CommentCard
  },
  methods: {
    postComment () {
      const payload = {
        commentValue: this.commentValue
      }
      this.$store.dispatch('createComment', payload)
      this.commentValue = ''
    }
  },
  computed: {
    allComments () {
      return this.$store.state.allComments
    }
  },
  created () {
    this.$store.dispatch('getAllComments')
  }
}
</script>

<style>

</style>
