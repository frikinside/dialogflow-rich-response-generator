<template>
	<fieldset>
		<label :for="`info_title_${id}`">{{ $t('title') }}</label>
		<input :id="`info_title_${id}`" type="text" :placeholder="$t('title')" v-model="response.title" />

		<label :for="`info_subtitle_${id}`">{{ $t('subtitle') }}</label>
		<input :id="`info_subtitle_${id}`" type="text" :placeholder="$t('subtitle')" v-model="response.subtitle" />

		<label :for="`info_image_${id}`">{{ $t('image_url') }}</label>
		<input :id="`info_image_${id}`" type="text" :class="{ error: !$utils.validUrl(response.image.src.rawUrl) }" :placeholder="$t('image_placeholder')" v-model="response.image.src.rawUrl" />

		<label :for="`info_action_link_${id}`">{{ $t('action_link') }}</label>
		<input :id="`info_action_link_${id}`" type="text" :class="{ error: !$utils.validUrl(response.actionLink) }" :placeholder="$t('action_link_placeholder')" v-model="response.actionLink" />
	</fieldset>
</template>

<i18n>
{ 
	"en": {
		"title": "Card title",
		"subtitle": "Card subtitle",
		"image_url": "Public URL for image",
		"image_placeholder": "https://example.com/path/to/image.png",
		"action_link": "URL to follow when card is clicked",
		"action_link_placeholder": "https://example.com"
	},
	"es": {
		"title": "Título de la tarjeta",
		"subtitle": "Subtítulo de la tarjeta",
		"image_url": "Url pública de la imagen",
		"image_placeholder": "https://ejemplo.com/ruta/a/la/imagen.png",
		"action_link": "URL que se lanza al pulsar la tarjeta",
		"action_link_placeholder": "https://ejemplo.com"
	}
}
</i18n>

<script>
export default {
	name: 'response-form-info',
	props: {
		response: {
			type: Object,
			required: true,
		},
		id: {
			type: String,
			required: true,
		},
	},
	created() {
		this.response.image = this.response.image ?? {
			src: {},
		};
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
