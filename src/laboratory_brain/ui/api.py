
from laboratory_brain.ui.api_modules.windows_api import Windows_Api
from laboratory_brain.controllers.register import Register_API
class Api:
    def __init__(self):
        self.windows = Windows_Api()
        self.register = Register_API()
        