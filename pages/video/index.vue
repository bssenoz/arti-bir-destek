<template>
  <div>
    <v-container>
      <v-row>
        <v-col
          v-for="(video, index) in videoLinks"
          :key="index"
          cols="12"
          sm="6"
          md="4"
        >
          <v-card class="mx-auto" max-width="400">
            <v-img
              :src="getVideoThumbnail(video)"
              height="200"
              contain
            ></v-img>
            <v-card-title>{{ getVideoTitle(video) }}</v-card-title>
            <v-card-actions>
              <v-btn color="primary" text @click="playVideo(video)">Play</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      videoLinks: [
        'https://www.youtube.com/watch?v=P4BmSvAry-c',
        'https://www.youtube.com/watch?v=VeONuNbP-Es',
        'https://www.youtube.com/watch?v=A2gb-qS3f-8'
        // Diğer video linkleri buraya ekleyin
      ]
    };
  },
  methods: {
    getVideoThumbnail(videoLink) {
      // Videonun küçük resmini almak için gereken işlemleri yapın
      // Örneğin, burada video hizmeti sağlayıcınıza (YouTube, Vimeo vb.) istek yapabilirsiniz
      return 'https://via.placeholder.com/400x200'; // Örnek yer tutucu görüntü
    },
    getVideoTitle(videoLink) {
      // Videonun başlığını almak için gereken işlemleri yapın
      // Örneğin, burada video hizmeti sağlayıcınıza (YouTube, Vimeo vb.) istek yapabilirsiniz
      return 'Video Başlığı';
    },
    playVideo(videoLink) {
      // Videoyu oynatmak için gereken işlemleri yapın
      // Örneğin, bir modala videoyu göstermek gibi
      console.log('Video oynat:', videoLink);
    }
  }
};
</script>

<style scoped>
/* Gerekirse stil belirleyin */
</style>
