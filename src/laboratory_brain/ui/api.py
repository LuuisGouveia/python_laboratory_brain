

from laboratory_brain.controllers.register import Register_API
from laboratory_brain.controllers.search import Search_API
from laboratory_brain.controllers.edit import Editor_API
from laboratory_brain.controllers.delete import Deletor_API
from laboratory_brain.controllers.pdf import Pdf_API
class Api:
    def __init__(self):
        self.register = Register_API()
        self.search = Search_API()
        self.editor = Editor_API()
        self.deletor = Deletor_API()
        self.pdf = Pdf_API()
        