<template>
	<fieldset>
		<label :for="`accordion_title_${id}`">{{ $t('title') }}</label>
		<input :id="`accordion_title_${id}`" type="text" :placeholder="$t('title')" v-model="response.title" />

		<label :for="`accordion_subtitle_${id}`">{{ $t('subtitle') }}</label>
		<input :id="`accordion_subtitle_${id}`" type="text" :placeholder="$t('subtitle')" v-model="response.subtitle" />

		<label :for="`accordion_image_${id}`">{{ $t('image_url') }}</label>
		<input :id="`accordion_image_${id}`" type="text" :class="{ error: !$utils.validUrl(response.image.src.rawUrl) }" :placeholder="$t('image_placeholder')" v-model="response.image.src.rawUrl" />

		<label :for="`accordion_text_${id}`">{{ $t('title') }}</label>
		<textarea :id="`accordion_text_${id}`" :placeholder="$t('text')" v-model="response.text" v-autosize></textarea>
	</fieldset>
</template>

<i18n>
{ 
	"en": {
		"title": "Accordion title",
		"subtitle": "Accordion subtitle",
		"image_url": "Public URL for image",
		"image_placeholder": "https://example.com/path/to/image.png",
		"text": "Accordion text"
	},
	"es": {
		"title": "Título del acordeón",
		"subtitle": "Subtítulo del acordeón",
		"image_url": "Url pública de la imagen",
		"image_placeholder": "https://ejemplo.com/ruta/a/la/imagen.png",
		"text": "Texto del acordeón"
	}
}
</i18n>

<script>
export default {
	name: 'response-form-accordion',
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
