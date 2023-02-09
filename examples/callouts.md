## basic callout example

### css snippet

```css
/* Notice: this rule applies to ALL BLOCKS that have the target ICON name */
p:not(:has(span.internal-embed.markdown-embed.inline-embed.is-loaded)):has(iconoir-icon[name=iconoir-warning-triangle]) {
  color: var(--text-muted);
  border-radius: 6px;
  border-style: double;
  border-width: 3px;
  border-color: rgba(var(--color-red-rgb), 0.95);
  padding: 5px 11px;
  background-color: rgba(var(--color-red-rgb), 0.08);
  text-align: justify;
}
p:not(span.internal-embed.markdown-embed.inline-embed.is-loaded) iconoir-icon[name=iconoir-warning-triangle] {
  margin-right: 7px;
}
```

### markdown

```markdown
`~![iconoir-megaphone|rgba(var(--color-red-rgb),.75)|32px|32px]` lorem ipsum dolor sit amet, consectetur adipiscing elit. morbi bibendum commodo congue. vivamus efficitur aliquam felis, id viverra eros blandit sit amet. nam feugiat purus ac sem aliquam, sit amet dictum dui bibendum. sed tincidunt porttitor odio at feugiat. cras sed viverra libero. suspendisse potenti. nulla eu ullamcorper quam, in tempus nulla. quisque accumsan euismod finibus.
```

### results

`~![iconoir-warning-triangle|rgba(var(--color-red-rgb),.75)|32px|32px]` lorem ipsum dolor sit amet, consectetur adipiscing elit. morbi bibendum commodo congue. vivamus efficitur aliquam felis, id viverra eros blandit sit amet. nam feugiat purus ac sem aliquam, sit amet dictum dui bibendum. sed tincidunt porttitor odio at feugiat. cras sed viverra libero. suspendisse potenti. nulla eu ullamcorper quam, in tempus nulla. quisque accumsan euismod finibus.

---

## complex callout example

### css snippet

```css
p:has(iconoir-icon[name=iconoir-brain]) {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  color: var(--text-muted);
  border-radius: 6px;
  border: 2px dashed var(--color-purple);
  padding: 9px 18px;
  background-color: rgba(var(--color-purple-rgb), 0.15);
  text-align: justify;
}
iconoir-icon[name=iconoir-brain] {
  color:var(--color-purple);
  display:flex;
  margin-right: 7px;
}
strong {
  color:var(--color-purple);
  font-size: 1.88em;  
  text-align: center;
  flex-grow: 1;
}
```

### markdown

```markdown
`~![iconoir-brain|currentColor|48px|48px]` **Lorem Ipsum Dolor Sit Amet** consectetur adipiscing elit. morbi bibendum commodo congue. vivamus efficitur aliquam felis, id viverra eros blandit sit amet. nam feugiat purus ac sem aliquam, sit amet dictum dui bibendum. sed tincidunt porttitor odio at feugiat. cras sed viverra libero. suspendisse potenti. nulla eu ullamcorper quam, in tempus nulla. quisque accumsan euismod finibus.
```

### results

`~![iconoir-brain|currentColor|48px|48px]` **Lorem Ipsum Dolor Sit Amet** consectetur adipiscing elit. morbi bibendum commodo congue. vivamus efficitur aliquam felis, id viverra eros blandit sit amet. nam feugiat purus ac sem aliquam, sit amet dictum dui bibendum. sed tincidunt porttitor odio at feugiat. cras sed viverra libero. suspendisse potenti. nulla eu ullamcorper quam, in tempus nulla. quisque accumsan euismod finibus.
