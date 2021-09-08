<template>
	<df-messenger
		intent="WELCOME"
		:chat-title="current_content.dialogflow_messenger.chat_title"
		wait-open="true"
		agent-id="f2edf0e3-bb82-4227-906e-672c07f8a5a5"
		:language-code="current_language"
	></df-messenger>
	<header>
		<section class="container">
			<section class="title">
				<h1 class="icon-title">{{ current_content.brand_name }}</h1>
				<div v-html="current_content.introduction"></div>
				<h3>//TODO</h3>
				<ul>
					<li>Focus first input when added a new response type</li>
					<li>i18N EN & ES only</li>
					<li>Dark theme</li>
					<li>Add an option for saving your current work</li>
					<li>Show preview in dialogflow, calling the API on demand</li>
					<li>Add a "Report a bug" option</li>
					<li>Work on better introductory text</li>
					<li>Remove 'TODO' from home page</li>
				</ul>
			</section>
		</section>
	</header>

	<main>
		<section class="container">
			<section>
				<p class="text-center" v-if="panels.length == 0" v-html="current_content.responses_empty_message"></p>
				<draggable
					v-model="panels"
					tag="transition-group"
					:component-data="{ name: 'flip-list' }"
					ghost-class="panel-ghost"
					drag-class="panel-drag"
					animation="200"
					handle=".move-handle"
					item-key="id"
				>
					<template #item="{element:panel,index}">
						<div :id="`panel_${panel.id}`" class="panel">
							<div class="panel-title">
								<div class="float-left">
									<span class="icon-button" @click="panel.collapsed = !panel.collapsed" :title="panel.collapse ? current_content.expand : current_content.collapse"
										><i class="fa" :class="{ 'fa-plus': panel.collapsed, 'fa-minus': !panel.collapsed }" aria-hidden="true"></i
									></span>
								</div>
								{{ findType(panel.response.type).text }}
								<a class="icon-button" :href="findType(panel.response.type).link" target="_blank" :title="content.help_link_alt_text"><i class="fa fa-question-circle" aria-hidden="true"></i></a>
								<div class="float-right">
									<span class="icon-button move-handle" :title="current_content.move" v-show="panels.length > 1"><i class="fa fa-arrows" aria-hidden="true"></i></span>
									<span class="icon-button" @click="cloneItem(index)" :title="current_content.clone"><i class="fa fa-clone" aria-hidden="true"></i></span>
									<span class="icon-button" @click="deleteItem(index)" :title="current_content.delete"><i class="fa fa-window-close" aria-hidden="true"></i></span>
								</div>
							</div>
							<collapse-transition>
								<div v-show="!panel.collapsed" class="panel-body">
									<response-form :response="panel.response" :id="panel.id"></response-form>
								</div>
							</collapse-transition>
						</div>
					</template>
				</draggable>

				<div class="clearfix">
					<div class="float-right">
						<dropdown-button :items="current_content.types" :button-text="current_content.add_button" :item-display-prop="'text'" :item-icon-prop="'icon'" @select-item="selectItem"></dropdown-button>
					</div>
				</div>
			</section>

			<section>
				<pre
					id="response_json"
				><span id="copy_button" class="float-right"><code class="highlight" v-show="json_payload_copied">{{current_content.json_payload_copied}}</code> <span class="icon-button" @click="copyJSON()" :title="current_content.copy"><i class="fa fa-clipboard" aria-hidden="true"></i></span></span><code>{{ payloadJSON }}</code></pre>
			</section>
		</section>
	</main>

	<footer>
		<section class="container">
			<p>{{ current_content.brand_name }} | © 2021</p>
			<p class="social-links">
				<a href="https://github.com/frikinside" target="_blank" alt="GitHub"><i class="fa fa-github" aria-hidden="true"></i></a>
				<a href="https://twitter.com/friki_inside" target="_blank" alt="twitter"><i class="fa fa-twitter" aria-hidden="true"></i></a>
				<a :href="contact_email_href" :alt="current_content.contact_email_alt"><i class="fa fa-envelope" aria-hidden="true"></i></a>
			</p>
		</section>
	</footer>
</template>

<script>
import draggable from 'vuedraggable';
import DropdownButton from './components/dropdown-button.vue';
import CollapseTransition from './components/collapse-transition.vue';
import ResponseForm from './components/response-form.vue';

