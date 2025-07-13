from laboratory_brain.database import models
from laboratory_brain.ui import main_window

if __name__ == "__main__":
    models.create_tables()
    main_window.start_window()