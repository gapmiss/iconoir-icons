import { Plugin, TFile,
  Editor, EditorPosition,
  EditorSuggestTriggerInfo, 
  EditorSuggest, EditorSuggestContext,
  MarkdownPostProcessor } from 'obsidian';
import { html, LitElement } from 'lit';
import { iconoir } from './iconoirNames';

enum ComponentChoice {
	Default = "Default",
}

export default class IconoirPlugin extends Plugin {
  iconoirNames: string[];
  isListItem: any;
	
  async litBlockHandler(type: ComponentChoice, source: string, el: HTMLElement, ctx: any): Promise<any> {
		const element:any = document.createRange().createContextualFragment(source);
		let input = element
		const blk = el.createEl("div", {cls: "lit-block"});
		let inputElement: HTMLElement;
		inputElement = blk.createEl("div", {text: input, cls: "lit-innerblock"});
	}

	async onload() {
    this.registerEditorSuggest(new IconoirSuggester(this));
    this.registerMarkdownCodeBlockProcessor("iconoir", this.litBlockHandler.bind(this, null));
    this.registerMarkdownPostProcessor(buildPostProcessor());
    this.iconoirNames = Object.keys(iconoir);
    this.isListItem = false;
    console.log('iconoir-icons loaded');
  }
	onunload() {
    console.log('iconoir-icons unloaded');
	}
}

export function buildPostProcessor(): MarkdownPostProcessor {
	return (el) => {
    el.findAll("code").forEach((code) => {
      let text = code.innerText.trim();
      if (text.startsWith('~![')) {
        let frag = text.substring(2).trim();
        if (frag.endsWith(']')) {
          let content = frag.substring(frag.length-1,1).trim();
          const arr = (code.parentElement?.tagName === 'TD' || code.parentElement?.tagName === 'TH') 
            ? content.split('\\|')
            : content.split('|');
          if (arr[0] === '' || arr[0] === undefined) {
            return '';
          }
          if (code.parentElement?.tagName === 'LI') {
            code.parentElement?.addClass('special-iconoir-list-callout');
            code.parentElement?.setAttr("data-icon", arr[0]);
          }
          if (code.parentElement?.tagName === 'TH') {
            code.parentElement?.addClass('special-iconoir-th-callout');
            code.parentElement?.setAttr("data-icon", arr[0]);
          }
          if (code.parentElement?.tagName === 'TD') {
            code.parentElement?.addClass('special-iconoir-td-callout');
            code.parentElement?.setAttr("data-icon", arr[0]);
          }
          var newEl   = document.createElement("iconoir-icon");
          newEl.setAttribute('name',arr[0]);
          newEl.setAttribute('aria-label',arr[0]+' icon');
          newEl.setAttribute('aria-label-position', 'top');
          if (arr[1] !== undefined) {
            newEl.setAttribute('stroke',arr[1]);
          }
          if (arr[2] !== undefined) {
            newEl.setAttribute('width',arr[2]);
          }
          if (arr[3] !== undefined) {
            newEl.setAttribute('height',arr[3]);
          }
          if (arr[4] !== undefined) {
            newEl.setAttribute('style',arr[4]);
          } 
          code.parentNode?.replaceChild(newEl, code); 
        }
      }
    })
  }
}

class IconoirSuggester extends EditorSuggest<string> {
	plugin: IconoirPlugin;

	constructor(plugin: IconoirPlugin) {
		super(plugin.app);
		this.plugin = plugin;
	}

	onTrigger(cursor: EditorPosition, editor: Editor, _: TFile): EditorSuggestTriggerInfo | null {
    let foo='bar';
		if (foo==='bar') {
			const sub = editor.getLine(cursor.line).substring(0, cursor.ch);
      const match = sub.match(/&&\S+$/)?.first();
			if (match) {
				return {
					end: cursor,
					start: {
						ch: sub.lastIndexOf(match),
						line: cursor.line,
					},
					query: match,
				}
			}
		}
		return null;
	}

	getSuggestions(context: EditorSuggestContext): string[] {
		let iconoir_query = context.query.replace('&&', '').toLowerCase();
		return this.plugin.iconoirNames.filter(p => p.includes(iconoir_query));
  }

	renderSuggestion(suggestion: string, el: HTMLElement): void {
		const outer = el.createDiv({ cls: "icon-suggester-container" });
		outer.createDiv({ cls: "iconoir-icon-name" }).setText(suggestion);
	}

	selectSuggestion(suggestion: string): void {
		if(this.context) {
			(this.context.editor as Editor).replaceRange('`~!['+iconoir[suggestion]+']`', this.context.start, this.context.end);
		}
	}
}

class IconoirIcon extends LitElement {
  name: string;
  stroke: string;
  width: string;
  height: string;
  css: string;
  static get properties() {
	  return {
      name:   { type: String },
      stroke: { type: String },
      width:  { type: String },
      height: { type: String },
      css:  { type: String }
	  }
	}
  constructor() {
	  super();
    this.name = 'iconoir-1st-medal';
    this.stroke = 'currentColor';
    this.width = '1.2em';
    this.height = '1.2em';
    this.css = '';
  }
	render() {
	  return html`
    <i class="${this.name}" style="${this.css}"></i>
      <style>
        i[class^="iconoir-"]::before,
        i[class*=" iconoir-"]::before {
          content: " ";
          display: var(--special-display);
          -webkit-mask-image:var(--${this.name});
          mask-image:var(--${this.name});
          background: ${this.stroke};
          mask-size: cover;
          -webkit-mask-size: cover;
          width: ${this.width};
          height: ${this.height};
        }
        i[class^="iconoir-"],
        i[class*=" iconoir-"] {
          display:inline-flex !important;
          border: var(--special-border);
          margin: var(--special-margin);
          padding: var(--special-padding);
        }
      </style>  
    `;
	}
}

var isRegistered = window.customElements.get('iconoir-icon');
if (isRegistered === undefined) {
  window.customElements.define('iconoir-icon', IconoirIcon);
}
