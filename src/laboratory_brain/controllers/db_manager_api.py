from laboratory_brain.controllers.register import Register_API
from laboratory_brain.controllers.search import Search_API



class Db_manager_API():
    def __init__(self):
        self.register = Register_API()
        self.search = Search_API()
