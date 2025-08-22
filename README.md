# Hide Files Plugin

Oculta archivos del explorador de Obsidian si tienen `hidden: true` en el frontmatter YAML.

## ¿Qué es?

Este plugin para Obsidian permite ocultar archivos en el explorador de archivos si en el frontmatter YAML de la nota se incluye la propiedad `hidden: true`. Es útil para mantener tu espacio de trabajo limpio y mostrar solo los archivos relevantes.

## Instalación

1. Descarga los archivos [`main.js`](main.js) y [`manifest.json`](manifest.json).
2. Copia ambos archivos en la carpeta de plugins de tu vault de Obsidian:  
   `.obsidian/plugins/hide-files-plugin/`
3. Activa el plugin desde la configuración de Obsidian.

## Uso

Para ocultar un archivo, añade en el frontmatter YAML de la nota:

```yaml
---
hidden: true
---
```
