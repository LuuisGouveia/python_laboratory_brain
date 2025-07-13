from laboratorybrain.database import models
from laboratorybrain.ui import main_window

if __name__ == "__main__":
    models.create_tables()
    main_window.start_window()