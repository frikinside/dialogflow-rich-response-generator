/* eslint-disable vue/no-mutating-props */
<template>
  <form>
        <fieldset v-if="response.type == 'info'">
            <label for="info_title">{{ content.info.title }}</label>
            <input id="info_title" type="text" :placeholder="content.info.title" v-model="response.title">

            <label for="info_subtitle">{{ content.info.subtitle }}</label>
            <input id="info_subtitle" type="text" :placeholder="content.info.subtitle" v-model="response.subtitle">

            <label for="info_image">{{ content.info.image_url }}</label>
            <input id="info_image" type="text" :class="{ error: !validUrl(response.image.src.rawUrl) }" :placeholder="content.info.image_placeholder" v-model="response.image.src.rawUrl">

            <label for="info_action_link">{{ content.info.action_link }}</label>
            <input id="info_action_link" type="text" :class="{ error: !validUrl(response.actionLink) }" :placeholder="content.info.action_link_placeholder" v-model="response.actionLink">
        </fieldset>

        <fieldset v-if="response.type == 'description'">
            <label for="description_title">{{ content.description.title }}</label>
            <input id="description_title" type="text" :placeholder="content.description.title" v-model="response.title">

            <label for="description_lines">{{ content.description.lines }}</label>
            <div class="input-group" v-for="(line, index) in response.text" :key="index">
                <span class="input-group-addon">{{ index+1 }}</span>
                <input :data-index="index" @keyup.enter="addTextLine(index)" @keydown.delete="!this.response.text[index] && removeTextLine(index)" :id="'description_lines_'+index" type="text" :placeholder="content.description.lines_placeholder + (index+1)" v-model="response.text[index]">
                <span class="icon-button delete input-group-addon" @click="removeTextLine(index)" :title="content.description.delete"><i class="fa fa-window-close" aria-hidden="true"></i></span>
            </div>
            <button type="button" class="button" @click="addTextLine()"><i class="fa fa-plus" aria-hidden="true"></i></button>
        </fieldset>

        <fieldset v-if="response.type == 'image'">
            <label for="image_rawUrl">{{ content.image.rawUrl }}</label>
            <input id="image_rawUrl" type="text" :class="{ error: !validUrl(response.rawUrl) }" :placeholder="content.image.rawUrl_placeholder" v-model="response.rawUrl">

            <label for="image_accessibilityText">{{ content.image.accessibilityText }}</label>
            <input id="image_accessibilityText" type="text" :placeholder="content.image.accessibilityText" v-model="response.accessibilityText">
        </fieldset>

        <fieldset v-if="response.type == 'button'">
            <label for="button_icon" v-html="content.button.icon.type_label"></label>
            <input id="button_icon" type="text" :placeholder="content.button.icon.type_placeholder" v-model="response.icon.type">

            <label for="button_color">{{ content.button.icon.color }}</label>
            <input id="button_color" type="text" :placeholder="content.button.icon.color" v-model="response.icon.color">

            <label for="button_text">{{ content.button.text }}</label>
            <input id="button_text" type="text" :placeholder="content.button.text" v-model="response.text">

            <label for="button_link">{{ content.button.link }}</label>
            <input id="button_link" type="text" :class="{ error: !validUrl(response.link) }" :placeholder="content.button.link_placeholder" v-model="response.link">

            <label v-html="content.button.event.title"></label>
            <fieldset>
                <label for="button_event_name">{{ content.button.event.name }}</label>
                <input id="button_event_name" type="text" :placeholder="content.button.event.name" v-model="response.event.name">

                <label for="button_event_language">{{ content.button.event.language }}</label>
                <input id="button_event_language" type="text" :placeholder="content.button.event.language" v-model="response.event.languageCode">

                <label for="button_event_parameters">{{ content.button.event.parameters }}</label>
                <div class="row" v-for="(parameter, index) in response.event.parameters" :key="index">
                    <div class="column">
                        <div class="input-group">
                            <span class="input-group-addon">{{ index+1 }}</span>
                            <input :data-index="index" @keydown.delete="!event_parameters[index] && removeEventParameter(index)" :id="'button_event_parameter_'+index+'_key'" type="text" :placeholder="content.button.event.parameters_key" v-model="event_parameters[index]">
                        </div>
                    </div>
                    <div class="column">
                        <div class="input-group">
                            <input :data-index="index" :disabled="!event_parameters[index]" @keyup.enter="addEventParameter(index)" :id="'button_event_parameter_'+index+'_value'" type="text" :placeholder="content.button.event.parameters_value" v-model="parameter[eventParameterKey(index)]">
                            <span class="icon-button delete input-group-addon" @click="removeEventParameter(index)" :title="content.button.event.parameters_delete"><i class="fa fa-window-close" aria-hidden="true"></i></span>
                        </div>
                    </div>
                </div>
                <button type="button" class="button" @click="addEventParameter()"><i class="fa fa-plus" aria-hidden="true"></i></button>
            </fieldset>
        </fieldset>

        <fieldset v-if="response.type == 'list'">
            <label for="list_title">{{ content.list.title }}</label>
            <input id="list_title" type="text" :placeholder="content.list.title" v-model="response.title">

            <label for="list_subtitle">{{ content.list.subtitle }}</label>
            <input id="list_subtitle" type="text" :placeholder="content.list.subtitle" v-model="response.subtitle">

            <label v-html="content.list.event.title"></label>
            <fieldset>
                <label for="button_event_name">{{ content.list.event.name }}</label>
                <input id="button_event_name" type="text" :placeholder="content.list.event.name" v-model="response.event.name">

                <label for="button_event_language">{{ content.list.event.language }}</label>
                <input id="button_event_language" type="text" :placeholder="content.list.event.language" v-model="response.event.languageCode">

                <label for="list_event_parameters">{{ content.list.event.parameters }}</label>
                <div class="row" v-for="(parameter, index) in response.event.parameters" :key="index">
                    <div class="column">
                        <div class="input-group">
                            <span class="input-group-addon">{{ index+1 }}</span>
                            <input :data-index="index" @keydown.delete="!event_parameters[index] && removeEventParameter(index)" :id="'list_event_parameter_'+index+'_key'" type="text" :placeholder="content.list.event.parameters_key" v-model="event_parameters[index]">
                        </div>
                    </div>
                    <div class="column">
                        <div class="input-group">
                            <input :data-index="index" :disabled="!event_parameters[index]" @keyup.enter="addEventParameter(index)" :id="'list_event_parameter_'+index+'_value'" type="text" :placeholder="content.list.event.parameters_value" v-model="parameter[eventParameterKey(index)]">
                            <span class="icon-button delete input-group-addon" @click="removeEventParameter(index)" :title="content.list.event.parameters_delete"><i class="fa fa-window-close" aria-hidden="true"></i></span>
                        </div>
                    </div>
                </div>
                <button type="button" class="button" @click="addEventParameter()"><i class="fa fa-plus" aria-hidden="true"></i></button>
            </fieldset>
        </fieldset>

        <fieldset v-if="response.type == 'accordion'">
            <label for="accordion_title">{{ content.accordion.title }}</label>
            <input id="accordion_title" type="text" :placeholder="content.accordion.title" v-model="response.title">

            <label for="accordion_subtitle">{{ content.accordion.subtitle }}</label>
            <input id="accordion_subtitle" type="text" :placeholder="content.accordion.subtitle" v-model="response.subtitle">

            <label for="accordion_image">{{ content.accordion.image_url }}</label>
            <input id="accordion_image" type="text" :class="{ error: !validUrl(response.image.src.rawUrl) }" :placeholder="content.accordion.image_placeholder" v-model="response.image.src.rawUrl">

            <label for="accordion_text">{{ content.accordion.title }}</label>
            <textarea id="accordion_text" :placeholder="content.accordion.text" v-model="response.text" v-autosize></textarea>
        </fieldset>

        <fieldset v-if="response.type == 'chips'">
            <label for="chips_options">{{ content.chips.options }}</label>
            <fieldset v-for="(option, index) in response.options" :key="index">
                <span class="chips-option-delete-icon icon-button delete float-right" @click="removeOption(index)" :title="content.chips.delete"><i class="fa fa-window-close" aria-hidden="true"></i></span>

                <label :for="'chips_text_'+index">{{ content.chips.text }}</label>
                <input :id="'chips_text_'+index" type="text" :placeholder="content.chips.text" v-model="option.text">

                <label :for="'chips_image_'+index">{{ content.chips.image_url }}</label>
                <input :id="'chips_image_'+index" type="text" :class="{ error: !validUrl(option.image.src.rawUrl) }" :placeholder="content.chips.image_placeholder" v-model="option.image.src.rawUrl">

                <label :for="'chips_link_'+index">{{ content.chips.link }}</label>
                <input :id="'chips_link_'+index" type="text" :class="{ error: !validUrl(option.link) }" :placeholder="content.chips.link_placeholder" v-model="option.link">
            </fieldset>
            <button type="button" class="button" @click="addOption()"><i class="fa fa-plus" aria-hidden="true"></i></button>
        </fieldset>

        <fieldset v-if="response.type == 'divider'">
            <div class="text-center" v-html="content.divider.info"></div>
        </fieldset>
    </form>
