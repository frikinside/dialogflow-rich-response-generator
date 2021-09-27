<template>
	<fieldset>
		<label :for="`chips_options_${id}`">{{ $t('options') }}</label>
		<transition-group name="flip-list">
			<fieldset v-for="(option, index) in response.options" :key="index">
				<span class="chips-option-delete-icon icon-button delete float-right" @click="removeOption(index)" :title="$t('delete')"><i class="fa fa-window-close" aria-hidden="true"></i></span>

				<label :for="'chips_text_' + index">{{ $t('text') }}</label>
				<input :id="'chips_text_' + index" type="text" :placeholder="$t('text')" v-model="option.text" />

				<label :for="'chips_image_' + index">{{ $t('image_url') }}</label>
				<input :id="'chips_image_' + index" type="text" :class="{ error: !$utils.validUrl(option.image.src.rawUrl) }" :placeholder="$t('image_placeholder')" v-model="option.image.src.rawUrl" />

				<label :for="'chips_link_' + index">{{ $t('link') }}</label>
				<input :id="'chips_link_' + index" type="text" :class="{ error: !$utils.validUrl(option.link) }" :placeholder="$t('link_placeholder')" v-model="option.link" />
			</fieldset>
		</transition-group>
		<button type="button" class="button" @click="addOption()"><i class="fa fa-plus" aria-hidden="true"></i></button>
	</fieldset>
</template>

<i18n>
{ 
		"en": {
		"options": "Options",
		"text": "Option text",
		"image_url": "Option public URL for image",
		"image_placeholder": "https://example.com/path/to/image.png",
		"link": "URL to follow when option is clicked",
		"link_placeholder": "https://example.com",
		"delete": "delete"
	},
	"es": {
		"options": "Opciones",
		"text": "Texto de opción",
		"image_url": "Url pública de la imagen para la opción",
		"image_placeholder": "https://ejemplo.com/ruta/a/la/imagen.png",
		"link": "URL que se lanza al pulsar la opción",
		"link_placeholder": "https://ejemplo.com",
		"delete": "borrar"
	}
}
</i18n>

<script>
export default {
	name: 'response-form-chips',
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
		this.response.options = this.response.options ?? [];
	},
	methods: {
		addOption() {
			this.response.options.push({ image: { src: {} } });
		},
		removeOption(index) {
			this.response.options.splice(index, 1);
		},
	},
};
</script>
