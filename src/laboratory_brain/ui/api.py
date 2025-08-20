
from laboratory_brain.ui.api_modules.windows_api import Windows_Api
from laboratory_brain.controllers.register import Register_API
from laboratory_brain.controllers.search import Search_API
from laboratory_brain.controllers.edit import Editor_API
class Api:
    def __init__(self):
        self.windows = Windows_Api()
        self.register = Register_API()
        self.search = Search_API()
        self.editor = Editor_API()
        