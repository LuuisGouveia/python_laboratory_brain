from PyInstaller.utils.hooks import collect_submodules, collect_data_files

hiddenimports = collect_submodules('webview')
datas = collect_data_files('webview')
