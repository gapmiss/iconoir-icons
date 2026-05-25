import {
  Plugin,
  TFile,
  Editor,
  EditorPosition,
  EditorSuggestTriggerInfo,
  EditorSuggest,
  EditorSuggestContext,
  MarkdownPostProcessor,
} from "obsidian";
import { iconoirNames, iconoir } from "./iconoirNames";

export default class IconoirPlugin extends Plugin {
  async onload(): Promise<void> {
    this.registerEditorSuggest(new IconoirSuggester(this));
    this.registerMarkdownPostProcessor(buildPostProcessor());

    const isRegistered = activeWindow.customElements.get("iconoir-icon");
    if (isRegistered === undefined) {
      activeWindow.customElements.define("iconoir-icon", IconoirIcon);
    }
  }
}

export function buildPostProcessor(): MarkdownPostProcessor {
  return (el) => {
    el.findAll("code").forEach((code) => {
      const text = code.innerText.trim();
      if (!text.startsWith("~![")) return;

      const frag = text.substring(2).trim();
      if (!frag.endsWith("]")) return;

      const content = frag.slice(1, -1).trim();
      const isTableCell =
        code.parentElement?.tagName === "TD" ||
        code.parentElement?.tagName === "TH";
      const arr = isTableCell ? content.split("\\|") : content.split("|");

      if (!arr[0]) return;

      const iconName = arr[0];
      const parentTag = code.parentElement?.tagName;

      if (parentTag === "LI") {
        code.parentElement?.addClass("special-iconoir-list-callout");
        code.parentElement?.setAttr("data-icon", iconName);
      }
      if (parentTag === "TH") {
        code.parentElement?.addClass("special-iconoir-th-callout");
        code.parentElement?.setAttr("data-icon", iconName);
      }
      if (parentTag === "TD") {
        code.parentElement?.addClass("special-iconoir-td-callout");
        code.parentElement?.setAttr("data-icon", iconName);
      }

      const newEl = activeDocument.createElement("iconoir-icon");
      newEl.setAttribute("name", iconName);
      newEl.setAttribute("aria-label", `${iconName} icon`);
      newEl.setAttribute("data-tooltip-position", "top");

      if (arr[1]) newEl.setAttribute("stroke", arr[1]);
      if (arr[2]) newEl.setAttribute("width", arr[2]);
      if (arr[3]) newEl.setAttribute("height", arr[3]);
      if (arr[4]) newEl.setAttribute("style", arr[4]);

      code.parentNode?.replaceChild(newEl, code);
    });
  };
}

class IconoirSuggester extends EditorSuggest<string> {
  plugin: IconoirPlugin;

  constructor(plugin: IconoirPlugin) {
    super(plugin.app);
    this.plugin = plugin;
  }

  onTrigger(
    cursor: EditorPosition,
    editor: Editor,
    _file: TFile
  ): EditorSuggestTriggerInfo | null {
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
      };
    }
    return null;
  }

  getSuggestions(context: EditorSuggestContext): string[] {
    const query = context.query.replace("&&", "").toLowerCase();
    return iconoirNames.filter((name) => name.includes(query));
  }

  renderSuggestion(suggestion: string, el: HTMLElement): void {
    const outer = el.createDiv({ cls: "icon-suggester-container" });
    outer.createEl("i", { cls: `iconoir-${suggestion}` });
    outer.createDiv({ cls: "suggester-icon-name" }).setText(suggestion);
  }

  selectSuggestion(suggestion: string): void {
    if (this.context) {
      const replacement = "`~![" + iconoir[suggestion] + "]`";
      this.context.editor.replaceRange(
        replacement,
        this.context.start,
        this.context.end
      );
    }
  }
}

class IconoirIcon extends HTMLElement {
  static get observedAttributes(): string[] {
    return ["name", "stroke", "width", "height"];
  }

  connectedCallback(): void {
    this.render();
  }

  attributeChangedCallback(): void {
    this.render();
  }

  private render(): void {
    const name = this.getAttribute("name") ?? "iconoir-star";
    const stroke = this.getAttribute("stroke") ?? "currentColor";
    const width = this.getAttribute("width") ?? "1.2em";
    const height = this.getAttribute("height") ?? "1.2em";

    this.classList.add("obsidian-iconoir-icon");

    if (!this.querySelector("i")) {
      const icon = activeDocument.createElement("i");
      this.appendChild(icon);
    }

    const icon = this.querySelector("i") as HTMLElement;
    if (icon) {
      icon.className = name;
      icon.style.setProperty("--iconoir-stroke", stroke);
      icon.style.setProperty("--iconoir-width", width);
      icon.style.setProperty("--iconoir-height", height);
    }
  }
}
