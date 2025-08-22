const { Plugin, TFile } = require('obsidian');

module.exports = class HideFilesPlugin extends Plugin {
  onload() {
    console.log('✅ Hide Files Plugin cargado');

    // Escuchar cambios en el frontmatter
    this.registerEvent(
      this.app.metadataCache.on('changed', () => this.updateHiddenFiles())
    );

    // Escuchar cambios de nombre o estructura
    this.registerEvent(
      this.app.vault.on('rename', () => this.updateHiddenFiles())
    );

    // Escuchar cambios de layout (ej. abrir o cerrar el explorador)
    this.registerEvent(
      this.app.workspace.on('layout-change', () => this.updateHiddenFiles())
    );

    this.updateHiddenFiles();
  }

  updateHiddenFiles() {
    const fileExplorer = this.app.workspace.getLeavesOfType('file-explorer')[0];
    if (!fileExplorer) {
      console.log('❗ No hay file explorer abierto.');
      return;
    }

    const fileExplorerView = fileExplorer.view;
    const fileItems = fileExplorerView.fileItems;

    for (const [path, item] of Object.entries(fileItems)) {
      const file = this.app.vault.getAbstractFileByPath(path);
      if (file instanceof TFile) {
        const cache = this.app.metadataCache.getFileCache(file);
        const frontmatter = cache?.frontmatter;

        console.log(`Archivo: ${path} — Frontmatter:`, frontmatter);

        if (frontmatter?.hidden === true) {
          console.log(`Ocultando archivo: ${path}`);
          if (item?.selfEl) {
            item.selfEl.style.display = 'none';
          }
        } else {
          if (item?.selfEl) {
            item.selfEl.style.display = '';
          }
        }
      }
    }
  }

  onunload() {
    console.log('❌ Hide Files Plugin descargado. Restaurando archivos...');

    const fileExplorer = this.app.workspace.getLeavesOfType('file-explorer')[0];
    if (!fileExplorer) return;

    const fileExplorerView = fileExplorer.view;
    const fileItems = fileExplorerView.fileItems;

    for (const item of Object.values(fileItems)) {
      if (item?.selfEl) {
        item.selfEl.style.display = '';
      }
    }
  }
};