export default {
	name: 'App',
	components: {
		draggable,
		DropdownButton,
		CollapseTransition,
		ResponseForm,
	},
	data() {
		return {
			current_language: 'en',
			languages: [
				{ name: 'English', lang: 'en' },
				{ name: 'Español', lang: 'es' },
			],
			content: {
				brand_name: 'Dialogflow Messenger Rich Response Generator',
				introduction:
					'<p>With this tool you can generate the custom payload on your intents with a <a href="https://cloud.google.com/dialogflow/es/docs/integrations/dialogflow-messenger#rich" target="_blank">rich response message</a> more visually atractive and engaging than a simple plain text message. In order to set a rich response message as your intent response, Dialogflow asks for a custom payload, a JSON formated object that comply with the specification on <a href="https://cloud.google.com/dialogflow/es/docs/integrations/dialogflow-messenger#rich" target="_blank">Dialogflow Docs</a>.</p><p>This tool let you build that custom payload the easy way, adding and filling the options for the different types of responses and the make a simple copy&paste of the resulting JSON.</p><p>The tool is still a work in progress, if you find a bug, something is not working properly or even if you have any suggestion, please, <a href="https://github.com/frikinside/dialogflow-rich-response-generator/issues/new" target="_blank">fill me an issue</a> about it.</p>',
				dialogflow_messenger: {
					chat_title: 'Preview',
				},
				responses_empty_message: "You don't have any response yet. Use the <code>Add</code> button to add a response type to your custom payload.",
				add_button: 'Add',
				help_link_alt_text: 'Go to dialogflow messenger documentation',
				types: [
					{
						name: 'info',
						text: 'Info',
						icon: 'info-circle',
						link: 'https://cloud.google.com/dialogflow/es/docs/integrations/dialogflow-messenger#info_response_type',
					},
					{
						name: 'description',
						text: 'Description',
						icon: 'align-left',
						link: 'https://cloud.google.com/dialogflow/es/docs/integrations/dialogflow-messenger#description_response_type',
					},
					{
						name: 'image',
						text: 'Image',
						icon: 'image',
						link: 'https://cloud.google.com/dialogflow/es/docs/integrations/dialogflow-messenger#image_response_type',
					},
					{
						name: 'button',
						text: 'Button',
						icon: 'mouse-pointer',
						link: 'https://cloud.google.com/dialogflow/es/docs/integrations/dialogflow-messenger#button_response_type',
					},
					{
						name: 'list',
						text: 'List',
						icon: 'list',
						link: 'https://cloud.google.com/dialogflow/es/docs/integrations/dialogflow-messenger#list_response_type',
					},
					{
						name: 'accordion',
						text: 'Accordion',
						icon: 'list-alt',
						link: 'https://cloud.google.com/dialogflow/es/docs/integrations/dialogflow-messenger#accordion_response_type',
					},
					{
						name: 'chips',
						text: 'Suggestion chips',
						icon: 'th-large',
						link: 'https://cloud.google.com/dialogflow/es/docs/integrations/dialogflow-messenger#suggestion_chip_response_type',
					},
					{
						name: 'divider',
						text: 'Divider',
						icon: 'minus',
						link: 'https://cloud.google.com/dialogflow/es/docs/integrations/dialogflow-messenger#list_response_type',
					},
				],
				delete: 'delete',
				clone: 'clone',
				copy: 'copy',
				json_payload_copied: 'copied!',
				contact_email_subject: '¡Hello! I like your tool, prepare to read',
				contact_email_alt: 'Email me',
			},
			panels: [],
			json_payload_copied: false,
		};
	},
	computed: {
		current_content() {
			return this.content;
		},
		contact_email_href() {
			return 'mailto:friki.inside@gmail.com?subject=' + this.current_content.contact_email_subject;
		},
		payloadJSON() {
			//return JSON.stringify({ richContent: [this.panels.map((x) => x.response)] }, this.$utils.cleanJSON, 4);
			//return JSON.stringify({ richContent: [this.panels.map((x) => JSON.parse(JSON.stringify(x.response, this.$utils.cleanJSON)))] }, this.$utils.cleanJSON, 4);
			return JSON.stringify(
				{ richContent: [this.panels.map((x) => JSON.parse(JSON.stringify(JSON.parse(JSON.stringify(x.response, this.$utils.cleanJSON)), this.$utils.cleanJSON)))] },
				this.$utils.cleanJSON,
				4
			);
		},
	},
	methods: {
		findType(type_name) {
			return this.current_content.types.find((x) => {
				return x.name == type_name;
			});
		},
		selectItem(item) {
			var response = { type: item.name };
			this.panels.push({ response, collapsed: false, id: this.$utils.generateUniqueId() });
		},
		deleteItem(index) {
			this.panels.splice(index, 1);
		},
		cloneItem(index) {
			let panel = JSON.parse(JSON.stringify(this.panels[index]));
			panel.id = this.$utils.generateUniqueId();
			this.panels.splice(index + 1, 0, panel);
		},
		copyJSON() {
			this.json_payload_copied = true;

			var textarea_with_text_to_copy = document.createElement('textarea');
			textarea_with_text_to_copy.style.display = 'none';
			document.body.appendChild(textarea_with_text_to_copy);
			textarea_with_text_to_copy.value = this.payloadJSON;
			textarea_with_text_to_copy.style.display = 'block';
			textarea_with_text_to_copy.select();
			document.execCommand('copy');
			document.body.removeChild(textarea_with_text_to_copy);

			setTimeout(() => {
				this.json_payload_copied = false;
			}, 1000);
		},
	},
};
</script>

