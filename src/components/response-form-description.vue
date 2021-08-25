<template>
	<fieldset>
		<label for="description_title">{{ content.title }}</label>
		<input id="description_title" type="text" :placeholder="content.title" v-model="response.title" />

		<label for="description_lines">{{ content.lines }}</label>
		<div class="input-group" v-for="(line, index) in response.text" :key="index">
			<span class="input-group-addon">{{ index + 1 }}</span>
			<input
				:data-index="index"
				@keyup.enter="addTextLine(index)"
				@keydown.delete="!this.response.text[index] && removeTextLine(index)"
				:id="'description_lines_' + index"
				type="text"
				:placeholder="content.lines_placeholder + (index + 1)"
				v-model="response.text[index]"
			/>
			<span class="icon-button delete input-group-addon" @click="removeTextLine(index)" :title="content.delete"><i class="fa fa-window-close" aria-hidden="true"></i></span>
		</div>
		<button type="button" class="button" @click="addTextLine()"><i class="fa fa-plus" aria-hidden="true"></i></button>
	</fieldset>
</template>

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
		this.response.text = [];
	},
	data() {
		return {
			content: {
				title: 'Card title',
				lines: 'Text lines',
				lines_placeholder: 'Text line ',
				delete: 'delete',
			},
		};
	},
	methods: {
		addTextLine(index) {
			if (index === undefined) {
				this.response.text.push('');
			} else if (this.response.text[index]) {
				this.response.text.splice(index + 1, 0, '');
				setTimeout(function() {
					document.querySelector("input[data-index='" + (index + 1) + "']").focus();
				});
			}
		},
		removeTextLine(index) {
			var array = this.response.text;
			setTimeout(function() {
				array.splice(index, 1);
				setTimeout(function() {
					if (array.length) {
						document.querySelector("input[data-index='" + ((index == 0 ? index + 1 : index) - 1) + "']").focus();
					}
				});
			});
		},
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
