# LaboratoryBrain.spec

block_cipher = None

a = Analysis(
    ['__main__.py'],
    pathex=[],
    binaries=[],
    datas=[
        ('laboratory_brain/ui/templates', 'ui/templates'),
        ('laboratory_brain/ui/templates/views/js', 'views/js'),
        ('laboratory_brain/ui/templates/css', 'templates/css'),
        ('laboratory_brain/ui/templates/images', 'templates/images'),
        ('laboratory_brain/ui/templates/views/tables', 'views/tables'),


    ],
    hiddenimports=[],
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
    console=False  # set True se quiser ver logs no terminal
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
