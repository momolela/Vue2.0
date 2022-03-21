<template>
  <div class="home">
    <canvas id="the-canvas"></canvas>
  </div>
</template>

<script>

const PDF = require('pdfjs-dist');
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';
PDF.GlobalWorkerOptions.workerSrc = pdfjsWorker;
export default {
  name: 'Home',
  components: {},
  data() {
    return {
     
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      var loadingTask = 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf'
      PDF.getDocument(loadingTask).then((pdf) => {
        pdf.getPage(1).then(function(page) {
          var viewport = page.getViewport(1.5);
          var canvas = document.getElementById('the-canvas');
          var context = canvas.getContext('2d');
          canvas.height = viewport.height;
          canvas.width = viewport.width;
          var renderContext = {
            canvasContext: context,
            viewport: viewport,
          };
          page.render(renderContext);
        });
      });
    },
  },
};
</script>