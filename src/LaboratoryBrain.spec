from PyInstaller.utils.hooks import collect_submodules, collect_data_files
block_cipher= None

webview_hiddenimports = collect_submodules('webview')
webview_datas = collect_data_files('webview')

fpdf_hiddenimports = collect_submodules('fpdf')
fpdf_datas = collect_data_files('fpdf')

a = Analysis(
    ['__main__.py'],
    pathex=[],
    binaries=[],
    datas=[
        ('laboratory_brain/ui/templates', 'templates'),
        ('laboratory_brain/ui/templates/views/js', 'templates/views/js'),
        ('laboratory_brain/ui/templates/css', 'templates/css'),
        ('laboratory_brain/ui/templates/images', 'templates/images'),
        ('laboratory_brain/ui/templates/views/tables', 'tamplates/views/tables'),
    ] + webview_datas + fpdf_datas,
    hiddenimports=webview_hiddenimports + fpdf_hiddenimports + ['fpdf'],
    hookspath=[],
    runtime_hooks=[],
    win_no_prefer_redirects=False,
    win_private_assemblies=False,
    cipher=block_cipher,
)





pyz = PYZ(a.pure, a.zipped_data, cipher=block_cipher)

exe = EXE(
    pyz,
    a.scripts,
    [],
    exclude_binaries=True,
    name='LaboratoryBrain',
    debug=False,
    bootloader_ignore_signals=False,
    strip=False,
    upx=True,
    console=False
)

coll = COLLECT(
    exe,
    a.binaries,
    a.zipfiles,
    a.datas,
    strip=False,
    upx=True,
    name='LaboratoryBrain'
)

