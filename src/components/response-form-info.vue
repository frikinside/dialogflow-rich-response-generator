<template>
    <fieldset>
        <label for="info_title">{{ content.title }}</label>
        <input id="info_title" type="text" :placeholder="content.title" v-model="response.title">

        <label for="info_subtitle">{{ content.subtitle }}</label>
        <input id="info_subtitle" type="text" :placeholder="content.subtitle" v-model="response.subtitle">

        <label for="info_image">{{ content.image_url }}</label>
        <input id="info_image" type="text" :class="{ error: !$utils.validUrl(response.image.src.rawUrl) }" :placeholder="content.image_placeholder" v-model="response.image.src.rawUrl">

        <label for="info_action_link">{{ content.action_link }}</label>
        <input id="info_action_link" type="text" :class="{ error: !$utils.validUrl(response.actionLink) }" :placeholder="content.action_link_placeholder" v-model="response.actionLink">
    </fieldset>
</template>

<script>
export default {
  name: 'response-form-info',
  props: {
      response: {
          type: Object,
          required: true
      }
    },
    created() {
        this.response.image = {
            src: {}
        };
    },
    data() {
        return {
            content: {
                title: 'Card title',
                subtitle: 'Card subtitle',
                image_url: 'Public URL for image',
                image_placeholder: 'https://example.com/path/to/image.png',
                action_link: 'URL to follow when card is clicked',
                action_link_placeholder: 'https://example.com'
            }
        }
    },
    methods: {
        
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
