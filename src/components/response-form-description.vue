<template>
	<fieldset>
		<label :for="`description_title_${id}`">{{ $t('title') }}</label>
		<input :id="`description_title_${id}`" type="text" :placeholder="$t('title')" v-model="response.title" />

		<label :for="`description_lines_${id}`">{{ $t('lines') }}</label>
		<transition-group name="flip-list">
			<div class="input-group" v-for="(line, index) in response.text" :key="index">
				<span class="input-group-addon">{{ index + 1 }}</span>
				<input
					:data-index="index"
					@keyup.enter="addTextLine(index)"
					@keydown.delete="!this.response.text[index] && removeTextLine(index)"
					:id="`${id}_description_lines_${index}`"
					type="text"
					:placeholder="$t('lines_placeholder') + (index + 1)"
					v-model="response.text[index]"
				/>
				<span class="icon-button delete input-group-addon" @click="removeTextLine(index)" :title="$t('delete')"><i class="fa fa-window-close" aria-hidden="true"></i></span>
			</div>
		</transition-group>

		<button type="button" class="button" @click="addTextLine()"><i class="fa fa-plus" aria-hidden="true"></i></button>
	</fieldset>
</template>

<i18n>
{ 
	"en": {
		"title": "Card title",
		"lines": "Text lines",
		"lines_placeholder": "Text line ",
		"delete": "delete"
	},
	"es": {
		"title": "Título de la tarjeta",
		"lines": "Líneas de texto",
		"lines_placeholder": "Línea de texto ",
		"delete": "borrar"
	}
}
</i18n>

<script>
export default {
	name: 'response-form-description',
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
		this.response.text = this.response.text ?? [];
	},
	methods: {
		addTextLine(index) {
			var id = this.id;
			var position = index ?? this.response.text.length - 1;
			if (index === undefined) {
				this.response.text.push('');
			} else if (this.response.text[position]) {
				this.response.text.splice(position + 1, 0, '');
			}
			setTimeout(function() {
				document.getElementById(`${id}_description_lines_${position + 1}`).focus();
			});
		},
		removeTextLine(index) {
			var array = this.response.text;
			var id = this.id;
			setTimeout(function() {
				array.splice(index, 1);
				setTimeout(function() {
					if (array.length) {
						document.getElementById(`${id}_description_lines_${(index == 0 ? index + 1 : index) - 1}`).focus();
					}
				});
			});
		},
	},
};
</script>