<style>
/* BASE PAGE STYLES */
body {
	background-color: #eeefff;
}

header {
	background-color: white;
	border-bottom: 1px solid #dadada;
}

header > .container {
	padding-bottom: 7.5rem;
	padding-top: 7.5rem;
}

main > .container {
	padding-bottom: 7.5rem;
	padding-top: 5rem;
}

main pre {
	border: 1px solid #dadada;
	border-left: 0.3rem solid #9b4dca;
}

main pre#response_json {
	overflow: hidden;
}

main pre#response_json > code {
	white-space: break-spaces;
}

footer {
	background-color: white;
	border-top: 1px solid #dadada;
}

footer > .container {
	padding-bottom: 3rem;
	padding-top: 3rem;
}

footer p {
	margin-bottom: 0;
}

footer p.social-links a {
	margin-right: 1rem;
	font-size: 18px;
}

/* ICON TITLE */
.icon-title {
	background: url(~@/assets/dfmrmg-title.png) no-repeat left center;
	background-size: contain;
	padding-left: 75px;
}

/* PANEL */
.panel {
	background-color: white;
	border: 1px solid #dadada;
	margin-bottom: 1.5rem;
	border-radius: 0.4rem;
}

.panel .panel-title {
	background-color: #9b4dca;
	border: 0.1rem solid #9b4dca;
	border-radius: 0.4rem 0.4rem 0 0;
	color: white;
	font-size: 1.1rem;
	font-weight: 700;
	min-height: 3.8rem;
	letter-spacing: 0.1rem;
	line-height: 3.8rem;
	padding: 0 3rem;
	text-align: center;
	text-decoration: none;
	text-transform: uppercase;
	white-space: nowrap;
}

.panel .panel-body {
	padding: 2rem 3rem;
}

.panel .panel-body form:last-child,
.panel .panel-body fieldset:last-child {
	margin-bottom: 0;
}

/* DRAGGABLE */
.panel-ghost {
	opacity: 0.5;
}

.panel-drag {
	background: transparent !important;
}

.icon-button {
	font-size: 16px;
	cursor: pointer;
}

.icon-button.move-handle {
	cursor: move;
}

.icon-button:hover {
	opacity: 0.8;
}

a.icon-button {
	color: inherit;
}

.icon-button + .icon-button {
	margin-left: 10px;
}

.icon-button.delete {
	color: #d01e2e;
	border-color: #ff8e99;
}

.input-group .icon-button.delete {
	background-color: #ffbbc2;
}

#copy_button {
	margin: 0.5em;
}

code.highlight {
	background-color: #606c76;
	color: white;
}

/* UTILITIES */
.text-center {
	text-align: center;
}

.strike {
	text-decoration: line-through;
}

[disabled] {
	cursor: not-allowed;
}

