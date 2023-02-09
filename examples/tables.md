
> [!HELP] Escaping pipe delimiter
> When using icons in a table, the PIPE `|` symbol must be escaped w/ a BACKSLASH `\`
> e.g. `\|`
> see examples below

### markdown

```markdown
|                  icon                  | name        |
|:--------------------------------------:| ----------- |
| `~![iconoir-bread-slice\|saddlebrown]` | bread-slice |
| `~![iconoir-peace-hand\|currentColor]` | peace-hand  |
|     `~![iconoir-pizza-slice\|red]`     | pizza-slice |
| `~![iconoir-wifi\|var(--color-cyan)]`  | wifi        |
```

### results

|                  icon                  | name        |
|:--------------------------------------:| ----------- |
| `~![iconoir-bread-slice\|saddlebrown]` | bread-slice |
| `~![iconoir-peace-hand\|currentColor]` | peace-hand  |
|     `~![iconoir-pizza-slice\|red]`     | pizza-slice |
| `~![iconoir-wifi\|var(--color-cyan)]`  | wifi        |

---

> [!INFO] CSS Class support
> When using icons inside a `<th>` or  `<td>`, the CSS class `special-iconoir-th-callout` or `special-iconoir-td-callout` is added to the element.
> When using icons inside a `<li>`, the CSS class `special-iconoir-list-callout` is added to the element.
> In addition, a `data-icon` attribute, w/ the icon name, is added to the same element for added specificity.

### markdown

```markdown
| `~![iconoir-heart\|red]` | supports `<th>`                  |
| ------------------------ | -------------------------------- |
| and also `<td>`          | `~![iconoir-gift\|currentColor]` |

```

### css snippet

```css
/* or "th[data-icon=iconoir-heart]" for more specificity */
th.special-iconoir-th-callout {
  text-align: center;
}
/* w/ "th[data-icon=iconoir-gift]" for more specificity */
td[data-icon=iconoir-gift].special-iconoir-td-callout {
  background-color: rgba(var(--color-green-rgb), 0.2) !important;
  text-align: center;
}
```

### results

| `~![iconoir-heart\|red]` | supports `<th>`                  |
| ------------------------ | -------------------------------- |
| and also `<td>`          | `~![iconoir-gift\|currentColor]` |
