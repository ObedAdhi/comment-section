<template>
  <div class="container-fluid">
    <div class="row mt-5 mx-5" id="post">
      Lorem ipsum.

      End of article.
    </div>
    <button class="row btn-primary text-left mx-5 mt-3">Comment</button>
    <hr>
    <div class="row card text-start mx-5 my-3" id="commentPanel">
      <div class="form-group">
        <div class="form-floating">
          <textarea class="form-control my-2" placeholder="Leave a comment here"
          id="floatingTextarea" style="height: 100px"></textarea>
          <label for="floatingTextarea">Comments</label>
        </div>

        <button class="btn-primary mb-3" >Send</button>
      </div>
    </div>

    <div class="row card text-start mb-2 mx-5" id="comment" style="width: 700px;"
    v-for="comment in allComments"
    :key="comment._id"
    :comment="comment">
      <div class="card-body">
        <h5 class="card-title"> {{ comment.name }} </h5>
        <h6 class="card-subtitle mb-2 text-muted"> {{ timeFormatter(comment.createdAt) }} </h6>
        <p class="card-text"> {{ comment.commentValue }} </p>
        <a href="#" class="card-link">Reply</a>
        <a href="#" class="card-link">Edit</a>
        <hr>
        <div class="row card text-start mx-3 mb-1" id="reply" style="width: 600px;"
        v-for="reply in comment.replies"
        :key="reply._id"
        :reply="reply">
          <div class="card-body">
            <h5 class="card-title"> {{ reply.name }} </h5>
            <h6 class="card-subtitle mb-2 text-muted"> {{ timeFormatter(reply.createdAt) }} </h6>
            <p class="card-text"> {{ reply.replyValue }} </p>
            <a href="#" class="card-link">Edit</a>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Post',
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