/* COMPONENT DROPDOWN */
.dropdown-wrapper {
	position: relative;
	margin-bottom: 1.5rem;
	display: inline-block;
}
.dropdown {
	width: 100%;
	margin-bottom: 0;
	padding-right: 4em;
}

.dropdown:after {
	border: 2px solid transparent;
	border-color: white;
	right: 1.2rem;
	border-right: 0;
	border-top: 0;
	content: '';
	display: block;
	height: 1rem;
	margin-top: -0.7rem;
	pointer-events: none;
	position: absolute;
	top: 50%;
	transform: rotate(-45deg);
	transform-origin: center;
	width: 1rem;
}

.float-right .dropdown-menu {
	right: 0;
}

.dropdown-menu {
	width: max-content;
	box-shadow: 0 0 2px rgba(0, 0, 0, 0.2), 0 3px 4px rgba(0, 0, 0, 0.15);
	min-width: 100%;
	margin-left: auto;
	margin-right: auto;
	border: 1px solid;
	padding-top: 1rem;
	padding-bottom: 1rem;
	position: absolute;
	background-color: white;
	top: 100%;
	z-index: 1;
	border-color: #a7a7a7;
	border-radius: 0.4rem;
	overflow-x: hidden;
	border-radius: 0.5rem;
}

.dropdown-menu > ul {
	list-style-type: none;
	max-height: 50vh;
	overflow-y: auto;
	margin-top: 0;
	margin-bottom: 0;
}

.dropdown-menu > ul > li {
	padding-right: 2rem;
	padding-left: 0.5rem;
	padding-bottom: 0.5rem;
	padding-top: 0.5rem;
	margin: 0;
	cursor: pointer;
	white-space: nowrap;
	text-overflow: ellipsis;
	text-align: left;
}

.dropdown-menu > ul > li:hover {
	background-color: #9b4dca;
	color: white;
}

/* INPUT GROUP ADDON */
.input-group > * {
	flex: 0 0 1;
	padding: 0;
}

.input-group {
	display: flex;
}

.input-group-addon {
	background-color: #e1e1e1;
	border: 0.1rem solid #d1d1d1;
	border-radius: 0.4rem;
	color: #606c76;
	display: inline-block;
	font-size: 1.1rem;
	font-weight: 700;
	height: 3.8rem;
	letter-spacing: 0.1rem;
	line-height: 3.8rem;
	padding: 0 1rem;
	text-align: center;
	text-decoration: none;
	text-transform: uppercase;
	white-space: nowrap;
}

.input-group-addon.primary {
	background-color: #9b4dca;
	border: 0.1rem solid #9b4dca;
}

.input-group > .input-group-addon:nth-child(1) {
	border-top-right-radius: 0;
	border-bottom-right-radius: 0;
	border-right: 0;
}

.input-group > .input-group-addon:not(:nth-child(1)) {
	border-top-left-radius: 0;
	border-bottom-left-radius: 0;
	border-left: 0;
}

.input-group > input:not(:nth-last-child(1)) {
	border-top-right-radius: 0;
	border-bottom-right-radius: 0;
}

.input-group > input:not(:nth-child(1)) {
	border-top-left-radius: 0;
	border-bottom-left-radius: 0;
}

/* SUBFORM - FIELDSET */
fieldset > fieldset {
	border: 0.1rem solid #d1d1d1;
	border-radius: 0.4rem;
	padding: 20px;
	background: rgb(209 209 209 / 10%);
	font-size: 0.9em;
}

fieldset > fieldset label {
	font-size: 1.5rem;
}

.chips-option-delete-icon {
	margin-top: -10px;
}

/* FORMS VALIDATION */
input.error,
input:focus.error,
textarea.error,
textarea:focus.error,
select.error,
select:focus.error {
	color: #d01e2e;
	border-color: #d01e2e;
}

/* TRANSITIONS */
.flip-list-move {
	transition: transform 0.4s ease;
}

.flip-list-enter-active,
.flip-list-leave-active {
	transition: all 0.4s ease;
}
.flip-list-enter-from,
.flip-list-leave-to {
	opacity: 0;
	transform: translateY(-30px);
}

/* CUSTOM TYPEAHEAD */
.input-group > .simple-typeahead > input {
	border-top-left-radius: 0;
	border-bottom-left-radius: 0;
}
fieldset .simple-typeahead {
	margin-bottom: 1.5rem;
}
</style>