</template>

<script>
export default {
  name: 'response-form',
  props: {
      response: {
          type: Object,
          required: true
      }
    },
    data() {
        return {
            content: {
                info: {
                    title: 'Card title',
                    subtitle: 'Card subtitle',
                    image_url: 'Public URL for image',
                    image_placeholder: 'https://example.com/path/to/image.png',
                    action_link: 'URL to follow when card is clicked',
                    action_link_placeholder: 'https://example.com'
                },
                description: {
                    title: 'Card title',
                    lines: 'Text lines',
                    lines_placeholder: 'Text line ',
                    delete: 'delete'
                },
                image: {
                    rawUrl: 'Public URL for image',
                    rawUrl_placeholder: 'https://example.com/path/to/image.png',
                    accessibilityText: 'Alt text for image'
                },
                button: {
                    icon: {
                        type_label: 'Icon from the <a href="https://fonts.google.com/icons?selected=Material+Icons" target="_blank">Material icon library</a>. The default icon is an arrow',
                        type_placeholder: 'Icon name from Material design library',
                        color: 'Color hexcode'
                    },
                    text: 'Button text',
                    link: 'URL to follow when button is clicked',
                    link_placeholder: 'https://example.com',
                    event: {
                        title: '<a href="https://cloud.google.com/dialogflow/docs/events-overview" target="_blank">Dialogflow event</a> that is triggered when the button is clicked, see the <a href="https://cloud.google.com/dialogflow/es/docs/reference/rest/v2/QueryInput#eventinput" target="_blank">EventInput</a> REST reference',
                        name: 'Event name',
                        language: 'Event language code',
                        parameters: 'Event parameters',
                        parameters_key: 'Key',
                        parameters_value: 'Value',
                        parameters_delete: 'delete'
                    }
                },
                list: {
                    title: 'Option title',
                    subtitle: 'Option subtitle',
                    event: {
                        title: '<a href="https://cloud.google.com/dialogflow/docs/events-overview" target="_blank">Dialogflow event</a> that is triggered when the button is clicked, see the <a href="https://cloud.google.com/dialogflow/es/docs/reference/rest/v2/QueryInput#eventinput" target="_blank">EventInput</a> REST reference',
                        name: 'Event name',
                        language: 'Event language code',
                        parameters: 'Event parameters',
                        parameters_key: 'Key',
                        parameters_value: 'Value',
                        parameters_delete: 'delete'
                    }
                },
                accordion: {
                    title: 'Accordion title',
                    subtitle: 'Accordion subtitle',
                    image_url: 'Public URL for image',
                    image_placeholder: 'https://example.com/path/to/image.png',
                    text: 'Accordion text'
                },
                chips: {
                    options: 'Options',
                    text: 'Option text',
                    image_url: 'Option public URL for image',
                    image_placeholder: 'https://example.com/path/to/image.png',
                    link: 'URL to follow when option is clicked',
                    link_placeholder: 'https://example.com',
                    delete: 'delete'
                },
                divider: {
                    info: 'Add a <strong>divisory line</strong> between response types. Tipically used with the <code>list</code> type.'
                }
            },
            event_parameters: [],
            urlRegex: {
                full: /^(ftp|http|https):\/\/[^ "]+$/,
                1: /^(f|h|h)$/,
                2: /^(ft|ht|ht)$/,
                3: /^(ftp|htt|htt)$/,
                4: /^(ftp|http|http):?$/,
                5: /^(ftp|http|https):?\/?$/,
                6: /^(ftp|http|https):\/?\/?$/,
                7: /^(ftp|http|https):\/\/?[^ "]*$/,
                8: /^(ftp|http|https):\/\/[^ "]*$/
            }
        }
    },
    computed: {

    },
    methods: {
        addTextLine(index) {
            if(index === undefined) {
                this.response.text.push('');
            } else if (this.response.text[index]) {
                this.response.text.splice(index+1, 0, '');
                setTimeout(function() {
                    document.querySelector("input[data-index='" + (index+1) + "']").focus();
                });
            }
        },
        removeTextLine(index) {
            var array = this.response.text;
            setTimeout(function() {
                array.splice(index, 1);
                setTimeout(function() {
                    if(array.length) {
                        document.querySelector("input[data-index='" + ((index == 0 ? index+1 : index)-1) + "']").focus();
                    }
                });
            });
        },
        logEvent($event) {
            console.log($event);
        },
        addEventParameter(index) {
            if(index === undefined) {
                this.response.event.parameters.push({});
                this.event_parameters.push('');
            } else if (this.response.event.parameters[index][this.eventParameterKey(index)]) {
                this.response.event.parameters.splice(index+1, 0, {});
                this.event_parameters.splice(index+1, 0, '');
                setTimeout(function() {
                    document.querySelector("input[data-index='" + (index+1) + "']").focus();
                });
            }
        },
        removeEventParameter(index) {
            var array = this.response.event.parameters;
            setTimeout(function() {
                array.splice(index, 1);
                setTimeout(function() {
                    if(array.length) {
                        document.querySelector("input[data-index='" + ((index == 0 ? index+1 : index)-1) + "']").focus();
                    }
                });
            });
        },
        eventParameterKey(index) {
            return this.event_parameters[index];
        },
        addOption() {
            this.response.options.push({ image: { src: {} } });
        },
        removeOption(index) {
            this.response.options.splice(index, 1);
        },
        validUrl(url) {
            if(url && url.length) {
                if(url.length > 8) {
                    return this.urlRegex.full.test(url);
                } else {
                    return this.urlRegex[url.length].test(url);
                }
            } else {
                return true;
            }
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
